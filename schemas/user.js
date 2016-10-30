var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        min: 8
    }
});

//var options = {
//    usernameField: 'email',
//    usernameLowerCase: true
//};

userSchema.plugin(passportLocalMongoose);



var User = mongoose.model('User', userSchema)

// set up a mongoose model and pass it using module.exports
module.exports = User
