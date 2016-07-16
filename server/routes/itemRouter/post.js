module.exports = function post (req, res) {

    var mongoose        = require('mongoose');
    var itemTypes       = require('../../models/item/itemTypes.json');
    var Collection      = mongoose.model('Collection');
    var Item            = mongoose.model('Item');
    var ItemUrl         = mongoose.model('ItemUrl');

    if(!req.body.title || !req.body.description || !req.body._collection || !req.body.type || !typeOk(req.body.type)){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        var item =  new Item();
        item.title = req.body.title;
        item.description = req.body.description;
        item.type = req.body.type;
        Collection.findById(req.body._collection, function(err, collection){
            if (err) {console.log(err); res.sendStatus(500); return;}
            if (!collection){res.status(400).send({ error: "cannot find collection with id: "+req.body._collection }); return;}
            if(collection._author!=req.user._id) {res.status(401).send({ error: "only the author of the collection can add item" }); return;}

            createItemContent(item, req, function(err, content){
                if (err){res.status(400).send({ error: "error while creating item content"}); return;}
                item._content = content._id;
                collection.addItem(item, function(err, item){
                    if(err) {console.log(err); res.sendStatus(500); return;}
                    res.json({data: item});
                });
            });

        });
    }

    function typeOk(typeId){
        for(var key in itemTypes){
            if(itemTypes[key]==typeId)
                return true;
        }
        return false;
    }

    function createItemContent(item, req, callback){
        switch(item.type){
            case itemTypes.URL:
                return createItemUrl(req, callback);
                break;
            case itemTypes.IMAGE:
                break;
            case itemTypes.YOUTUBE:
                break;
            case itemTypes.TWEET:
                break;
        }
    }

    function createItemUrl(req, callback){
        if(!req.body._content || !req.body._content.url){
            callback("url not defined", null);
            return;
        }
        var itemUrl = new ItemUrl();
        itemUrl.url = req.body._content.url;
        itemUrl.save(function(err){
            if(err)console.log(err);
            callback(err, itemUrl)
        });
    }

}
