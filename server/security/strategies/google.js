module.exports = function getGoogleStrategy(GoogleStrategy){

    var mongoose        = require('mongoose');
    var connectionTypes = require('../connectionTypes.json');
    var User = mongoose.model('User');

   return new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.HOST + "/auth/google/callback",
        passReqToCallback : true
    },
    function(req, accessToken, refreshToken, profile, done) {
        User.findOne({'google.id': profile.id}).exec(function(err, user) {
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
            var newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = accessToken;
            newUser.unsafeUsername = (profile.displayName || 'anonyme');
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
