/* Structure Overview */

const spaces = {
  SheetID: {name: '',
            sheet: {}}
}

const sheet = {
  columnHeaders: [],
  grid: [row, row]
}

const row = {columnIdX:{cell01Info}, columnIdY:{cell02Info}}


/* Example with nested Data */

spaces = {
  SheetID: {
    name: '',
    Sheet: {
      columnHeaders: [
        { id: '123', type: 'string', name: 'Names', idx: 0 },
        { id: '124', type: 'url', name: 'Github URL', idx: 1 },
        { id: '125', type: 'ref', name: 'Repos', idx: 2 },
      ],
      grid: [
        {
          '123': {
            type: 'string'
            data: 'Oscar'
          },
          "124": {
            type: 'url'
            data: 'github.com/elpenao'
          },
          "125": {
            type: 'url',
            data: 'linkedIn.com/elpenao'
          }
        },
        {
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
      ]
    } 
  } 
}


/* Example non-nested */

const column1 = { id: '123', type: 'string', name: 'Names', idx: 0 }
const column2 = { id: '124', type: 'url', name: 'Github URL', idx: 1 }
const column3 = { id: '125', type: 'ref', name: 'Repos', idx: 2 }
// {id: 126, type: 'multipleAttachment', name: 'Images', idx: 3}

const cell12345 = {
  type: 'string'
  data: 'Oscar'
}

const cell12346 = {
  type: 'url'
  data: 'github.com/elpenao'
}

const cell12347 = {
  type: 'url',
  data: 'linkedIn.com/elpenao'
}



const cell22345 = {
  type: 'string'
  data: 'Assaf'
}

const cell22346 = {
  type: 'url'
  data: 'github.com/apackin'
}

const cell22347 = {
  type: 'url',
  data: 'linkedIn.com/apackin'
}

// Keys match the appropriate column header and cell type is registered from there?
const row1 = { '123': cell12345, "124": cell12346, "125": cell12347 }
const row2 = { '123': cell22345, "124": cell22346, "125": cell22347 }

const Sheet = {
  columnHeaders: [column1, column2, column3],
  grid: [row1, row2]
}

const spaces = {
  1: {name: 'Team Info',
      Sheet: Sheet
      }
}









/* Alternative Option */
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

