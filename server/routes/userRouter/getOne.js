module.exports = function getOne (req, res) {

    var models      = require('../../models');
    var mongoose    = require('mongoose');


    var rq = req.query;
    var q = null;

    if(mongoose.Types.ObjectId.isValid(req.params.user_id))
        q = models.User.findById(req.params.user_id);
    else
        q = models.User.findOne({username: req.params.user_id});

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
