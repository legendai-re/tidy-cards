module.exports = function postLogin (req, res) {

	var mongoose	= require('mongoose');
	var User 		= mongoose.model('User');

	User.findById(req.params.user_id, function(err, user){                
        if(err) {res.send({success: false, error: err}); return;}
        res.json(user)
    })
    
}