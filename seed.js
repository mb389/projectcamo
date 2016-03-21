var mongoose = require('mongoose');
var chalk = require('chalk');
var dbConnect = require('./server');
const Promise = require('bluebird');
var User = Promise.promisifyAll(mongoose.model('User'));
var Workspace = Promise.promisifyAll(mongoose.model('Workspace'));
var Sheet = Promise.promisifyAll(mongoose.model('Sheet'));

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
      name: "Sheet1",
      content: {},
      workspace: workspaceId
    },
    {
      name: "Sheet2",
      content: {},
      workspace: workspaceId
    }
  ];

  return Sheet.createAsync(sheet);
}

var seedWorkspace = function () {
  var workspace = [
    {
      name: "Seedspace"
    },
    {
      name: "SeedspacePart2"
    }
  ]
  return Workspace.createAsync(workspace);
}

 // dbConnect.then(() => {
  User.remove({})
  .then(() => Workspace.remove({}))
  .then(() => Sheet.remove({}))
  .then(() => seedUsers())
  .then(() => seedWorkspace())
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