module.exports = function getMultiple (req, res) {

    var models      = require('../../models');

    var rq = req.query;

    getQueryFiler(rq, req function(filterObj){
        var q = models.User.find(filterObj).sort({'createdAt': 1}).limit(20);

        if(rq.populate){
            q.populate(rq.populate);
        }

        if(rq.skip)
            q.skip(parseInt(rq.skip));

        if(rq.limit)
            q.limit(parseInt(rq.limit));

        if(rq.sort_field && rq.sort_dir && (parseInt(rq.sort_dir)==1 || parseInt(rq.sort_dir)==-1)){
            var sortObj = {};
            sortObj[rq.sort_field] = rq.sort_dir;
            q.sort(sortObj);
        }

        q.exec(function(err, users){
            if (err) {console.log(err); res.sendStatus(500); return;}
            res.json({data: users});
        });
    })

    function getQueryFiler(rq, req, callback){
        var filterObj = {};

        if(rq.search)
            filterObj.title = { $regex:  '.*'+rq.search+'.*', $options: 'i'};

        callback(filterObj);
    }

}
