var express    		= require('express');
var isGranted       = require('../../security/isGranted');
var imageUploader   = require('../../helpers/image-uploader');

var router = express.Router();

router.route('/')
    .post(isGranted('ROLE_USER'), imageUploader.upload.single('file'), function(req, res){
        require('./post')(req, res);
    });

module.exports = router;
