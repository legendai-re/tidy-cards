var itemTypes       = require('../../models/item/itemTypes.json');
var models          = require('../../models');

function checkItemContent(item, req, callback){
    switch(item.type){
        case itemTypes.URL.id:
            return checkItemByType('ItemUrl', req, callback);
        case itemTypes.IMAGE.id:
            return checkItemByType('ItemImage',req, callback);
        case itemTypes.YOUTUBE.id:
            return checkItemByType('ItemYoutube', req, callback);
        case itemTypes.TWEET.id:
            return checkItemByType('ItemTweet', req, callback);
        case itemTypes.TEXT.id:
            return callback(null, null);
        default:
            return callback("unknow type", null);
    }
}

function checkItemByType(modelName, req, callback){
    if(!req.body._content || !req.body._content._id){
        callback("some required parameters was not provided", null);
        return;
    }
    models[modelName].findById(req.body._content._id, function(err, itemContent){
        if(err) return callback(err);
        if(itemContent._user != req.user._id) return callback("itemContent : this item do not belong to the current account");
        return callback(null, itemContent)
    })
}


module.exports = {
    checkItemContent: checkItemContent
}
