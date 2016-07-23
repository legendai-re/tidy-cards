module.exports = function getLocalStrategy(FacebookStrategy){

    var connectionTypes = require('../connectionTypes.json');
    var models          = require('../../models');
    var forbiddenUsernames = require('../../helpers/username-validator/forbiddenUsernames');

    return new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.HOST + "/auth/facebook/callback",
        passReqToCallback : true
    },
    function(req, accessToken, refreshToken, profile, done) {
        models.User.findOne({'facebook.id': profile.id}).exec(function(err, user) {
            if (err) { return done(err); }
            if(user && req.user){
                done('facebook account already used');
            }else if(user && !req.user){
                done(null, user);
            }else if(!user && !req.user){
                createUser();
            }else if(!user && req.user){
                linkAccountToFacebook();
            }
        });

        var createUser = function(){
            var newUser = new models.User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            if(profile.displayName)
                newUser.unsafeUsername = (forbiddenUsernames.indexOf(profile.displayName.toLowerCase()) > -1 ) ? 'forbidden-name' : profile.displayName;
            else
                newUser.unsafeUsername = 'anonyme';
            newUser.name = profile.displayName;
            newUser.roles = ['ROLE_USER'];
            newUser.connectionTypes = [connectionTypes.FACEBOOK.id];
            newUser.save(function(err){
                if (err) { return done(err); }
                done(null, newUser)
            })
        }

        var linkAccountToFacebook = function(){
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
    }
    )

}
