module.exports = function post (req, res) {

    var imageUploader = require('../../helpers/image-uploader');

    res.json({data: req.image});
    if(req.image)
        imageUploader.afterUpload(req.image);

}
