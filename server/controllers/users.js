const mongoose = require('mongoose');
// var User = require('../models/user');
const passport = require('passport');
const User = mongoose.model('User');

exports.getById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => err);
};

/**
 * POST /login
 */
exports.postLogin = (req, res, next) => {
  // Do email and password validation for the server
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({message: info.message});
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({message: loginErr});
      return res.status(200).json({message: 'You have been successfully logged in.'});
    });
    return null;
  })(req, res, next);
};

/**
 * POST /logout
 */
exports.postLogout = (req, res) => {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
};

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignUp = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne({email: req.body.email}, (err, existingUser) => {
    if (existingUser) {
      return res.status(409).json({message: 'Account with this email address already exists!'});
    }
    user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(401).json({message: loginErr});
        return res.status(200).json({message: 'You have been successfully logged in.'});
      });
    });
  });
};
