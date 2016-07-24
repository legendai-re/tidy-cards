module.exports = function putUnlinkAccount(req, res) {

    if(!req.body.type){
        res.sendStatus(400);
        res.end();
    }else{
        switch(req.body.type){
            case 'FACEBOOK':
                if(!req.user.local.active && !req.user.twitter.id && !req.user.google.id)
                    return res.status(400).send({ error: "you must have one way to connect"});
                req.user.facebook.id = null;
                break;
            case 'TWITTER':
                if(!req.user.local.active && !req.user.facebook.id && !req.user.google.id)
                    return res.status(400).send({ error: "you must have one way to connect"});
                req.user.twitter.id = null;
                break;
            case 'GOOGLE':
                if(!req.user.local.active && !req.user.twitter.id && !req.user.facebook.id)
                    return res.status(400).send({ error: "you must have one way to connect"});
                req.user.google.id = null;
                break;
        }

        req.user.save(function(err){
            if (err) {console.log(err); res.sendStatus(500); return;}
            res.json({data: {message: req.body.type + 'unlinked'}})
        })
    }
}
