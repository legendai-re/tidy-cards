module.exports = function getTwitterStrategy(TwitterStrategy){

    var slug = require('slug')
    var bCrypt          = require('bcrypt-nodejs');
    var connectionTypes = require('../connectionTypes.json');
    var models          = require('../../models');
    var imagesTypes     = require('../../models/image/imageTypes.json');
    var forbiddenUsernames = require('../../helpers/username-validator/forbiddenUsernames');
    var imageUpdloader = require('../../helpers/image-uploader');

    return new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.HOST + "/auth/twitter/callback",
        passReqToCallback : true
    },
    function(req, accessToken, tokenSecret, profile, done) {
        models.User.findOne({'twitter.id': profile.id}).exec(function(err, user) {
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
            var newUser = new models.User();
            newUser.twitter.id = profile.id;
            newUser.twitter.token = accessToken;
            if(profile.displayName){
                var slugDdisplayName = slug(profile.displayName, '-');
                newUser.unsafeUsername = (forbiddenUsernames.indexOf(slugDdisplayName.toLowerCase()) > -1 ) ? 'forbidden-name' : slugDdisplayName;
            }else{
                newUser.unsafeUsername = 'anonyme';
            }
            newUser.name = (profile.displayName || 'anonyme');
            newUser.roles = ['ROLE_USER'];
            var avatar = createAvatar(newUser, profile);
            newUser._avatar = avatar._id;
            newUser.save(function(err){
                if (err) { return done(err); }
                avatar.save();
                newUser._avatar = avatar;
                done(null, newUser)
            })
        }

        var createAvatar = function(newUser, profile){
            var image = new models.Image();
            image.type = imagesTypes.AVATAR.name;
            image.mime = 'jpg';
            image._user = newUser._id;
            imageUpdloader.getSocialNetworkAvatar(image, profile.photos[0].value);
            return image;
        }

        var linkAccountToTwitter = function(){
            var user           = req.user;
            user.twitter.id    = profile.id;
            user.twitter.token = accessToken;
            user.save(function(err) {
                if (err)
                    throw err;
                return done(null, user);
            });
        }
    }
    )

}
