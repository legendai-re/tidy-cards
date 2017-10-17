module.exports = function (req, res) {

    var visibility  = require('../../models/collection/visibility.json');
    var sortTypes   = require('../../models/customSort/sortTypes.json');
    var lifeStates  = require('../../models/lifeStates.json');
    var models      = require('../../models');
    var algoliaClient = require('../../algolia/algolia')
    var algoliaCollectionIndex = algoliaClient.initIndex('ts_'+process.env.ALGOLIA_INDEX_PREFIX+'_collection');
    var algoliaUserIndex = algoliaClient.initIndex('ts_'+process.env.ALGOLIA_INDEX_PREFIX+'_user');

    var q = models.Collection.find();
    q.where('lifeState').equals(lifeStates.ACTIVE.id);
    q.where('visibility').equals(visibility.PUBLIC.id);

    q.exec(function(err, collections){
    	if (err) {console.log(err); res.sendStatus(500); return;}
    	var collectionsAgoliaObjects = [];
    	for(var i in collections){
    		collectionsAgoliaObjects.push({
    			objectID: collections[i]._id,
            	title: collections[i].title,
            	bio: collections[i].bio
    		})
    	};

    	algoliaCollectionIndex.addObjects(collectionsAgoliaObjects, function(err, content) {
		});
    	
   	});

    var q2 = models.User.find();
    q2.where('lifeState').equals(lifeStates.ACTIVE.id);

    q2.exec(function(err, users){
        if (err) {console.log(err); res.sendStatus(500); return;}
        var usersAgoliaObjects = [];
        for(var i in users){
            usersAgoliaObjects.push({
                objectID: users[i]._id,
                username: users[i].username,
                name: users[i].name
            })
        };

        algoliaUserIndex.addObjects(usersAgoliaObjects, function(err, content) {
        });
        
    });

    res.json({status: 'OK'});
}
