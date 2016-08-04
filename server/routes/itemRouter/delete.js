module.exports = function (req, res) {

    var lifeStates      = require('../../models/lifeStates.json');
    var sortTypes       = require('../../models/customSort/sortTypes.json');
    var models          = require('../../models');

    models.Item.findById(req.params.item_id).populate('_collection').exec(function(err, item){
        if(err) {console.log(err); res.sendStatus(500); return;}
        if(!item) {res.status(400).send({ error: "cannot find item with id: "+req.params.item_id }); return;}
        if(item._collection._author!=req.user._id) {res.status(401).send({ error: "only the author of the collection can remove item" }); return;}

        item.lifeState = lifeStates.ARCHIVED.id;

        item.save(function(err){
            if(err) {console.log(err); res.sendStatus(500); return;}
            removeItemFromCustomSort(item);
        });

        models.Collection.findById(item._collection, function(err, collection){
            collection.itemsCount--;
            collection.save();
        })

    });

    function removeItemFromCustomSort(item){
        models.CustomSort.findOne({ _collection: item._collection._id, type: sortTypes.COLLECTION_ITEMS.id}, function(err, customSort){
            if (err) {console.log(err); res.sendStatus(500); return;}
            models.CustomSort.update({ _id: customSort._id},{ $pull: { ids: item._id } }, function(err, result){
                if (err) {console.log(err); res.sendStatus(500); return;}
                sendResponse();
            })
        })
    }

    function sendResponse(){
        res.status(200).send({ message: 'item deleted'});
    }
}
