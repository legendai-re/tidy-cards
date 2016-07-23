var mongoose    = require('mongoose');
var roles       = require('../../security/roles.json');
var visibility  = require('../collection/visibility.json');
var URLSlugs    = require('mongoose-url-slugs');
var Schema      = mongoose.Schema;

var UserSchema  = require('./schema')(Schema);

UserSchema.pre('save', function(next) {
    if(!this.createdAt)
        this.createdAt = new Date();
    this.updatedAt = Date();
    next();
});

UserSchema.plugin(URLSlugs('unsafeUsername', {field: 'username', update: true}));

UserSchema.methods.isGranted = function isGranted(role){
    if(this.haveRole(role)) return true;
    return checkRole(this, role);
}

UserSchema.methods.haveRole = function haveRole(role){
    return this.roles.indexOf(role) > -1;
}

function checkRole(user, toFound){
    for(role in roles){
        if((roles[role].indexOf(toFound) > -1)){
            if(user.haveRole(role))return true;
            else return checkRole(user, role);
        }
    }
    return false;
}

UserSchema.methods.addRole = function addRole(role, callback) {
    if(!this.haveRole(role)){
        this.roles.push(role);
        this.save(function(err){
            if(err)throw err;
            callback({success: true, alert: "Role "+ role + " added."});
        })
    }else{
        callback({success: false, alert: "Role already exist"});
    }
}

UserSchema.methods.removeRole = function removeRole(role, callback) {
    if(this.haveRole(role) && role != "ROLE_USER"){
        var index = this.roles.indexOf(role);
        this.roles.splice(index, 1);
        this.save(function(err){
            if(err)throw err;
            callback({success: true, alert: "Role "+ role + " removed."});
        })
    }else{
        callback({success: false, alert: "Role didn't exist or you tryed to remove ROLE_USER"});
    }
}

UserSchema.methods.addCollection = function addCollection(collection, callback) {
    collection._author = this._id;
    collection.save(function(err){
        if (err) {callback(err, collection); return;}
        callback(false, collection);
    });
}

User = mongoose.model('User', UserSchema);

exports.userModel = User;
