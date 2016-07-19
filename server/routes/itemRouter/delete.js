module.exports = function (req, res) {

    var lifeStates      = require('../../models/lifeStates.json');
    var models          = require('../../models');

    models.Item.findById(req.params.item_id).populate('_collection').exec(function(err, item){
        if(err) {console.log(err); res.sendStatus(500); return;}
        if(!item) {res.status(400).send({ error: "cannot find item with id: "+req.params.item_id }); return;}
        if(item._collection._author!=req.user._id) {res.status(401).send({ error: "only the author of the collection can remove item" }); return;}

        item.lifeState = lifeStates.ARCHIVED.id;

        item.save(function(err){
            if(err) {console.log(err); res.sendStatus(500); return;}
            res.status(200).send({ message: 'item deleted'});
        });

        models.Collection.findById(item._collection, function(err, collection){
            collection.itemsCount--;
            collection.save();
        })

    });
}
