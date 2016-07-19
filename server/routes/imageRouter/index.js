var express    		= require('express');
var isGranted       = require('../../security/isGranted');
var multer      	= require('multer')
var mongoose    	= require('mongoose');
var aws 			= require('aws-sdk')
var multerS3 		= require('multer-s3')
var imagesTypes     = require('../../models/image/imageTypes.json');
var models          = require('../../models');

aws.config.region = 'eu-west-1';

var router = express.Router();

var s3 = new aws.S3({params: {Bucket: 'landlordokolivier'}});
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'landlordokolivier/invow/'+process.env.IMAGES_FOLDER,
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
	        callback(null, type.path + '/original/' + image._id + '.' + image.mime)
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

router.route('/')
    .post(isGranted('ROLE_USER'), upload.single('file'), function(req, res){
        require('./post')(req, res);
    });

module.exports = router;
