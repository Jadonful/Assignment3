const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  displayName: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports.User = mongoose.model('User', UserSchema);
