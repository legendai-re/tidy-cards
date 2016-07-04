module.exports = function deleteRoles(req, res) {
	if(!req.body.user_id || !req.body.role){
        res.json({'success': false, 'alert': 'Bad parameters'});
        res.end();
    }else{
        User.findById(req.body.user_id, function(err, user){
            if(err) res.send({success: false, error: err});
            if(err || !user) {res.json({success: false, alert:'User not found'}); return;}
            user.removeRole(req.body.role, function(result){
                res.json(result);
            });
        })            
    }    
}