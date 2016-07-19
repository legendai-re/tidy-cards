module.exports = function postSignup(req, res) {

    var mongoose    = require('mongoose');
    var bCrypt      = require('bcrypt-nodejs');
    var connectionTypes = require('../../security/connectionTypes.json');
    var User        = mongoose.model('User');

	if(!req.body.username || !req.body.email || !req.body.password){
        res.sendStatus(400);
        res.end();
    }else{
        User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}] }, function(err, user){
            if (err) {res.sendStatus(500); return;}
            if(!user){
                var user =  new User();
                user.email = req.body.email;
                user.unsafeUsername = req.body.username;
                user.name = req.body.username;
                user.local.password = createHash(req.body.password);
                user.roles = (process.env.ADMIN_EMAILS.indexOf(req.body.email) > -1 ) ? ['ROLE_USER', 'ROLE_ADMIN'] : ['ROLE_USER'];
                user.connectionTypes.push(connectionTypes.LOCAL.id);
                user.save(function(err){
                    if (err) {res.sendStatus(422); return;}
                    req.login(user, function(err) {
                        if (err) {res.sendStatus(500); return;}
                        req.user.local.password = "";
                        res.json({'data': req.user});
                    });
                });
            }else{
                res.sendStatus(422);
            }
        });
    }

    var createHash = function(password){
    	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}
