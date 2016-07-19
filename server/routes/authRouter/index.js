var express    		= require('express');
var passport		= require('passport');
var ExpressBrute    = require('express-brute');
var isGranted       = require('../../security/isGranted');
var store           = new ExpressBrute.MemoryStore();
var bruteforce      = new ExpressBrute(store);
var router          = express.Router();

router.route('/facebook')
    .get(passport.authenticate('facebook'));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook', { successRedirect: '/dashboard', failureRedirect: '/dashboard' }));

router.route('/twitter')
    .get(passport.authenticate('twitter'));

router.route('/twitter/callback')
    .get(passport.authenticate('twitter', { successRedirect: '/dashboard', failureRedirect: '/dashboard' }));

router.route('/google')
    .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.route('/google/callback')
    .get(passport.authenticate('google', { successRedirect: '/dashboard', failureRedirect: '/dashboard' }));

router.route('/login')
	.post(bruteforce.prevent, passport.authenticate('local'), function(req, res){
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
