var express    		= require('express');
var mongoose		= require('mongoose');
var isGranted       = require('../passport/isGranted');

var router = express.Router();

var User = mongoose.model('User');

router.route('/')
    .get(function(req, res){
        User.find(function(err, users){
        	if (err) res.send({success: false, error: err});
        	res.json(users);
        });
    });

router.route('/:user_id')
    .get(function(req, res){
        User.findById(req.params.user_id, function(err, user){                
            if(err) res.send({success: false, error: err});
            res.json(user)
        })
    })
    .put(isGranted('ROLE_USER'), function(req, res) {        
        User.findById(req.params.user_id, function(err, user) {
            if (err) res.send({success: false, error: err});
            if(!user) res.send({success: false, alert: 'user not found' });            
            if(user._id.equals(req.user._id)){
	            user.name = (req.body.name || user.name);
	            user.save(function(err) {
	                if (err) res.send({success: false, error: err});
	                res.json({ success: true, user: user });
	            });
	        }else{
	        	res.sendStatus(401);
	        }
        });
    });

module.exports = router;