var mongoose = require('mongoose');
var chalk = require('chalk');
var dbConnect = require('./server');
const Promise = require('bluebird');
var User = Promise.promisifyAll(mongoose.model('User'));
var Workspace = Promise.promisifyAll(mongoose.model('Workspace'));
var Sheet = Promise.promisifyAll(mongoose.model('Sheet'));

const columnHeaders = [
      { id: '100', type: 'ID', name: 'Record Name', idx: 0 },
    ]

const grid = []
const sheetState = { grid: grid, columnHeaders: columnHeaders, showRowModal: false, modalRow: { data:null, rowIdx: null} }

var seedUsers = function () {

    var users = [
        {
            email: 'cody@camo.com',
            password: '123'
        },
        {
            email: 'oscar@camo.com',
            password: '123'
        },
        {
          email: 'mb@camo.com',
          password: '123'
        },
        {
          email: 'assaf@camo.com',
          password: '123'
        }
    ];
    return User.createAsync(users);

};

var seedSheet = function (workspaceId) {
  var sheet = [
    {
      name: 'Sheet1',
      content: sheetState,
      workspace: workspaceId
    }
  ];

  return Sheet.createAsync(sheet);
}

var seedWorkspace = function (user) {
  var workspace = [
    {
      name: 'Seedspace',
      user: user
    }
  ]
  return Workspace.createAsync(workspace);
}

 // dbConnect.then(() => {
  User.remove({})
  .then(() => Workspace.remove({}))
  .then(() => Sheet.remove({}))
  .then(() => seedUsers())
  .then((users) => seedWorkspace(users[0]._id))
  .then((spaces) => seedSheet(spaces[0]._id))
  .then(() => {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch(function (err) {
      console.error(err);
      process.kill(1);
  });
// });
