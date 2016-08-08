module.exports = function postSignup(req, res) {

    var bCrypt          = require('bcrypt-nodejs');
    var connectionTypes = require('../../security/connectionTypes.json');
    var models          = require('../../models');
    var sortTypes       = require('../../models/customSort/sortTypes.json');
    var usernameValidator = require('../../helpers/user/usernameValidator');

	if(!req.body.username || !req.body.email || !req.body.password){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        models.User.findOne({ $or: [{username: req.body.username.toLowerCase()}, {email: req.body.email.toLowerCase()}] }, function(err, user){
            if (err) {res.sendStatus(500); return;}
            if(!user || !usernameValidator.isValid(req.body.username)){
                var user =  new models.User();
                user.email = req.body.email;
                user.unsafeUsername = req.body.username;
                user.username = req.body.username;
                user.name = req.body.username;
                user.local.password = createHash(req.body.password);
                user.local.active = true;
                user.roles = (process.env.ADMIN_EMAILS.indexOf(req.body.email) > -1 ) ? ['ROLE_USER', 'ROLE_ADMIN'] : ['ROLE_USER'];

                var myCollectionSort = new models.CustomSort();
                myCollectionSort.type = sortTypes.MY_COLLECTIONS.id;
                myCollectionSort._user = user._id;
                myCollectionSort.save(function(err){
                    if(err) console.log(err);
                });

                user.save(function(err){
                    if (err) {console.log(err); res.sendStatus(422); return;}
                    req.login(user, function(err) {
                        if (err) {res.sendStatus(500); return;}
                        req.user.local.password = "";
                        res.json({'data': req.user});
                    });
                });
            }else{
                res.status(422).send({ error: 'email/username already taken or username is not valid'});
            }
        });
    }

    var createHash = function(password){
    	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}
