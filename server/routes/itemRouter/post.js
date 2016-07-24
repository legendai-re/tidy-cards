module.exports = function post (req, res) {

    var itemTypes       = require('../../models/item/itemTypes.json');
    var models          = require('../../models');
    var itemContentGenerator = require('../../helpers/item-content-generator');

    if(!req.body._collection || !req.body.type || !typeOk(req.body.type)){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        var item =  new models.Item();
        if(req.body.description){
            item.description = req.body.description;
        }
        item.type = req.body.type.id;
        models.Collection.findById(req.body._collection, function(err, collection){
            if(err) {console.log(err); res.sendStatus(500); return;}
            if(!collection) {res.status(400).send({ error: "cannot find collection with id: "+req.body._collection }); return;}
            if(collection._author!=req.user._id) {res.status(401).send({ error: "only the author of the collection can add item" }); return;}

            itemContentGenerator.createItemContent(item, req, function(err, content){
                if (err){res.status(400).send({ error: "error while creating item content"}); return;}
                if(!content && !item.description){res.status(400).send({ error: "you must add a description if there is no url"}); return;}
                if(content)
                    item._content = content._id;
                collection.addItem(item, function(err, item){
                    if(err) {console.log(err); res.sendStatus(500); return;}
                    res.json({data: item});
                });
            });

        });
    }

    function typeOk(reqType){
        if(itemTypes[reqType.id] != null)
            return true;
        return false;
    }
}
