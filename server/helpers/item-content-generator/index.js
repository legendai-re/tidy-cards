var itemTypes       = require('../../models/item/itemTypes.json');
var models          = require('../../models');

function createItemContent(item, req, callback){
    switch(item.type){
        case itemTypes.URL.id:
            return createItemUrl(req, callback);
        case itemTypes.IMAGE.id:
            return createItemImage(req, callback);
        case itemTypes.YOUTUBE.id:
            return createItemYoutube(req, callback);
        case itemTypes.TWEET.id:
            return createItemTweet(req, callback);
        case itemTypes.TEXT.id:
            return callback(null, null);
        default:
            return callback("unknow type", null);
    }
}

function createItemUrl(req, callback){
    if(!req.body._content || !req.body._content.url){
        callback("itemUrl : some required parameters was not provided", null);
        return;
    }
    var itemUrl = new models.ItemUrl();
    itemUrl.url = req.body._content.url;
    itemUrl.host = req.body._content.host;

    itemUrl.image = req.body._content.image;
    itemUrl.title = req.body._content.title;
    itemUrl.description = req.body._content.description;
    itemUrl.author = req.body._content.author;
    itemUrl.type = req.body._content.type;
    itemUrl.site_name = req.body._content.site_name;

    itemUrl.save(function(err){
        if(err)console.log(err);
        callback(err, itemUrl)
    });
}

function createItemYoutube(req, callback){
    if(!req.body._content || !req.body._content.url || !req.body._content.embedUrl || !req.body._content.videoId){
        callback("itemYoutube : some required parameters was not provided", null);
        return;
    }
    var itemYoutube = new models.ItemYoutube();
    itemYoutube.url = req.body._content.url;
    itemYoutube.embedUrl = req.body._content.embedUrl;
    itemYoutube.videoId = req.body._content.videoId;
    itemYoutube.save(function(err){
        if(err)console.log(err);
        callback(err, itemYoutube)
    });
}

function createItemImage(req, callback){
    if(!req.body._content || !req.body._content.url){
        callback("itemImage : some required parameters was not provided", null);
        return;
    }
    var itemImage = new models.ItemImage();
    itemImage.url = req.body._content.url;
    itemImage.save(function(err){
        if(err)console.log(err);
        callback(err, itemImage)
    });
}

function createItemTweet(req, callback){
    if(!req.body._content || !req.body._content.url || !req.body._content.html){
        callback("itemUrl : some required parameters was not provided", null);
        return;
    }
    var itemTweet = new models.ItemTweet();
    itemTweet.url = req.body._content.url;
    itemTweet.html = req.body._content.html;
    itemTweet.author_name = req.body._content.author_name;
    itemTweet.author_url = req.body._content.author_url;
    itemTweet.width = req.body._content.width;
    itemTweet.height = req.body._content.height;
    itemTweet.type = req.body._content.type;
    itemTweet.provider_name = req.body._content.provider_name;
    itemTweet.version = req.body._content.version;
    itemTweet.save(function(err){
        if(err)console.log(err);
        callback(err, itemTweet)
    });

}

module.exports = {
    createItemContent: createItemContent
}
