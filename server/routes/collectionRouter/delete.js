module.exports = function (req, res) {

    var lifeStates      = require('../../models/lifeStates.json');
    var sortTypes       = require('../../models/customSort/sortTypes.json');
    var itemTypes       = require('../../models/item/itemTypes.json');
    var models          = require('../../models');

    removeCollection(req.params.collection_id);

    /**
     * Recursive function to delete a collection. It's recursive because it can
     * be called again in removeItems() when an item is a subcollection.
     */
    function removeCollection(collectionId){
        models.Collection.findById(collectionId).exec(function(err, collection){
        if(err) {console.log(err); res.sendStatus(500); return;}
        if(!collection) {res.status(400).send({ error: "cannot find collection with id: "+collectionId }); return;}
        if(collection._author!=req.user._id) {res.status(401).send({ error: "only the author of the collection can delete it" }); return;}
            collection.lifeState = lifeStates.ARCHIVED.id;
            collection.save(function(err){
                if (err) {console.log(err); res.sendStatus(500); return;}
                removeItems(collection);

                /* remove the collection from custom sort done for a root collection */
                if(collection.depth == 0)
                    removeCollectionFromCustomSort(collection);
                /* send response when the first collection is deleted, even if the subcollection are not deleted yet*/
                if(collectionId == req.params.collection_id)
                    sendResponse();
            })
        });
    }

    /**
     * Retrieve all items of a collection and then delete them. If an item is
     * a subcollection, it will delete it by calling removeCollection().
     */
    function removeItems(collection){
        models.Item.find({_collection: collection._id}, function(err, items){
            for(var key in items){
                items[key].lifeState = lifeStates.ARCHIVED.id;
                items[key].save();
                if(items[key].type == itemTypes.COLLECTION.id)
                    removeCollection(items[key]._content);
            }
        });
    }

    /**
     * Retrieve the MY_COLLECTION customSort and remove the id of the collection inside it.
     */
    function removeCollectionFromCustomSort(collection){
        models.CustomSort.findOne({ _user: collection._author, type: sortTypes.MY_COLLECTIONS.id}, function(err, customSort){
            if (err) {console.log(err); res.sendStatus(500); return;}
            models.CustomSort.update({ _id: customSort._id},{ $pull: { ids: collection._id } }, function(err, result){
                if (err) {console.log(err); res.sendStatus(500); return;}
            })
        })
    }

    function sendResponse(){
        res.json({message: 'collection deleted'});
    }
}
