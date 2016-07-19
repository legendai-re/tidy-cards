module.exports = function(app) {

    var passport        = require('passport');
    var mongoose        = require('mongoose');
    var FacebookStrategy = require('passport-facebook').Strategy;
    var TwitterStrategy = require('passport-twitter').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var LocalStrategy   = require('passport-local').Strategy;

    var User = mongoose.model('User');

    app.use(passport.initialize());

    app.use(passport.session());

    passport.use(require('./strategies/local')(LocalStrategy));

    passport.use(require('./strategies/facebook')(FacebookStrategy));

    passport.use(require('./strategies/twitter')(TwitterStrategy));

    passport.use(require('./strategies/google')(GoogleStrategy));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).populate('_avatar').exec(function(err, user) {
             done(err, user);
        });
    });

};
