var transporter = require('../email/transporter');
var models = require('../../models');

function sendConfirmationEmail(user, email, callback){
    generateToken(function(err, token){
        if(err) return callback(err);
        updateUserEmailAndToken(user, email, token, function(err, user){
            if(err) return callback(err);
            sendEmail(getMailOptions(user), function(err, infoResponse){
                if(err) return callback(err);
                user.emailConfirmationToken = '';
                return callback(null, user);
            })
        })
    })
}

function generateToken(callback){
    require('crypto').randomBytes(48, function(err, buffer) {
        callback(err, buffer.toString('hex'));
    })
}

function updateUserEmailAndToken(user, email, token, callback){
    user.email = email;
    user.emailConfirmed = false;
    user.emailConfirmationToken = token;
    user.save(function(err){
        callback(err, user);
    })
}

function getMailOptions(user){
    var confirmUrl = process.env.HOST + '/accounts/confirm_email/'+user.emailConfirmationToken;
    var mailOptions = {
        from: '"Invow" <'+process.env.MAILER_USER+'>', // sender address
        to: user.email, // list of receivers
        subject: 'Email confimation', // Subject line
        text: 'Hey, you updated your email address to '+user.email+'. Go to this link to confirm it '+confirmUrl+'.',
        html: 'Hey, you updated your email address to '+user.email+'. Click the link to confirm it <a href="'+confirmUrl+'">'+confirmUrl+'</a>.'
    };
    return mailOptions;
}

function sendEmail(mailOptions, callback){
    transporter.sendMail(mailOptions, function(error, info){
        callback(error, info.response);
    });
}

module.exports = {
    sendConfirmationEmail: sendConfirmationEmail
}
