module.exports = function putRoles(req, res) {

    var mongoose    = require('mongoose');    
    var User        = mongoose.model('User');

	if(!req.body.user_id || !req.body.role){
        res.sendStatus(400);
        res.end();
    }else{            
        User.findById(req.body.user_id, function(err, user){
            if(err)  {res.sendStatus(500); return;}
            if(!user) {res.sendStatus(404); return;}
            user.addRole(req.body.role, function(result){
                res.json(result);
            });
        })            
    }     
}