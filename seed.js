var mongoose = require('mongoose');
var chalk = require('chalk');
var dbConnect = require('./server');
const Promise = require('bluebird');
var User = Promise.promisifyAll(mongoose.model('User'));
var Workspace = Promise.promisifyAll(mongoose.model('Workspace'));
var Sheet = Promise.promisifyAll(mongoose.model('Sheet'));

const columnHeaders = [
      { id: '123', type: 'name', name: 'Names', idx: 0 },
      { id: '124', type: 'url', name: 'Github URL', idx: 1 },
      { id: '125', type: 'ref', name: 'Images', idx: 2 },
    ]

const row = {
   '123': {
      type: 'string',
      data: 'Oscar'
    },
    "124": {
      type: 'url',
      data: 'https://github.com/elpenao'
    },
    "125": {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row1 = {
    '123': {
      type: 'string',
      data: 'Assaf'
    },
    '124': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row2 = {
    '123': {
      type: 'string',
      data: 'Cody'
    },
    '124': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row3 = {
    '123': {
      type: 'string',
      data: 'Mike'
    },
    '124': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const row4 = {
   '123': {
      type: 'string',
      data: 'Oscar'
    },
    "124": {
      type: 'url',
      data: 'github.com/elpenao'
    },
    "125": {
      type: 'url',
      data: 'linkedIn.com/elpenao'
    }
}

const row5 = {
    '123': {
      type: 'string',
      data: 'Assaf'
    },
    '124': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row6 = {
    '123': {
      type: 'string',
      data: 'Cody'
    },
    '124': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row7 = {
    '123': {
      type: 'string',
      data: 'Mike'
    },
    '124': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const row8 = {
   '123': {
      type: 'string',
      data: 'Oscar'
    },
    "124": {
      type: 'url',
      data: 'github.com/elpenao'
    },
    "125": {
      type: 'url',
      data: 'linkedIn.com/elpenao'
    }
}

const row9 = {
    '123': {
      type: 'string',
      data: 'Assaf'
    },
    '124': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row10 = {
    '123': {
      type: 'string',
      data: 'Cody'
    },
    '124': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row11 = {
    '123': {
      type: 'string',
      data: 'Mike'
    },
    '124': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const row12 = {
   '123': {
      type: 'string',
      data: 'Oscar'
    },
    "124": {
      type: 'url',
      data: 'github.com/elpenao'
    },
    "125": {
      type: 'url',
      data: 'linkedIn.com/elpenao'
    }
}

const row13 = {
    '123': {
      type: 'string',
      data: 'Assaf'
    },
    '124': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row14 = {
    '123': {
      type: 'string',
      data: 'Cody'
    },
    '124': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row15 = {
    '123': {
      type: 'string',
      data: 'Mike'
    },
    '124': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const grid = [row, row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11, row12, row13, row14, row15]
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
      name: "Sheet1",
      content: sheetState,
      workspace: workspaceId
    }
  ];

  return Sheet.createAsync(sheet);
}

var seedWorkspace = function () {
  var workspace = [
    {
      name: "Seedspace"
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
