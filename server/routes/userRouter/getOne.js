module.exports = function getOne (req, res) {

    var models      = require('../../models');

    var rq = req.query;

    var q = models.User.findById(req.params.user_id);

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

	q.exec(function(err, user){
        if(err) {console.log(err); res.sendStatus(500); return;}
        res.json({data: user});
    })

}
