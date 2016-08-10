module.exports = function getOne (req, res) {

    var models      = require('../../models');

    var rq = req.query;
    var q = null;

    var noCaseUsernameRegex = new RegExp(["^", req.params.user_id, "$"].join(""), "i");

    if(isMongoId(req.params.user_id))
        q = models.User.findById(req.params.user_id);
    else if(isEmail(req.params.user_id))
        q = models.User.findOne({email: noCaseUsernameRegex});
    else
        q = models.User.findOne({username: noCaseUsernameRegex});

    if(rq.populate){
        q.populate(rq.populate);
    }

    if(rq.sort_field && rq.sort_dir && (parseInt(rq.sort_dir)==1 || parseInt(rq.sort_dir)==-1)){
        var sortObj = {};
        sortObj[rq.sort_field] = rq.sort_dir;
        q.sort(sortObj);
    }

	q.exec(function(err, user){
        if(err) {console.log(err); res.sendStatus(500); return;}
        res.json({data: user});
    })

    function isMongoId(username){
        return new RegExp("^[0-9a-fA-F]{24}$").test(username);
    }

    function isEmail(username){
        return new RegExp('.+@.+').test(username);;
    }
}
