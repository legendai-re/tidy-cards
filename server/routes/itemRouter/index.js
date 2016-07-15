var express         = require('express');
var isGranted       = require('../../security/isGranted');

var router = express.Router();

router.route('/')
    .post(isGranted('ROLE_USER'), function(req, res) {
        require('./post')(req, res);
    })
    .get(function(req, res){
        require('./getMultiple')(req, res);
    });

router.route('/:item_id')
    .get(function(req, res){
       //require('./getOne')(req, res);
    })
    .put(isGranted('ROLE_USER'), function(req, res) {
        //require('./put')(req, res);
    });

module.exports = router;
