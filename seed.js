var mongoose = require('mongoose');
var chalk = require('chalk');
var dbConnect = require('./server');
const Promise = require('bluebird');
var User = Promise.promisifyAll(mongoose.model('User'));
var Workspace = Promise.promisifyAll(mongoose.model('Workspace'));
var Sheet = Promise.promisifyAll(mongoose.model('Sheet'));

const columnHeaders = [
      { id: '0', type: 'name', name: 'Names', idx: 0 },
      { id: '1', type: 'url', name: 'Github URL', idx: 1 },
      { id: '2', type: 'ref', name: 'Images', idx: 2 },
    ]

const row = {
   '0': {
      type: 'string',
      data: 'Oscar'
    },
    '1': {
      type: 'url',
      data: 'https://github.com/elpenao'
    },
    '2': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row1 = {
    '0': {
      type: 'string',
      data: 'Assaf'
    },
    '1': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row2 = {
    '0': {
      type: 'string',
      data: 'Cody'
    },
    '1': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row3 = {
    '0': {
      type: 'string',
      data: 'Mike'
    },
    '1': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const row4 = {
   '0': {
      type: 'string',
      data: 'Oscar'
    },
    '1': {
      type: 'url',
      data: 'github.com/elpenao'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/elpenao'
    }
}

const row5 = {
    '0': {
      type: 'string',
      data: 'Assaf'
    },
    '1': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row6 = {
    '0': {
      type: 'string',
      data: 'Cody'
    },
    '1': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row7 = {
    '0': {
      type: 'string',
      data: 'Mike'
    },
    '1': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const row8 = {
   '0': {
      type: 'string',
      data: 'Oscar'
    },
    '1': {
      type: 'url',
      data: 'github.com/elpenao'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/elpenao'
    }
}

const row9 = {
    '0': {
      type: 'string',
      data: 'Assaf'
    },
    '1': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row10 = {
    '0': {
      type: 'string',
      data: 'Cody'
    },
    '1': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row11 = {
    '0': {
      type: 'string',
      data: 'Mike'
    },
    '1': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const row12 = {
   '0': {
      type: 'string',
      data: 'Oscar'
    },
    '1': {
      type: 'url',
      data: 'github.com/elpenao'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/elpenao'
    }
}

const row13 = {
    '0': {
      type: 'string',
      data: 'Assaf'
    },
    '1': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row14 = {
    '0': {
      type: 'string',
      data: 'Cody'
    },
    '1': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '2': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row15 = {
    '0': {
      type: 'string',
      data: 'Mike'
    },
    '1': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '2': {
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
            password: '0'
        },
        {
            email: 'oscar@camo.com',
            password: '0'
        },
        {
          email: 'mb@camo.com',
          password: '0'
        },
        {
          email: 'assaf@camo.com',
          password: '0'
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

var seedWorkspace = function () {
  var workspace = [
    {
      name: 'Seedspace'
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
