module.exports = function (req, res) {

    var faker = require('faker');
    var connectionTypes = require('../../security/connectionTypes.json');
    var models          = require('../../models');

    var callback = function(err){
    }

    models.User.remove( { email : { $nin: ["olivier28.coue@gmail.com", "accounts@alexandrejolly.com"] } }, callback )
    models.Collection.remove({}, callback)
    models.Image.remove({}, callback)
    models.Item.remove({}, callback)
    models.ItemUrl.remove({}, callback)
    models.ItemImage.remove({}, callback)
    models.ItemYoutube.remove({}, callback)
    models.ItemTweet.remove({}, callback)

    res.json({message: 'done'});
}
