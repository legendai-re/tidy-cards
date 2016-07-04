var express    		= require('express');
var passport		= require('passport');
var isGranted       = require('../../security/isGranted');
var router          = express.Router();

router.route('/login')
	.post(passport.authenticate('local'), function(req, res){
        require('./postLogin')(req, res);
    });

router.route('/logout')
    .get( function(req, res){        
        require('./getLogout')(req, res);
    });

router.route('/currentuser')
	.get(isGranted('ROLE_USER'), function(req,res){
        require('./getCurrentuser')(req, res);
    });
 
router.route('/signup')
	.post(function(req,res){
        require('./postSignup')(req, res);
    });

router.route('/roles')
    .put(isGranted('ROLE_ADMIN'), function(req, res){
        require('./putRoles')(req, res);   
    })
    .delete(isGranted('ROLE_ADMIN'), function(req, res){
        require('./deleteRoles')(req, res);    
    });

module.exports = router;