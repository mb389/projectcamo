/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

// Other oauthtypes to be added

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,
  tokens: Array,
  profile: {
    name: {type: String, default: ''},
    gender: {type: String, default: ''},
    location: {type: String, default: ''},
    website: {type: String, default: ''},
    picture: {type: String, default: ''},
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {},
});

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(5, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  },
};

/**
 * Statics
 */

UserSchema.statics = {};

User = mongoose.model('User', UserSchema);
