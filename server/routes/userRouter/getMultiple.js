module.exports = function getMultiple (req, res) {

	var mongoose	= require('mongoose');
	var User 		= mongoose.model('User');

	User.find(function(err, users){
    	if (err) res.send({success: false, error: err});
    	res.json(users);
    });

}