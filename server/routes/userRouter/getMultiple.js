module.exports = function getMultiple (req, res) {

	var mongoose	= require('mongoose');
	var User 		= mongoose.model('User');

	var Image		= mongoose.model('Image');
	var img = new Image();
	img.folder = "upload";
	img.mime = 'png';
	img.save(function(err){
		if (err) {console.log(err); res.sendStatus(500); return;}
		console.log(img);
	})

	User.find(function(err, users){
    	if (err) {console.log(err); res.sendStatus(500); return;}
    	res.json({data: users});
    });

}