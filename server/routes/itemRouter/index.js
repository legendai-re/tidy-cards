var express         = require('express');
var isGranted       = require('../../security/isGranted');

var router = express.Router();

router.route('/content/url')
    .get(isGranted('ROLE_USER'), function(req, res){
       require('./itemContent/getItemUrl')(req, res);
    });

router.route('/content/youtube')
    .get(isGranted('ROLE_USER'), function(req, res){
       require('./itemContent/getItemYoutube')(req, res);
    });

router.route('/content/tweet')
    .get(isGranted('ROLE_USER'), function(req, res){
       require('./itemContent/getItemTweet')(req, res);
    });

router.route('/content/image')
    .get(isGranted('ROLE_USER'), function(req, res){
       require('./itemContent/getItemImage')(req, res);
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
