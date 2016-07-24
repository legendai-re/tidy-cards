var multer          = require('multer')
var aws             = require('aws-sdk')
var multerS3        = require('multer-s3')
var request         = require('request');
var fs              = require('fs')
var gm              = require('gm'), imageMagick = gm.subClass({ imageMagick: true });
var async           = require('async')
var imagesTypes     = require('../../models/image/imageTypes.json');
var models          = require('../../models');

aws.config.region = 'eu-west-1';

var s3 = new aws.S3({params: {Bucket: process.env.S3_BUCKET}});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET+'/'+process.env.IMAGES_FOLDER,
    metadata: function (req, file, callback) {
      callback(null, {fieldName: file.fieldname});
    },
    key: function (req, file, callback) {

        var image = new models.Image();
        var type = getTypeFromReq(req);
        image.type = type.name;
        image.mime = getMimeFromFile(file);

        if(!image.type || !image.mime){
            callback(true, null)
            return;
        }

        image.save(function(err){
            req.image = image;
            callback(null, type.path + '/original/' + image._id + '.' + image.mime);
        });
    }
  })
});

function getTypeFromReq(req){
    var typeId = req.query.type;
    for(var key in imagesTypes){
        if(imagesTypes[key]._id == typeId)
            return imagesTypes[key];
    }
    console.log("Bad type");
    return false;
}

function getMimeFromFile(file){
    switch(file.mimetype){
        case 'image/jpeg':
            return 'jpeg';
        case 'image/png':
            return 'png';
        case 'image/gif':
            return 'gif';
        default :
            console.log("Bad mime");
            return false;
    }
}

var tmpPath = 'server/helpers/image-uploader/tmp-uploads/';

var afterUpload = function(image){
    var r = request(image.baseUrl + '/' + imagesTypes[image.type].path + '/' + 'original' + '/' + image._id + '.' + image.mime)
                .pipe(fs.createWriteStream(tmpPath +'original/'+ image._id + '.' + image.mime ))
                .on('error', (e) => {console.log("pipe error");console.log(e);})

    r.on('finish', () => {
        gm(tmpPath +'original/'+ image._id + '.' +image.mime)
            .identify(function (err, data) {
                if (err) console.log(err)
                var sizes = imagesTypes[image.type].sizes;
                async.times(sizes.length, function(n, next) {
                    gm(tmpPath +'original/'+ image._id + '.' + image.mime)
                    .thumb(sizes[n].x,sizes[n].y, tmpPath +sizes[n].x+'x'+sizes[n].y+ '/'+ image._id + '.' +image.mime, 70, function(err, stdout, stderr, command){
                        awsUpload(image, sizes[n]);
                        next(null);
                    })
                }, function(err, results) {
                    if(err)
                        console.log(err);
                    fs.unlink(tmpPath + 'original/'+ image._id + '.' + image.mime);
                });
            });
    });
}

function awsUpload(image, size){
    var imageLocalPath = tmpPath+size.x+'x'+size.y+'/'+ image._id + '.' +image.mime;
    fs.readFile(imageLocalPath, function(err, data) {
        s3.createBucket({Bucket: process.env.S3_BUCKET}, function() {
            var params = {Bucket: process.env.S3_BUCKET, Key: process.env.IMAGES_FOLDER+'/'+imagesTypes[image.type].path+'/'+size.x+'x'+size.y+'/'+ image._id + '.' +image.mime, Body: data};
            s3.putObject(params, function(err, data) {
                if (err)
                    console.log(err);
                else
                    fs.unlink(imageLocalPath);
            });
        });
    });
}

module.exports = {
  upload: upload,
  afterUpload: afterUpload
};
