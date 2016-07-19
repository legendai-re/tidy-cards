module.exports = function(app) {

    var passport        = require('passport');
    var mongoose        = require('mongoose');
    var bCrypt          = require('bcrypt-nodejs');
    var LocalStrategy   = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var TwitterStrategy = require('passport-twitter').Strategy;
    var connectionTypes = require('./connectionTypes.json');

    var User = mongoose.model('User');

    app.use(passport.initialize());

    app.use(passport.session());

    //LOCAL
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ $or: [{username: username}, {email: username}], connectionTypes: connectionTypes.LOCAL.id }).populate('_avatar').select('+local.password').exec(function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {alert: 'Incorrect username.'});
                }
                if (!password || password == '' || !isValidPassword(user, password)) {
                    return done(null, false, {alert: 'Incorrect password.'});
                }
                user.local.password = "";
                return done(null, user);
            });
        }
    ));

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.local.password);
    }

    //FACEBOOK
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.HOST + "/auth/facebook/callback",
        passReqToCallback : true
    },
    function(req, accessToken, refreshToken, profile, done) {
        if (!req.user) {
            //create user from facebook
            User.findOne({'facebook.id': profile.id}).exec(function(err, user) {
                if (err) { return done(err); }
                if(user){
                    done(null, user);
                }else{
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.unsafeUsername = (profile.displayName || 'anonyme');
                    newUser.name = profile.displayName;
                    newUser.roles = ['ROLE_USER'];
                    newUser.connectionTypes = [connectionTypes.FACEBOOK.id];
                    newUser.save(function(err){
                        if (err) { return done(err); }
                        done(null, newUser)
                    })
                }
            });
        }else {
            //link account to facebook
            User.findOne({'facebook.id': profile.id}).exec(function(err, user) {
                if (err) { return done(err); }
                if(user){
                    done('facebook account already used');
                }else{
                    var user            = req.user;
                    user.facebook.id    = profile.id;
                    user.facebook.token = accessToken;
                    user.connectionTypes.push(connectionTypes.FACEBOOK.id);
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }
            });
        }
    }
    ));

    //TWITTER
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.HOST + "/auth/twitter/callback",
        passReqToCallback : true
    },
    function(req, accessToken, tokenSecret, profile, done) {
        if (!req.user) {
            //create user from twitter
            User.findOne({'twitter.id': profile.id}).exec(function(err, user) {
                if (err) { return done(err); }
                if(user){
                    done(null, user);
                }else{
                    var newUser = new User();
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = accessToken;
                    newUser.unsafeUsername = ( profile.username || 'anonyme');
                    newUser.name = ( profile.displayName || 'anonyme');
                    newUser.roles = ['ROLE_USER'];
                    newUser.connectionTypes = [connectionTypes.TWITTER.id];
                    newUser.save(function(err){
                        if (err) { return done(err); }
                        done(null, newUser)
                    })
                }
            });
        }else{
            //link account to facebook
            User.findOne({'twitter.id': profile.id}).exec(function(err, user) {
                if (err) { return done(err); }
                if(user){
                    done('twitter account already used');
                }else{
                    var user           = req.user;
                    user.twitter.id    = profile.id;
                    user.twitter.token = accessToken;
                    user.connectionTypes.push(connectionTypes.TWITTER.id);
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }

            });
        }
    }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).populate('_avatar').exec(function(err, user) {
             done(err, user);
        });
    });

};
