module.exports = function getMultiple (req, res) {

	var mongoose	= require('mongoose');
	var visibility  = require('../../models/collection/visibility.json');
	var Collection 	= mongoose.model('Collection');
	var User 	 	= mongoose.model('User');

	var rq = req.query;

	getQueryFiler(rq, req, function(filterObj){
		var q = Collection.find(filterObj).sort({'createdAt': 1}).limit(20);	

		if(rq.populate){
			q.populate(rq.populate);
		}

		if(rq.skip)
			q.limit(parseInt(rq.skip));

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
				filterObj.$or = [{visibility: visibility.PUBLIC}, {_author: req.user._id}]
			else
				filterObj.visibility = visibility.PUBLIC;
			callback(filterObj);
		}else if(rq._starredBy){
			getStarredByQuery(rq, req, function(starredByQuery){
				callback(starredByQuery);				
			})
		}else{
			filterObj.visibility = visibility.PUBLIC;
			callback(filterObj);
		}											
	}

	function getStarredByQuery(rq, req, callback){
		var filterObj = {};
		User.findById(rq._starredBy).select('+_starredCollections').exec(function (err, user){
			if (err) {console.log(err); res.sendStatus(500); return;}					
			if(!req.user || req.user._id != rq._starredBy)
				filterObj.visibility = visibility.PUBLIC
			filterObj._id = {$in: user._starredCollections};
			callback(filterObj);
		});
	}
}