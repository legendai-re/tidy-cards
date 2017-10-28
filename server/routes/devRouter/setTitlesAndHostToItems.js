module.exports = function (req, res) {

    var visibility  = require('../../models/collection/visibility.json');
    var sortTypes   = require('../../models/customSort/sortTypes.json');
    var lifeStates  = require('../../models/lifeStates.json');
    var models      = require('../../models');
    var itemTypes   = require('../../models/item/itemTypes.json');
    
    var q = models.Item.find();

    var updatedCount = 0;

    q.exec(function(err, items){
        if (err) {console.log(err); res.sendStatus(500); return;}
        if(items.length < 1) { res.json({data: []}); return};
        addItemsContent(0, items,  function(err, items){
            for(let i = 0; i<items.length; i++){
                switch(items[i].type){
                    case itemTypes.URL.id:
                        items[i].title = items[i]._content.title;
                        items[i].host = items[i]._content.host;
                        items[i]._content = items[i]._content._id;
                        break;
                    case itemTypes.IMAGE.id:
                        items[i].title = 'image';
                        items[i].host = getHostFromUrl(items[i]._content.url);
                        items[i]._content = items[i]._content._id;
                        break;
                    case itemTypes.YOUTUBE.id:
                        items[i].title = items[i]._content.snippet.title;
                        items[i].host = 'www.youtube.com';
                        items[i]._content = items[i]._content._id;
                        break;
                    case itemTypes.TWEET.id:
                        items[i].title = 'tweet';
                        items[i].host = 'twitter.com';
                        items[i]._content = items[i]._content._id;
                        break;
                    case itemTypes.COLLECTION.id:
                        items[i].title = 'collection';
                        items[i].host = 'none';
                        items[i]._content = items[i]._content._id;
                        break;
                    case itemTypes.TEXT.id:
                        items[i].title = 'title';
                        items[i].host = 'host';
                        break;
                }
                items[i].save(function(err){
                    if(err) {console.log(err); res.sendStatus(500); return;}
                    updatedCount++;
                    if(updatedCount == items.length)
                        res.json({message: 'done'});
                });
            }
        })
    });

    function addItemsContent(i, items, callback){
        if(!items[i]){
            i++;
            if(i==items.length)
                return callback(null, items);
            else
                return addItemsContent(i, items, callback);
        }

        switch(items[i].type){
            case itemTypes.URL.id:
                models.ItemUrl.findById(items[i]._content, function(err, itemUrl){
                    items[i]._content = itemUrl;
                    i++;
                    if(i==items.length){
                        callback(null, items);
                    }else{
                        addItemsContent(i, items, callback);
                    }
                });
                break;
            case itemTypes.IMAGE.id:
                models.ItemImage.findById(items[i]._content, function(err, itemImage){
                    items[i]._content = itemImage;
                    i++;
                    if(i==items.length){
                        callback(null, items);
                    }else{
                        addItemsContent(i, items, callback);
                    }
                });
                break;
            case itemTypes.YOUTUBE.id:
                models.ItemYoutube.findById(items[i]._content, function(err, itemYoutube){
                    items[i]._content = itemYoutube;
                    i++;
                    if(i==items.length){
                        callback(null, items);
                    }else{
                        addItemsContent(i, items, callback);
                    }
                });
                break;
            case itemTypes.TWEET.id:
                models.ItemTweet.findById(items[i]._content, function(err, itemTweet){
                    items[i]._content = itemTweet;
                    i++;
                    if(i==items.length){
                        callback(null, items);
                    }else{
                        addItemsContent(i, items, callback);
                    }
                });
                break;
            case itemTypes.COLLECTION.id:
                var q = models.Collection.findById(items[i]._content);
                q.populate('_thumbnail');
                q.populate({
                    path: '_author',
                    populate: { path: '_avatar' }
                });
                q.exec(function(err, collection){
                    items[i]._content = collection;
                    i++;
                    if(i==items.length){
                        callback(null, items);
                    }else{
                        addItemsContent(i, items, callback);
                    }
                });
                break;
            case itemTypes.TEXT.id:
                i++;
                if(i==items.length){
                    callback(null, items);
                }else{
                    addItemsContent(i, items, callback);
                }
                break;
            default:
                console.log(items[i])
        }
    }

    function getHostFromUrl(url){
        var noHttpUrl = removeHttp(url);
        if(noHttpUrl)
            return noHttpUrl.split('/')[0]
        else
            return 'null';
    }

    function removeHttp(url){
        if(url.substring(0, 7) === 'http://'){
            url = url.substr(7);
        }else if(url.substring(0, 8) === 'https://'){
            url = url.substr(8);
        }
        return url;
    }
}

