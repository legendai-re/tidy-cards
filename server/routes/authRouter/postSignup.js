module.exports = function postSignup(req, res) {

    var mongoose    = require('mongoose');
    var bCrypt      = require('bcrypt-nodejs');
    var User        = mongoose.model('User');

	if(!req.body.username || !req.body.email || !req.body.password){
        res.json({'success': false, 'alert': 'Bad parameters'});
        res.end();
    }else{
        User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}] }, function(err, user){
            if (err) {res.send({success: false, error: err}); return;}
            if(!user){
                var user =  new User();
                user.email = req.body.email;
                user.username = req.body.username;
                user.name = req.body.username;
                user.password = createHash(req.body.password);
                user.roles = (process.env.ADMIN_EMAILS.indexOf(req.body.email) > -1 ) ? ['ROLE_USER', 'ROLE_ADMIN'] : ['ROLE_USER'];
                user.save(function(err){
                    if (err) {res.send({success: false, error: err}); return;}
                    req.login(user, function(err) {
                        if (err) {res.json({success: false, alert:'Registration error'}); return;}
                        req.user.password = "";
                        res.json({'success': true, 'user': req.user, 'alert':'Registration success'});
                    });                    
                });
            }else{
                res.json({'success': false, 'alert':'Registration error, user already exist'});
            }
        });
    }

    var createHash = function(password){
    	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}