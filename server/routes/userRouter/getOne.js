module.exports = function getOne (req, res) {

	var mongoose	= require('mongoose');
	var User 		= mongoose.model('User');

	User.findById(req.params.user_id, function(err, user){                
        if(err) {res.sendStatus(404); return;}
        res.json({data: user});
    })
    
}