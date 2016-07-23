module.exports = function getGoogleStrategy(GoogleStrategy){

    var slug = require('slug')
    var connectionTypes = require('../connectionTypes.json');
    var models          = require('../../models');
    var forbiddenUsernames = require('../../helpers/username-validator/forbiddenUsernames');

    return new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.HOST + "/auth/google/callback",
        passReqToCallback : true
    },
    function(req, accessToken, refreshToken, profile, done) {
        models.User.findOne({'google.id': profile.id}).exec(function(err, user) {
            if (err) { return done(err); }
            if(user && req.user){
                done('google account already used');
            }else if(user && !req.user){
                done(null, user);
            }else if(!user && !req.user){
                createUser();
            }else if(!user && req.user){
                linkAccountToGoogle();
            }
        });

        var createUser = function(){
            var newUser = new models.User();
            newUser.google.id = profile.id;
            newUser.google.token = accessToken;
            if(profile.displayName){
                var slugDdisplayName = slug(profile.displayName, '-');
                newUser.unsafeUsername = (forbiddenUsernames.indexOf(slugDdisplayName.toLowerCase()) > -1 ) ? 'forbidden-name' : slugDdisplayName;
            }else
                newUser.unsafeUsername = 'anonyme';
            newUser.name = profile.displayName;
            newUser.roles = ['ROLE_USER'];
            newUser.connectionTypes = [connectionTypes.GOOGLE.id];
            newUser.save(function(err){
                if (err) { return done(err); }
                done(null, newUser)
            })
        }

        var linkAccountToGoogle = function(){
            var user          = req.user;
            user.google.id    = profile.id;
            user.google.token = accessToken;
            user.connectionTypes.push(connectionTypes.GOOGLE.id);
            user.save(function(err) {
                if (err)
                    throw err;
                return done(null, user);
            });
        }
    }
    )

}
