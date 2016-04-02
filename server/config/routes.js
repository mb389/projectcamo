/**
 * Routes for express app
 */

const express = require('express');
const users = require('../controllers/users');
const mongoose = require('mongoose');
const _ = require('lodash');
const Sheet = mongoose.model('Sheet');
const sheets = require('../controllers/sheets');
const Workspace = mongoose.model('Workspace');
const workspaces = require('../controllers/workspaces');
const formulaStore = require('../controllers/formulaStore');
const path = require('path');
const compiled_app_module_path = path.resolve(__dirname, '../../', 'public', 'assets', 'server.js');
const App = require(compiled_app_module_path);

module.exports = function(app, passport) {
  // user routes
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);
  app.post('/logout', users.postLogout);
  app.get('/user/:id',users.getById);

  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ] }));

  // Google will redirect the user to this URL after authentication. Finish the
  // process by verifying the assertion. If valid, the user will be logged in.
  // Otherwise, the authentication has failed.
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  // sheets routes
  app.get('/sheet', sheets.all);

  app.get('/sheet/:sheetId', sheets.one);

  app.post('/sheet', function(req, res) {
    sheets.add(req, res);
  });

  app.post('/sheet/:spaceId', function(req, res) {
    sheets.addSheetToSpace(req, res);
  });

  app.put('/sheet/:id', function(req, res) {
    sheets.update(req, res);
  });

  app.put('/sheet/:sheetId/name', sheets.updateName);

  app.delete('/sheet/:id', function(req, res) {
    sheets.remove(req, res);
  });

  // workspace routes
  app.get('/workspace', workspaces.all);

  app.get('workspace/collab', workspaces.findCollab);

  app.get('/workspace/:id', workspaces.one);

  app.post('/workspace/:id/add', workspaces.addCollab);

  app.post('/workspace', function(req, res) {
    workspaces.add(req, res);
  });

  app.put('/workspace/:id', function(req, res) {
    workspaces.update(req, res);
  });

  app.delete('/workspace/:id', function(req, res) {
    workspaces.remove(req, res);
  });

// formulaStore routes
  app.get('/formulaStore', formulaStore.all);

  app.post('/formulaStore', function(req, res) {
    formulaStore.addFormula(req, res);
  });


  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  app.get('*', function (req, res, next) {
    App.default(req, res);
  });

};
