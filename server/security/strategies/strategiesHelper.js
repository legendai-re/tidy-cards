var slug               = require('slug');
var models             = require('../../models');
var imagesTypes        = require('../../models/image/imageTypes.json');
var sortTypes          = require('../../models/customSort/sortTypes.json');
var forbiddenUsernames = require('../../helpers/username-validator/forbiddenUsernames');
var imageUpdloader     = require('../../helpers/image-uploader');

var createUser = function(profile, accessToken, strategy, callback){
    var newUser = new models.User();

    newUser[strategy].id = profile.id;
    newUser[strategy].token = accessToken;

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

    createMyCollectionSort(newUser);
    newUser.save(function(err){
        if (err) { return callback(err); }
        avatar.save();
        newUser._avatar = avatar;
        callback(null, newUser);
    })
}

function createMyCollectionSort(newUser){
    var myCollectionSort = new models.CustomSort();
    myCollectionSort.type = sortTypes.MY_COLLECTIONS.id;
    myCollectionSort._user = newUser._id;
    myCollectionSort.save(function(err){
        if(err) console.log(err);
    });
}

function createAvatar(newUser, profile){
    var image = new models.Image();
    image.type = imagesTypes.AVATAR.name;
    image.mime = 'jpg';
    image._user = newUser._id;
    if(profile.photos[0])
        imageUpdloader.getSocialNetworkAvatar(image, profile.photos[0].value);
    return image;
}

module.exports = {
  createUser: createUser,
};
