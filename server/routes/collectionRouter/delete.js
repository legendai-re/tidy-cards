module.exports = function (req, res) {

    var lifeStates      = require('../../models/lifeStates.json');
    var sortTypes       = require('../../models/customSort/sortTypes.json');
    var models          = require('../../models');

    models.Collection.findById(req.params.collection_id).exec(function(err, collection){
        if(err) {console.log(err); res.sendStatus(500); return;}
        if(!collection) {res.status(400).send({ error: "cannot find collection with id: "+req.params.collection_id }); return;}
        if(collection._author!=req.user._id) {res.status(401).send({ error: "only the author of the collection can delete it" }); return;}

        collection.lifeState = lifeStates.ARCHIVED.id;
        collection.save(function(err){
            if (err) {console.log(err); res.sendStatus(500); return;}
            removeCollectionFromCustomSort(collection);
        })

        models.Item.find({_collection: collection._id}, function(err, items){
            for(var key in items){
                items[key].lifeState = lifeStates.ARCHIVED.id;
                items[key].save();
            }
        });
    });

    function removeCollectionFromCustomSort(collection){
        models.CustomSort.findOne({ _user: collection._author, type: sortTypes.MY_COLLECTIONS.id}, function(err, customSort){
            if (err) {console.log(err); res.sendStatus(500); return;}
            models.CustomSort.update({ _id: customSort._id},{ $pull: { ids: collection._id } }, function(err, result){
                if (err) {console.log(err); res.sendStatus(500); return;}
                sendResponse();
            })
        })
    }

    function sendResponse(){
        res.json({message: 'collection deleted'});
    }
}
