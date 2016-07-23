module.exports = function putUnlinkAccount(req, res) {

    if(!req.body.type){
        res.sendStatus(400);
        res.end();
    }else{
        switch(req.body.type){
            case 'FACEBOOK':
                if(!user.locale.active && !user.twitter.id && !user.google.id)
                    return res.status(400).send({ error: "you must have one way to connect"});
                user.facebook.id = null;
                break;
            case 'TWITTER':
                if(!user.locale.active && !user.facebook.id && !user.google.id)
                    return res.status(400).send({ error: "you must have one way to connect"});
                user.twitter.id = null;
                break;
            case 'GOOGLE':
                if(!user.locale.active && !user.twitter.id && !user.facebook.id)
                    return res.status(400).send({ error: "you must have one way to connect"});
                user.google.id = null;
                break;
        }

        user.save(function(err){
            if (err) {console.log(err); res.sendStatus(500); return;}
            res.jon({data: {message: req.body.type + 'unlinked'}})
        })
    }
}
