module.exports = function getTwitterStrategy(TwitterStrategy){

    var mongoose        = require('mongoose');
    var bCrypt          = require('bcrypt-nodejs');
    var connectionTypes = require('../connectionTypes.json');
    var User = mongoose.model('User');

    return new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.HOST + "/auth/twitter/callback",
        passReqToCallback : true
    },
    function(req, accessToken, tokenSecret, profile, done) {
        User.findOne({'twitter.id': profile.id}).exec(function(err, user) {
            if (err) { return done(err); }
            if(user && req.user){
                done('Twitter account already used');
            }else if(user && !req.user){
                done(null, user);
            }else if(!user && !req.user){
                createUser();
            }else if(!user && req.user){
                linkAccountToTwitter();
            }
        });

        var createUser = function(){
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

        var linkAccountToTwitter = function(){
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
    }
    )

}
