var express         = require('express');
var passport        = require('passport');
var isGranted       = require('../../security/isGranted');
var router          = express.Router();

router.route('/initiate')
    .put(function(req,res){
        require('./putInitiate')(req, res);
    });

router.route('/complete')
    .put(function(req,res){
        require('./putComplete')(req, res);
    });

module.exports = router;
