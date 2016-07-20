module.exports = function getMultiple (req, res) {

    var async       = require('async');
	var visibility  = require('../../models/collection/visibility.json');
    var lifeStates  = require('../../models/lifeStates.json');
    var models      = require('../../models');


	var rq = req.query;

	getQueryFiler(rq, req, function(filterObj){
		var q = models.Collection.find(filterObj).sort({'createdAt': 1}).limit(20);
        q.where('lifeState').equals(lifeStates.ACTIVE.id);

		q.populate('_thumbnail');
		q.populate({
            path: '_author',
            populate: { path: '_avatar' }
        });

		if(rq.skip)
			q.skip(parseInt(rq.skip));

		if(rq.limit)
			q.limit(parseInt(rq.limit));

		if(rq.sort_field && rq.sort_dir && (parseInt(rq.sort_dir)==1 || parseInt(rq.sort_dir)==-1)){
			var sortObj = {};
			sortObj[rq.sort_field] = rq.sort_dir;
			q.sort(sortObj);
		}

		q.exec(function(err, collections){
	    	if (err) {console.log(err); res.sendStatus(500); return;}
            if(req.user){
                addIsStarred(req.user, collections, function(collectionsResult){
                    res.json({data: collections});
                })
            }else{
                res.json({data: collections});
            }
	    });
	})

	function getQueryFiler(rq, req, callback){
		var filterObj = {};

		if(rq.search)
			filterObj.title = { $regex:  '.*'+rq.search+'.*', $options: 'i'};

		if(rq._author){
			filterObj._author = rq._author;
			if(req.user && req.user.isGranted('ROLE_USER'))
				filterObj.$or = [{visibility: visibility.PUBLIC.id}, {_author: req.user._id}]
			else
				filterObj.visibility = visibility.PUBLIC.id;
			callback(filterObj);
		}else if(rq._starredBy){
			getStarredByQuery(rq, req, function(starredByQuery){
				callback(starredByQuery);
			})
		}else{
			filterObj.visibility = visibility.PUBLIC.id;
			callback(filterObj);
		}
	}

	function getStarredByQuery(rq, req, callback){
		var filterObj = {};
		models.Star.find({_user: rq._starredBy}).exec(function (err, stars){
			if (err) {console.log(err); res.sendStatus(500); return;}
			if(!req.user || req.user._id != rq._starredBy)
				filterObj.visibility = visibility.PUBLIC.id
            var ids = [];
            for(var i in stars)
                ids.push(stars[i]._collection)
			filterObj._id = {$in: ids};
			callback(filterObj);
		});
	}

    function addIsStarred(user, collections, callback){
        async.times(collections.length, function(n, next) {
            models.Star.findOne({_user: user._id, _collection: collections[n]._id}, function(err, star){
                if(star)next(err, star);
                else next(err, null);
            })
        }, function(err, results) {
            for(var i in results){
                collections[i]._star = results[i];
            }
           callback(collections);
        });
    }
}
