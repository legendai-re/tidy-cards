module.exports = function put (req, res) {

    var visibility  = require('../../models/collection/visibility.json');
    var sortTypes   = require('../../models/customSort/sortTypes.json');
    var models      = require('../../models');

    q = models.Collection.findById(req.params.collection_id);

	q.exec(function(err, collection) {
        if (err) {console.log(err); res.sendStatus(500); return;}
        if(!collection) {res.status(404).send({ error: 'cannot find collection with id: '+req.params.collection_id}); return;}
        if(collection._author != req.user._id || !req.user.isGranted('ROLE_ADMIN')) return res.sendStatus(401);

        if(req.user.isGranted('ROLE_ADMIN')){
            collection.featuredAt = req.body.isFeatured ? new Date() : null;
            collection.isFeatured = req.body.isFeatured;
            collection.isOnDiscover = req.body.isOnDiscover;
        }

        if(req.body.visibility && visibilityOk(req.body.visibility))
            collection.visibility = req.body.visibility.id;

        collection.title = (req.body.title || collection.title);
        collection.color = (req.body.color || collection.color);
        collection.bio = req.body.bio;

        if(req.body.updatePosition && typeof req.body.position != 'undefined')
            updatePosition(collection, req.body.position)
        else if(req.body._thumbnail && req.body._thumbnail._id)
            saveThumbnail(collection, req.body._thumbnail._id, req.user)
        else
            saveCollectionAndSendRes(collection);
    });

    function visibilityOk(reqVisibility){
        if(visibility[reqVisibility.id] != null)
            return true;
        return false;
    }

    function saveThumbnail(collection, imageId, user){
        models.Image.checkIfOwner(imageId, user, function(err, isOwner){
            if(err) {console.log(err); res.sendStatus(500); return;}
            if(!isOwner) return res.status(422).send({ error: 'cannot update avatar, you are not the owner of this image'});
            collection._thumbnail = imageId;
            saveCollectionAndSendRes(collection);
        })
    }

    function updatePosition(collection, newPosition){
        models.CustomSort.findOne({ _user: collection._author, type: sortTypes.MY_COLLECTIONS.id}, function(err, customSort){
            if (err) {console.log(err); res.sendStatus(500); return;}
            //remove id of collection
            models.CustomSort.update({ _id: customSort._id},{ $pull: { ids: collection._id } }, function(err, result){
                if (err) {console.log(err); res.sendStatus(500); return;}
                //add id at the new position
                models.CustomSort.update({_id: customSort._id}, { $push: { ids: { $each: [ collection._id ], $position: newPosition } } }, function(err, result){
                        if (err) {console.log(err); res.sendStatus(500); return;}
                        saveCollectionAndSendRes(collection);
                    }
                );
            })
        })
    }

    function saveCollectionAndSendRes(collection){
        collection.save(function(err) {
            if (err) {console.log(err); res.sendStatus(500); return;}
            res.json({data: collection});
        });
    }

}
