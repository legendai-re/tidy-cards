module.exports = function put (req, res) {

	var mongoose	= require('mongoose');
	var User 		= mongoose.model('User');

	User.findById(req.params.user_id, function(err, user) {
        if (err) {res.sendStatus(422); return;}
        if(!user) {res.sendStatus(404); return;}
        if(user._id.equals(req.user._id)){
            user.name = (req.body.name || user.name);
            user.bio = (req.body.bio || user.bio);
            user.save(function(err) {
                if (err) {res.send({success: false, error: err}); return;}
                res.json({ success: true, user: user });
            });
        }else{
        	res.sendStatus(401);
        }
    });

}