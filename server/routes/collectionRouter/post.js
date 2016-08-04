module.exports = function post (req, res) {

    var visibility      = require('../../models/collection/visibility.json');
    var sortTypes       = require('../../models/customSort/sortTypes.json');
    var models          = require('../../models');

	if(!req.body.title || !req.body.color || !req.body.visibility || !visibilityOk(req.body.visibility)){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        var collection =  new models.Collection();
        collection.title = req.body.title;
        collection.color = req.body.color;
        collection.visibility = req.body.visibility.id;
        if(req.body._thumbnail && req.body._thumbnail._id){
            collection._thumbnail = req.body._thumbnail._id;
        }
        if(req.body.bio){
            collection.bio = req.body.bio;
        }
        saveCollection(collection);
    }

    function visibilityOk(reqVisibility){
        if(visibility[reqVisibility.id] != null)
            return true;
        return false;
    }

    function saveCollection(collection){
        req.user.addCollection(collection, function(err, collection){
            if (err) {console.log(err); res.sendStatus(500); return;}
            addToMyCollectionCustomSort(collection);
        });
    }

    function addToMyCollectionCustomSort(collection){
        models.CustomSort.findOneAndUpdate(
            {type: sortTypes.MY_COLLECTIONS.id, _user: req.user._id},
            { $push: {
                ids: {
                    $each: [ collection._id ],
                    $position: 0
                }
            }},
            function(err, customSort){
                if (err) {console.log(err); res.sendStatus(500); return;}
                createItemCustomSort(collection);
            }
        )
    }

    function createItemCustomSort(collection){
        var itemCustomSort = new models.CustomSort();
        itemCustomSort.type = sortTypes.COLLECTION_ITEMS.id;
        itemCustomSort._user = req.user._id;
        itemCustomSort._collection = collection._id;
        itemCustomSort.save(function(err){
            if (err) {console.log(err); res.sendStatus(500); return;}
            sendResponse(collection);
        });
    }

    function sendResponse(collection){
        res.json({'data': collection});
    }
}
