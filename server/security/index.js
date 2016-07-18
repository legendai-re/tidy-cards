module.exports = function(app) {

    var passport        = require('passport');
    var mongoose        = require('mongoose');
    var bCrypt          = require('bcrypt-nodejs');
    var LocalStrategy   = require('passport-local').Strategy;

    var User = mongoose.model('User');

    app.use(passport.initialize());

    app.use(passport.session());

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ $or: [{username: username}, {email: username}] }).populate('_avatar').select('+password').exec(function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {alert: 'Incorrect username.'});
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false, {alert: 'Incorrect password.'});
                }
                user.password = "";
                return done(null, user);
            });
        }
    ));

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).populate('_avatar').exec(function(err, user) {
             done(err, user);
        });
    });

};
