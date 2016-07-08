module.exports = function getMultiple (req, res) {

	var mongoose	= require('mongoose');
	var User 		= mongoose.model('User');	

	User.find(function(err, users){
    	if (err) {console.log(err); res.sendStatus(500); return;}
    	res.json({data: users});
    });

}