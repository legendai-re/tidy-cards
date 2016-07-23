var express    		= require('express');
var isGranted       = require('../../security/isGranted');

var router = express.Router();

router.route('/')
    .get(function(req, res){
        require('./getMultiple')(req, res);
    });

router.route('/:user_id')
    .get(function(req, res){
       require('./getOne')(req, res);
    })
    .put(isGranted('ROLE_USER'), function(req, res) {
        require('./put')(req, res);
    });

router.route('/helpers/valid-username')
    .get(function(req, res){
       require('./getValidUsername')(req, res);
    });

module.exports = router;
