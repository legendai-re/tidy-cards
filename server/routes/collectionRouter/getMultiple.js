module.exports = function getMultiple (req, res) {

	var mongoose	= require('mongoose');
	var Collection 	= mongoose.model('Collection');

	var rq = req.query;

	var q = Collection.find(getQueryFiler(rq)).sort({'createdAt': 1}).limit(20);	

	if(rq.populate)
		q.populate('_author');		

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

	function getQueryFiler(rq){
		var filterObj = {};

		if(rq.search)
			filterObj.title = { $regex:  '.*'+rq.search+'.*', $options: 'i'};

		if(rq.author_id)
			filterObj._author = rq.author_id;

		return filterObj;
	}

}