/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

/*
 By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently, options are available to change the defaults.
 */
module.exports = new LocalStrategy({
  usernameField: 'email'
}, function (email, password, done) {
  User.findOne({ email }, function (err, user) {
    if (!user) return done(null, false, { message: 'There is no record of the email ' + email + '.' });
    user.comparePassword(password, function (err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Your email or password combination is not correct.' });
      }
    });
  });
});
