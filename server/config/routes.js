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
  app.get('*',function(req,res,next){
    // if we are in prod and not on secure connection.
    if(req.headers['x-forwarded-proto']!='https' && process.env.NODE_ENV === 'production')
      res.redirect('https://' + req.get('host')+req.url)
    else
      next() /* Continue to other routes if we're not redirecting */
  })


  // user routes
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);
  app.post('/logout', users.postLogout);
  app.get('/user/:id',users.getById);

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

  app.delete('/formulaStore/:formulaId', function(req, res) {
    formulaStore.removeFormula(req, res);
  });


  app.get('*', function (req, res, next) {
    App.default(req, res);
  });

};
