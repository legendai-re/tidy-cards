module.exports = function put (req, res) {

	var mongoose	= require('mongoose');
	var User 		= mongoose.model('User');

	User.findById(req.params.user_id, function(err, user) {
        if (err) {console.log(err); res.sendStatus(500); return;}
        if(!user) {res.sendStatus(404); return;}
        if(user._id.equals(req.user._id) || req.user.isGranted('ROLE_ADMIN')){
            user.name = (req.body.name || user.name);
            user.bio = (req.body.bio || user.bio);
            user.save(function(err) {
                if (err) {console.log(err); res.sendStatus(500); return;}
                res.json({data: user});
            });
        }else{
        	res.sendStatus(401);
        }
    });

}