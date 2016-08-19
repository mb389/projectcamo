/* Initializing passport.js */
var mongoose = require('mongoose');
var local = require('./passport/local');
var google = require('./passport/google');
var User = mongoose.model('User');
/*
 * Expose
 */
module.exports = function(app, passport, config) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //use the following strategies
  passport.use(local);
  // passport.use(google);
};
