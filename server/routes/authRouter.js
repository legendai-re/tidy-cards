var express    		= require('express');
var passport		= require('passport');
var mongoose		= require('mongoose');
 var bCrypt         = require('bcrypt-nodejs');
var isAuthenticated = require('../passport/isAuthenticated');
var router          = express.Router();

var User = mongoose.model('User');

router.route('/login')
	.post(passport.authenticate('local'), function(req, res){
        res.json({user: req.user});
    });

router.route('/currentuser')
	.get(isAuthenticated, function(req,res){        
        res.json(req.user);
    });
 
router.route('/signup')
	.post(function(req,res){
        if(!req.body.username || !req.body.email || !password){
            res.json({'success': false, 'alert': 'Bad parameters'});
            res.end();
        }else{
            User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}] }, function(err, user){
                if(err) throw err;
                if(!user){
                    var user =  new User();
                    user.email = req.body.email;
                    user.username = req.body.username;
                    user.password = createHash(req.body.password);
                    user.save(function(err){
                        if (err) throw err;
                        req.login(user, function(err) {
                            if (err) throw err;
                            res.json({'success': true, 'user': req.user, 'alert':'Registration success'});
                        });                    
                    });
                }else{
                    res.json({'success': false, 'alert':'Registration error, user already exist'});
                }
            });
        }
    });

router.route('/logout')
	.get( function(req, res){        
        req.logout();
        res.send(200);
    });

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = router;