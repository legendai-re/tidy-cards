var express         = require('express');
var isGranted       = require('../../security/isGranted');
var defineItemType  = require('../../helpers/item-content/defineItemType')
var router = express.Router();


router.route('/content/create')
    .post(isGranted('ROLE_USER'), defineItemType(), function(req, res){
       require('./itemContent/post')(req, res);
    });

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
        require('./put')(req, res);
    })
    .delete(isGranted('ROLE_USER'), function(req, res) {
        require('./delete')(req, res);
    });


module.exports = router;
