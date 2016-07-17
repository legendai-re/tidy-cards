module.exports = function getMultiple (req, res) {

    var mongoose        = require('mongoose');
    var itemTypes       = require('../../models/item/itemTypes.json');
    var Item            = mongoose.model('Item');
    var ItemUrl         = mongoose.model('ItemUrl');
    var ItemYoutube     = mongoose.model('ItemYoutube');
    var ItemImage       = mongoose.model('ItemImage');

    var rq = req.query;

    if(!rq._collection && (!req.user || !req.user.isGranted('ROLE_ADMIN'))){
        res.status(400).send({ error: "you must select a collection to get items (_collection) "});
        return;
    }

    getQueryFiler(rq, req, function(filterObj){
        var q = Item.find(filterObj).sort({'createdAt': 1}).limit(20);

        if(rq.populate){
            q.populate(rq.populate);
        }

        if(rq.skip)
            q.limit(parseInt(rq.skip));

        if(rq.limit)
            q.limit(parseInt(rq.limit));

        if(rq.sort_field && rq.sort_dir && (parseInt(rq.sort_dir)==1 || parseInt(rq.sort_dir)==-1)){
            var sortObj = {};
            sortObj[rq.sort_field] = rq.sort_dir;
            q.sort(sortObj);
        }

        q.exec(function(err, items){
            if (err) {console.log(err); res.sendStatus(500); return;}
            if(items.length < 1) { res.json({data: []}); return};
            addItemsContent(0, items, function(err, items){
                res.json({data: items});
            })
        });
    })

    function getQueryFiler(rq, req, callback){
        var filterObj = {};

        if(rq.search)
            filterObj.title = { $regex:  '.*'+rq.search+'.*', $options: 'i'};

        if(rq._collection){
            filterObj._collection = rq._collection;
            callback(filterObj);
        }else{
            filterObj.visibility = visibility.PUBLIC;
            callback(filterObj);
        }
    }

    function addItemsContent(i, items, callback){
        switch(items[i].type){
            case itemTypes.URL.id:
                ItemUrl.findById(items[i]._content, function(err, itemUrl){
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
                ItemImage.findById(items[i]._content, function(err, itemImage){
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
                ItemYoutube.findById(items[i]._content, function(err, itemYoutube){
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
                break;
            default:
                console.log("unknow type");
        }
    }

}
