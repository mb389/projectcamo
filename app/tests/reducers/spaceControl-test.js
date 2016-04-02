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
      },
      {
        _id: "56feca1a2d3d7d0f09b8cb09",
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

    expect(nextState.sheets[2]._id).toEqual('56feca1a2d3d7d0f09b8cb05')

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


  it('changes the space name with CHANGE_SPACE_NAME', () => {
    const nextState = reducer(initialState, {
      type: types.CHANGE_SPACE_NAME,
      name: 'newSpaceName'
    })

    expect(nextState.space.name).toEqual('newSpaceName')
  })

  it('updates the reference sheet for inception UPDATE_REF_SHEET', () => {

    const nextState = reducer(initialState, {
      type: types.UPDATE_REF_SHEET,
      targetSheet: {
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
      },
      data: {
        data: 'testData',
        rowId: {
          data: 'estData',
          id: '0',
          type: 'ID',
          width: 200
        },
        sheet: '56feca1a2d3d7d0f09b8cb03'
      },
      currSheet: {
        _id: "56feca1a2d3d7d0f09b8cb09",
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
      },
      currRow: {
            '100': {
                type: 'ID',
                data: 'testData',
                id: '0'
              }
          }
    });

  })





});
