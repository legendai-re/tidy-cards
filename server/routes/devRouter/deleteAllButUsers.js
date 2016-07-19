module.exports = function (req, res) {

    var faker = require('faker');
    var connectionTypes = require('../../security/connectionTypes.json');
    var models          = require('../../models');
    var itemUrlList     = require('./itemUrlList.json');

    var callback = function(err){
    }

    models.Collection.remove({}, callback)
    models.Image.remove({}, callback)
    models.Item.remove({}, callback)
    models.ItemUrl.remove({}, callback)
    //models.ItemImage.remove({}, callback)
    models.ItemYoutube.remove({}, callback)
    models.ItemTweet.remove({}, callback)

    res.json({message: 'done'});
}
