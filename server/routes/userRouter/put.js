module.exports = function put (req, res) {

	var mongoose	= require('mongoose');
	var User 		= mongoose.model('User');
    var Collection  = mongoose.model('Collection');

	User.findById(req.params.user_id, function(err, user) {
        if (err) {console.log(err); res.sendStatus(500); return;}
        if(!user) {res.sendStatus(404); return;}
        if(user._id.equals(req.user._id) || req.user.isGranted('ROLE_ADMIN')){
                    
            if(req.body._starredCollection)                
                addStarredCollection(req.body._starredCollection, user);
            else
                updateProfile(req, user);

        }else{
        	res.sendStatus(401);
        }
    }); 


    function addStarredCollection(collection_id, user){
        Collection.findById(collection_id, function(err, collection){
            if (err) {console.log(err); res.sendStatus(500); return;}
            user.addStarredCollection(User, collection, function(err){
                if (err) {console.log(err); res.sendStatus(500); return;}
                res.sendStatus(200);
            })
        })
    }

    function updateProfile(req, user){
        user.name = (req.body.name || user.name);
        user.bio = (req.body.bio || user.bio);
        user.save(function(err) {
            if (err) {console.log(err); res.sendStatus(500); return;}
            res.json({data: user});
        });
    }
}