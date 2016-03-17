columnHeaders: [
    { id: '123', type: 'name', name: 'Names', idx: 0 },
    { id: 124, type: 'url', name: 'Github URL', idx: 1 },
    { id: 125, type: 'ref', name: 'Repos', idx: 2 },
    // {id: 126, type: 'multipleAttachment', name: 'Images', idx: 3}
  ]

grid: [row, row]

row: {
  '123': {
    type: 'string'
    data: 'asd'
  },
  "a2389sadl": {
    type: 'url'
    data: 'github.com/elpenao'
  },
  "asd77812": {
    type: 'url',
    data: 'linkedIn.com/elpenao'
  }
}











const sheet = {
  columnHeaders: [
    { id: 123, type: 'name', name: 'Names', idx: 0 },
    { id: 124, type: 'url', name: 'Github URL', idx: 1 },
    { id: 125, type: 'ref', name: 'Repos', idx: 2 },
    // {id: 126, type: 'multipleAttachment', name: 'Images', idx: 3}
  ],
  rows: [ {
    id: 'a1a',
    idx: 0,
    cells: [{
      columnId: 123,
      columnType: 'name',
      columnIdx: 0,
      data: "Oscar"
    }, {
      columnId: 124,
      columnType: 'url',
      columnIdx: 1,
      data: "github.com/elpenao"
    }, {
      columnId: 125,
      columnType: 'ref',
      columnIdx: 2,
      data: [repo1, repo2] // array of objects?
    }]
  }, {
    id: 'a1b',
    idx: 1,
    cells: [{
      columnId: 123,
      columnType: 'name',
      columnIdx: 0,
      data: "Assaf"
    }, {
      columnId: 124,
      columnType: 'url',
      columnIdx: 1,
      data: "github.com/Assaf"
    }, {
      columnId: 125,
      columnType: 'ref',
      columnIdx: 2,
      data: [repo1, repo2] // array of objects
    }]
  }]
}

const workspace = {
  sheets: [sheet1, sheet2]
}
