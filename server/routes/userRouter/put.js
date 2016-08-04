module.exports = function put (req, res) {

    var models      = require('../../models');
    var usernameValidator = require('../../helpers/user/usernameValidator');

	models.User.findById(req.params.user_id, function(err, user) {
        if (err) {console.log(err); res.sendStatus(500); return;}
        if(!user) {res.status(404).send({ error: 'cannot find user with id: '+req.params.user_id}); return;}
        if(user._id.equals(req.user._id)){
            if(req.body.username)
                updateUsername(req, user)
            else
                updateProfile(req, user);
        }else{
        	res.sendStatus(401);
        }
    });

    function updateProfile(req, user){
        user.name = (req.body.name || user.name);
        user.bio = req.body.bio;
        if(req.body._avatar && req.body._avatar._id){
            models.Image.checkIfOwner(req.body._avatar._id, user, function(err, isOwner){
                if(err) {console.log(err); res.sendStatus(500); return;}
                if(!isOwner) return res.status(422).send({ error: 'cannot update avatar, you are not the owner of this image'});
                user._avatar = req.body._avatar._id;
                saveUser(user);
            })
        }else{
            saveUser(user);
        }
    }

    function updateUsername(req, user){
        if(!usernameValidator.isValid(req.body.username)){
            return res.status(422).send({ error: 'cannot update username: not valid'});
        }
        models.User.findOne({username: req.body.username.toLowerCase(),  _id: { $ne: user._id }}, function(err, alreadyExistUser){
            if(err) {console.log(err); res.sendStatus(500); return;}
            if(alreadyExistUser) return res.status(422).send({ error: 'cannot update username: already takken'});
            user.username = req.body.username;
            saveUser(user);
        })
    }

    function saveUser(user){
        user.save(function(err){
            if (err) {console.log(err); res.sendStatus(500); return;}
            res.json({data: user});
        })
    }
}
