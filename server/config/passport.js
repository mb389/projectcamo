/* Initializing passport.js */
const mongoose = require('mongoose');
const local = require('./passport/local');
const User = mongoose.model('User');
/*
 * Expose
 */
module.exports = (app, passport) => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  // use the following strategies
  passport.use(local);
  // passport.use(google);
};
