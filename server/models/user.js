var mongoose    = require('mongoose');
var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String ,
        select: false      
    },
    email: {
        type: String
    }
});

/*UserSchema.methods.compPassword = function compPassword(password) {
    return this.password == password;
}*/

User = mongoose.model('User', UserSchema);

exports.userModel = User;