module.exports = function post (req, res) {

    var imageUploader = require('../../helpers/image-uploader');

    imageUploader.afterUpload(req.image, function(err){
        res.json({data: req.image});
    });

}
