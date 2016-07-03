var express    		= require('express');
var passport		= require('passport');
var mongoose		= require('mongoose');
var bCrypt          = require('bcrypt-nodejs');
var isGranted       = require('../passport/isGranted');
var router          = express.Router();

var User = mongoose.model('User');

router.route('/login')
	.post(passport.authenticate('local'), function(req, res){
        res.json({user: req.user});
    });

router.route('/logout')
    .get( function(req, res){        
        req.logout();
        res.json({'success': true, 'alert': 'User loged out'});
    });

router.route('/currentuser')
	.get(isGranted('ROLE_USER'), function(req,res){
        res.json(req.user);
    });
 
router.route('/signup')
	.post(function(req,res){        
        if(!req.body.username || !req.body.email || !req.body.password){
            res.json({'success': false, 'alert': 'Bad parameters'});
            res.end();
        }else{
            User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}] }, function(err, user){
                if (err) res.send({success: false, error: err});
                if(!user){
                    var user =  new User();
                    user.email = req.body.email;
                    user.username = req.body.username;
                    user.password = createHash(req.body.password);
                    user.roles = (process.env.ADMIN_EMAILS.indexOf(req.body.email) > -1 ) ? ['ROLE_USER', 'ROLE_ADMIN'] : ['ROLE_USER'];
                    user.save(function(err){
                        if (err) res.send({success: false, error: err});
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
    });

router.route('/roles')
    .put(isGranted('ROLE_ADMIN'), function(req, res){
        if(!req.body.user_id || !req.body.role){
            res.json({'success': false, 'alert': 'Bad parameters'});
            res.end();
        }else{            
            User.findById(req.body.user_id, function(err, user){
                if(err) res.send({success: false, error: err});           
                if(!user) {res.json({success: false, alert:'User not found'}); return;}
                user.addRole(req.body.role, function(result){
                    res.json(result);
                });
            })            
        }        
    })
    .delete(isGranted('ROLE_ADMIN'), function(req, res){
        if(!req.body.user_id || !req.body.role){
            res.json({'success': false, 'alert': 'Bad parameters'});
            res.end();
        }else{
            User.findById(req.body.user_id, function(err, user){
                if(err) res.send({success: false, error: err});
                if(err || !user) {res.json({success: false, alert:'User not found'}); return;}
                user.removeRole(req.body.role, function(result){
                    res.json(result);
                });
            })            
        }        
    });

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = router;