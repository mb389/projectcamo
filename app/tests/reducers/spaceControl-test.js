import expect from 'expect';
import md5 from 'spark-md5';
import reducer from 'reducers/spacecontrol';
import * as types from 'constants';

describe('Space Control Reducer', () => {
  const initialState = {
    showShareModal:false,
    sheetNames: [{
      id: "56feca1a2d3d7d0f09b8cb03",
      name: "Sheet1"
    }],
    sheetToShow: {
      _id: "56feca1a2d3d7d0f09b8cb03",
      content: {
        grid: [{
              '100': {
                  type: 'ID',
                  data: 'Cody',
                  id: '0'
                }
            }],
        columnHeaders: [{ id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }],
      }
    },
    history: [],
    name: "Sheet1",
    workspace: "56feca1a2d3d7d0f09b8cb00",
    sheets:[
      {
        _id: "56feca1a2d3d7d0f09b8cb03",
        content: {
          grid: [{
                '100': {
                    type: 'ID',
                    data: 'testData',
                    id: '0'
                  }
              }],
          columnHeaders: [{ id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }],
        }
      }
    ],
    space: {
      _id: "56feca1a2d3d7d0f09b8cb03",
      collabs: [],
      email: 'test@test.com',
      name: 'testName'
    }
  }



  it('should handle ADD_USER_COLLAB', () => {

    const nextState = reducer(initialState, {
      type: types.ADD_USER_COLLAB,
      email: 'newemail@email.com'
    })

    expect(nextState.space.collabs.length).toEqual(1)
    expect(nextState.space.collabs[0]).toEqual('newemail@email.com')

  })


  it('load the given space LOAD_SPACE', () => {

    const nextState = reducer({}, {
      type: types.LOAD_SPACE,
      space: {
        _id: "56feca1a2d3d7d0f09b8cb05",
        collabs: [],
        email: 'test1@test.com',
        name: 'testName1'
      },
      email: 'newemail@test.com',
      sheetToShow: {
        _id: "56feca1a2d3d7d0f09b8cb06",
        content: {
          grid: [{
                '100': {
                    type: 'ID',
                    data: 'New',
                    id: '0'
                  }
              }],
          columnHeaders: [{ id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }],
        }
      },
      sheetNames: [
        {
          id: "56feca1a2d3d7d0f09b8cb00",
          name: "Sheet1"
        },
        {
          id: "56feca1a2d3d7d0f09b8cb01",
          name: "Sheet2"
        }
      ],
      sheets:[
        {
          _id: "56feca1a2d3d7d0f09b8cb03",
          content: {
            grid: [{
                  '100': {
                      type: 'ID',
                      data: 'testData',
                      id: '0'
                    }
                }],
            columnHeaders: [{ id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }],
          }
        }
      ]
    })

    expect(nextState.showShareModal).toEqual(false)
    expect(nextState.space._id).toEqual('56feca1a2d3d7d0f09b8cb05')
    expect(nextState.sheets.length).toEqual(1)

  })


  it('loads the sheet marked as sheetToShow', () => {

    const nextState = reducer(initialState, {
      type: types.LOAD_SHEET,
      sheetToShow: {
        _id: "56feca1a2d3d7d0f09b8cb09",
        content: {
          grid: [{
                '100': {
                    type: 'ID',
                    data: 'Testing',
                    id: '0'
                  }
              }],
          columnHeaders: [{ id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }],
        }
      }
    })

    expect(nextState.sheetToShow._id).toEqual('56feca1a2d3d7d0f09b8cb09')
    expect(nextState.sheetToShow.content.grid[0]['100'].data).toEqual('Testing')
  })


  it('sets the change status for all pages to false for ALL_CHANGED_FALSE', () => {

    const nextState = reducer(initialState, {
      type: types.ALL_CHANGED_FALSE,
    })

    expect(nextState.sheets[0].changed).toEqual(false)

  })


  it('updates sheets for UPDATE_SHEETS when not given a sheet from db', () => {

    const nextState = reducer(initialState, {
      type: types.UPDATE_SHEETS,
      sheetId: '56feca1a2d3d7d0f09b8cb03',
      sheetContent: {
        grid: [{
              '100': {
                  type: 'ID',
                  data: 'testData',
                  id: '0'
                }
            }],
        columnHeaders: [{ id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }],
      }
    })

    expect(nextState.sheets[0]._id).toEqual('56feca1a2d3d7d0f09b8cb03')

  })

  it('updates sheets for UPDATE_SHEETS when not given a sheet from db', () => {

    const nextState = reducer(initialState, {
      type: types.UPDATE_SHEETS,
      sheetId: '56feca1a2d3d7d0f09b8cb05',
      dbSheet: {
        _id: "56feca1a2d3d7d0f09b8cb05",
        content: {
          grid: [{
                '100': {
                    type: 'ID',
                    data: 'Cody',
                    id: '0'
                  }
              }],
          columnHeaders: [{ id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }],
        }
      },
      sheetContent: {
        grid: [{
              '100': {
                  type: 'ID',
                  data: 'Cody',
                  id: '0'
                }
            }],
        columnHeaders: [{ id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }],
      }
    })

    expect(nextState.sheets[1]._id).toEqual('56feca1a2d3d7d0f09b8cb05')

  })


  it('changes the name of the sheet with CHANGE_SHEET_NAME', () => {

    const nextState = reducer(initialState, {
      type: types.CHANGE_SHEET_NAME,
      name: 'newTestName',
      sheetId: '56feca1a2d3d7d0f09b8cb03'
    })

    expect(nextState.sheetToShow.name).toEqual('newTestName')
    expect(nextState.sheetNames.length).toEqual(initialState.sheetNames.length)

  })

  it('changes the name of the sheet with CHANGE_SHEET_NAME without adding to length of sheet names', () => {

    const nextState = reducer(initialState, {
      type: types.CHANGE_SHEET_NAME,
      name: 'newTestName',
      sheetId: '56feca1a2d3d7d0f09b8cb03'
    })

    expect(nextState.sheetNames.length).toEqual(initialState.sheetNames.length)

  })

  it('hides the share modal CLOSE_SHARE_MODAL', () => {

    const nextState = reducer(initialState, {
      type: types.CLOSE_SHARE_MODAL
    })

    expect(nextState.showShareModal).toEqual(false)

  })


  it('shows the share modal SHOW_SHARE_MODAL', () => {

    const nextState = reducer(initialState, {
      type: types.SHOW_SHARE_MODAL
    })

    expect(nextState.showShareModal).toEqual(true)

  })

  it('toggles the state of searching with SEARCHING action set to true', () => {

    const nextState = reducer(initialState, {
      type: types.SEARCHING,
      bool: true
    })

    expect(nextState.searching).toEqual(true)


  })


  it('toggles the state of searching with SEARCHING action set to false', () => {

    const nextState = reducer(initialState, {
      type: types.SEARCHING,
      bool: false
    })

    expect(nextState.searching).toEqual(false)


  })

  //
  // it('should handle ADD_ROW', () => {
  //
  //   const action = {
  //     type: types.ADD_ROW
  //   }
  //
  //   const nextState = reducer(initialState, action);
  //
  //   expect(nextState.grid.length).toEqual(initialState.grid.length + 1)
  //   expect(nextState.grid[0]['100'].type).toEqual('ID')
  //
  // })
  //
  // it('should handle ADD_ROW for different types', () => {
  //   const state = {
  //     grid: [],
  //     columnHeaders: [
  //       {id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 },
  //       {id: "101", idx: 1, name: "Skills", linkedSheet: "56f845ce7ed6ca5a3dc2c360", type: "Reference"},
  //       {type: "Images", name: "Pic", id: "102", idx: 2},
  //       {type: "Text", name: "Info", id: "103", idx: 4},
  //       {type: "Number", name: "Column 4", id: "104", idx: 4},
  //       {type: "Checkbox", name: "Column 5", id: "105", idx: 5},
  //       {type: "Select", name: "Column 6", id: "106", idx: 6}
  //     ],
  //     showRowModal: false,
  //     modalRow: {
  //       data:null,
  //       rowIdx:null
  //     }
  //   }
  //
  //   const action = {
  //     type: types.ADD_ROW
  //   }
  //
  //   const nextState = reducer(state, action);
  //
  //   expect(nextState.grid.length).toEqual(state.grid.length + 1)
  //   expect(nextState.grid[0]['100'].type).toEqual('ID')
  //   expect(nextState.grid[0]['101'].type).toEqual('Reference')
  //   expect(nextState.grid[0]['102'].type).toEqual('Images')
  //   expect(nextState.grid[0]['103'].type).toEqual('Text')
  //   expect(nextState.grid[0]['104'].type).toEqual('Number')
  //   expect(nextState.grid[0]['105'].type).toEqual('Checkbox')
  //   expect(nextState.grid[0]['106'].type).toEqual('Select')
  //
  // })
  //
  //
  // it('should handle SORT_COLUMN', () => {
  //   const state = {
  //     grid: [
  //       {
  //         '100': {
  //             type: 'ID',
  //             data: 'Oscar',
  //             id: '0'
  //           }
  //       },
  //       {
  //         '100': {
  //             type: 'ID',
  //             data: 'Mike',
  //             id: '1'
  //           }
  //       }
  //     ],
  //     columnHeaders: [
  //       {id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }
  //     ],
  //     showRowModal: false,
  //     modalRow: {
  //       data:null,
  //       rowIdx:null
  //     }
  //   }
  //
  //   const asc = {
  //     type: types.SORT_COLUMN,
  //     sortBy: {
  //       colId: '100',
  //       order: 1
  //     }
  //   }
  //
  //   const ascState = reducer(state, asc);
  //
  //   const desc = {
  //     type: types.SORT_COLUMN,
  //     sortBy: {
  //       colId: '100',
  //       order: -1
  //     }
  //   }
  //
  //   const descState = reducer(state, desc);
  //
  //
  //   expect(ascState.grid[0]['100'].data).toEqual('Mike')
  //   expect(descState.grid[0]['100'].data).toEqual('Oscar')
  //
  // })
  //
  // it('should handle SEARCH_SHEET', () => {
  //
  //   const action = {
  //     type: types.SEARCH_SHEET,
  //     term: "Mike"
  //   }
  //
  //   const nextState = reducer(threebyThree, action);
  //
  //   expect(nextState.filteredRows.length).toEqual(1)
  //
  // })
  //
  // it('should handle UPDATE_CELL', () => {
  //   let state = threebyThree
  //   const action = {
  //     type: types.UPDATE_CELL,
  //     cell: {
  //       data: "hilla",
  //       idx: 0,
  //       key: "100"
  //     }
  //   }
  //
  //   state.currentCell = { cell: {} }
  //
  //   const nextState = reducer(state, action);
  //
  //   expect(nextState.grid[0]['100'].data).toEqual('hilla')
  //
  // })
  //
  // it('should handle UPDATE_CELL_BY_ID', () => {
  //
  //   const action = {
  //     type: types.UPDATE_CELL_BY_ID,
  //     cell: {
  //       data: "hilla",
  //       id: '0'
  //     }
  //   }
  //
  //   const nextState = reducer(threebyThree, action);
  //
  //   expect(nextState.grid[0]['100'].data).toEqual('hilla')
  //
  // })
  //
  // it('should handle UPDATE_MODAL_CELL to an array', () => {
  //   let state = threebyThree
  //
  //   state.modalRow = {
  //     data : {
  //       '100': {
  //           type: 'ID',
  //           data: 'Oscar',
  //           id: '0'
  //         },
  //       '101': {
  //           type: 'Images',
  //           data: ["placeholdit.com/400/400"],
  //           id: '1'
  //         },
  //       '102': {
  //           type: 'Text',
  //           data: 'Hello',
  //           id: '2'
  //         }
  //     }
  //   }
  //   state.currentCell = {}
  //
  //   const action = {
  //     type: types.UPDATE_MODAL_CELL,
  //     cell: {
  //       data: "google.com",
  //       key: '101',
  //       idx: 0
  //     },
  //     push: true
  //
  //   }
  //
  //   const nextState = reducer(state, action);
  //
  //   expect(nextState.modalRow.data['101'].data.length).toEqual(2)
  //
  // })
  //
  // it('should handle CLOSE_ROW_MODAL and update grid', () => {
  //   let state = initialState
  //
  //   state.modalRow = {
  //     data : {
  //       '100': {
  //             type: 'ID',
  //             data: 'redux',
  //             id: '0'
  //           }
  //     },
  //     rowIdx: 0
  //   }
  //   state.currentCell = {}
  //
  //   const closeModal = {
  //     type: types.CLOSE_ROW_MODAL
  //   }
  //
  //   let nextState = reducer(state, closeModal);
  //
  //   expect(nextState.grid[0]['100'].data).toEqual('redux')
  //
  // })


});
