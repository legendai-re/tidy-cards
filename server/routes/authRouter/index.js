var express    		= require('express');
var passport		= require('passport');
var ExpressBrute    = require('express-brute');
var isGranted       = require('../../security/isGranted');
var router          = express.Router();
var store           = new ExpressBrute.MemoryStore();
var bruteforce      = new ExpressBrute(store);

router.route('/facebook')
    .get(function(req, res, next){
        var sess=req.session;
        sess.next = (req.query.next || '/dashboard') ;
        next();
    },passport.authenticate('facebook'));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook', {failureRedirect: '/dashboard' }), function(req, res){
        res.redirect(req.session.next);
    });

router.route('/twitter')
    .get(function(req, res, next){
        var sess=req.session;
        sess.next = (req.query.next || '/dashboard') ;
        next();
    },passport.authenticate('twitter'));

router.route('/twitter/callback')
    .get(passport.authenticate('twitter', {failureRedirect: '/dashboard'}), function(req, res){
        res.redirect(req.session.next);
    });

router.route('/google')
    .get(function(req, res, next){
        var sess=req.session;
        sess.next = (req.query.next || '/dashboard') ;
        next();
    }, passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.route('/google/callback')
    .get(passport.authenticate('google', { failureRedirect: '/dashboard' }), function(req, res){
        res.redirect(req.session.next);
    });

router.route('/unlink')
	.put(isGranted('ROLE_USER'), function(req, res){
        require('./putUnlinkAccount')(req, res);
    });

router.route('/login')
    .post(bruteforce.prevent, passport.authenticate('local'), function(req, res){
        require('./postLogin')(req, res);
    });

router.route('/logout')
    .get( function(req, res){
        require('./getLogout')(req, res);
    });

router.route('/currentuser')
	.get(function(req,res){
        require('./getCurrentuser')(req, res);
    });

router.route('/signup')
	.post(function(req,res){
        require('./postSignup')(req, res);
    });

router.route('/password/update')
    .put(bruteforce.prevent, isGranted('ROLE_USER'), function(req,res){
        require('./putPasswordUpdate')(req, res);
    });

router.route('/roles')
    .put(isGranted('ROLE_ADMIN'), function(req, res){
        require('./putRoles')(req, res);
    })
    .delete(isGranted('ROLE_ADMIN'), function(req, res){
        require('./deleteRoles')(req, res);
    });

module.exports = router;
