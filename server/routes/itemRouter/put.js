module.exports = function put (req, res) {

    var itemTypes       = require('../../models/item/itemTypes.json');
    var models          = require('../../models');
    var itemContentGenerator = require('../../helpers/item-content-generator');

    models.Item.findById(req.params.item_id).populate('_collection').exec(function(err, item){
        if(err) {console.log(err); res.sendStatus(500); return;}
        if(!item) {res.status(404).send({ error: "cannot find item with id: "+req.params.item_id }); return;}
        if(item._collection._author!=req.user._id) {res.status(401).send({ error: "only the author of the collection can update item" }); return;}

        if(req.body.description)
            item.description = req.body.description;
        else
            item.description = '';
        item.type = req.body.type.id;
        itemContentGenerator.createItemContent(item, req, function(err, content){
            if (err){res.status(400).send({ error: "error while creating item content"}); return;}
            if(!content && !item.description){res.status(400).send({ error: "you must add a description if there is no url"}); return;}
            if(content)
                item._content = content._id;
            item.save(function(err){
                if(err) {console.log(err); res.sendStatus(500); return;}
                res.json({data: item});
            });
        });

    });


    function typeOk(reqType){
        if(itemTypes[reqType.id] != null)
            return true;
        return false;
    }
}
