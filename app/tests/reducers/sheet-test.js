import expect from 'expect';
import md5 from 'spark-md5';
import reducer from 'reducers/sheet';
import * as types from 'constants';

describe('Sheets reducer', () => {
  const initialState = {
    grid: [{
          '100': {
              type: 'ID',
              data: 'Oscar',
              id: '0'
            }
        }],
    columnHeaders: [{ id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }],
    showRowModal: false,
    modalRow: {
      data:null,
      rowIdx:null
    } 
  }

  const threebyThree = {
    grid: [
        {
          '100': {
              type: 'ID',
              data: 'Oscar',
              id: '0'
            },
          '101': {
              type: 'Images',
              data: ["placeholdit.com/400/400"],
              id: '1'
            },
          '102': {
              type: 'Text',
              data: 'Hello',
              id: '2'
            }
        },
        {
          '100': {
              type: 'ID',
              data: 'Mike',
              id: '3'
            },
          '101': {
              type: 'Images',
              data: ["placeholdit.com/400/400"],
              id: '4'
            },
          '102': {
              type: 'Text',
              data: 'Hi',
              id: '5'
            }
        }
    ],
    columnHeaders: [
      {id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 },
      {type: "Images", name: "Pic", id: "101", idx: 2},
      {type: "Text", name: "Info", id: "102", idx: 4}
    ],
    showRowModal: false,
    modalRow: {
      data:null,
      rowIdx:null
    } 
  }

  it('should handle ADD_COLUMN', () => {
    
    const nextState = reducer(initialState, {type: types.ADD_COLUMN})

    expect(nextState.columnHeaders.length).toEqual(2)  
    expect(nextState.grid[0]['101']).toExist()  

  })

  it('should handle ADD_ROW', () => {

    const action = {
      type: types.ADD_ROW
    }

    const nextState = reducer(initialState, action);
    
    expect(nextState.grid.length).toEqual(initialState.grid.length + 1)
    expect(nextState.grid[0]['100'].type).toEqual('ID')

  })

  it('should handle ADD_ROW for different types', () => {
    const state = {
      grid: [],
      columnHeaders: [
        {id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 },
        {id: "101", idx: 1, name: "Skills", linkedSheet: "56f845ce7ed6ca5a3dc2c360", type: "Reference"},
        {type: "Images", name: "Pic", id: "102", idx: 2},
        {type: "Text", name: "Info", id: "103", idx: 4},
        {type: "Number", name: "Column 4", id: "104", idx: 4},
        {type: "Checkbox", name: "Column 5", id: "105", idx: 5},
        {type: "Select", name: "Column 6", id: "106", idx: 6}
      ],
      showRowModal: false,
      modalRow: {
        data:null,
        rowIdx:null
      }
    } 

    const action = {
      type: types.ADD_ROW
    }

    const nextState = reducer(state, action);
    
    expect(nextState.grid.length).toEqual(state.grid.length + 1)
    expect(nextState.grid[0]['100'].type).toEqual('ID')
    expect(nextState.grid[0]['101'].type).toEqual('Reference')
    expect(nextState.grid[0]['102'].type).toEqual('Images')
    expect(nextState.grid[0]['103'].type).toEqual('Text')
    expect(nextState.grid[0]['104'].type).toEqual('Number')
    expect(nextState.grid[0]['105'].type).toEqual('Checkbox')
    expect(nextState.grid[0]['106'].type).toEqual('Select')

  })


  it('should handle SORT_COLUMN', () => {
    const state = {
      grid: [
        {
          '100': {
              type: 'ID',
              data: 'Oscar',
              id: '0'
            }
        },
        {
          '100': {
              type: 'ID',
              data: 'Mike',
              id: '1'
            }
        }
      ],
      columnHeaders: [
        {id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }
      ],
      showRowModal: false,
      modalRow: {
        data:null,
        rowIdx:null
      }
    } 

    const asc = {
      type: types.SORT_COLUMN,
      sortBy: {
        colId: '100',
        order: 1
      }
    }

    const ascState = reducer(state, asc);
        
    const desc = {
      type: types.SORT_COLUMN,
      sortBy: {
        colId: '100',
        order: -1
      }
    }

    const descState = reducer(state, desc);
        

    expect(ascState.grid[0]['100'].data).toEqual('Mike')
    expect(descState.grid[0]['100'].data).toEqual('Oscar')

  })

  it('should handle SEARCH_SHEET', () => {

    const action = {
      type: types.SEARCH_SHEET,
      term: "Mike"
    }

    const nextState = reducer(threebyThree, action);

    expect(nextState.filteredRows.length).toEqual(1)

  })

  it('should handle UPDATE_CELL', () => {
    let state = threebyThree
    const action = {
      type: types.UPDATE_CELL,
      cell: {
        data: "hilla",
        idx: 0,
        key: "100"
      } 
    }

    state.currentCell = { cell: {} }

    const nextState = reducer(state, action);

    expect(nextState.grid[0]['100'].data).toEqual('hilla')

  })

  it('should handle UPDATE_CELL_BY_ID', () => {

    const action = {
      type: types.UPDATE_CELL_BY_ID,
      cell: {
        data: "hilla",
        id: '0'
      } 
    }

    const nextState = reducer(threebyThree, action);

    expect(nextState.grid[0]['100'].data).toEqual('hilla')

  })

  it('should handle UPDATE_MODAL_CELL to an array', () => {
    let state = threebyThree

    state.modalRow = {
      data : {
        '100': {
            type: 'ID',
            data: 'Oscar',
            id: '0'
          },
        '101': {
            type: 'Images',
            data: ["placeholdit.com/400/400"],
            id: '1'
          },
        '102': {
            type: 'Text',
            data: 'Hello',
            id: '2'
          }
      }
    }
    state.currentCell = {}

    const action = {
      type: types.UPDATE_MODAL_CELL,
      cell: {
        data: "google.com",
        key: '101',
        idx: 0
      },
      push: true

    }

    const nextState = reducer(state, action);

    expect(nextState.modalRow.data['101'].data.length).toEqual(2)

  })

  it('should handle CLOSE_ROW_MODAL and update grid', () => {
    let state = initialState

    state.modalRow = {
      data : {
        '100': {
              type: 'ID',
              data: 'redux',
              id: '0'
            }
      },
      rowIdx: 0
    }
    state.currentCell = {}

    const closeModal = {
      type: types.CLOSE_ROW_MODAL
    }

    let nextState = reducer(state, closeModal);

    expect(nextState.grid[0]['100'].data).toEqual('redux')

  })


});
