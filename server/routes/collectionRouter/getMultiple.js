module.exports = function getMultiple (req, res) {

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
	    	res.json({data: collections});
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
		models.User.findById(rq._starredBy).select('+_starredCollections').exec(function (err, user){
			if (err) {console.log(err); res.sendStatus(500); return;}
			if(!req.user || req.user._id != rq._starredBy)
				filterObj.visibility = visibility.PUBLIC.id
			filterObj._id = {$in: user._starredCollections};
			callback(filterObj);
		});
	}
}
