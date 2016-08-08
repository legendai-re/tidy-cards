module.exports = function putPasswordUpdate(req, res) {

    var bCrypt      = require('bcrypt-nodejs');
    var models      = require('../../models');

    if(!req.body.user_id || !req.body.password || !req.body.newPassword){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        if(req.body.newPassword.length < 3)
            return sendResponse(false);

        models.User.findOne({_id: req.body.user_id}).select('+local.password').exec(function (err, user) {
            if(err) {console.log(err); res.sendStatus(500); return;}
            if(!user) return res.status(404).send({ error: 'cannot find user with id : '+ req.body.user_id});
            if(user.local && user.local.active)
                updatePassword(user, req.body.password, req.body.newPassword);
            else
                activateLocalStrategy(user, req.body.newPassword)
        })
    }

    function updatePassword(user, password, newPassword){
        if(!isValidPassword(user, password))
            return sendResponse(false);
        setPassword(user, newPassword)
    }

    function isValidPassword(user, password){
        return bCrypt.compareSync(password, user.local.password);
    }

    function activateLocalStrategy(user, newPassword){
        user.local.active = true;
        setPassword(user, newPassword);
    }

    function setPassword(user, newPassword){
        user.local.password = createHash(newPassword);
        user.save(function(err){
            if(err) {console.log(err); res.sendStatus(500); return;}
            sendResponse(true)
        })
    }

    function createHash(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

    function sendResponse(success){
        res.json({success: success});
    }
}
