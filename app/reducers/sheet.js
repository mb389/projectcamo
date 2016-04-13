import _ from 'lodash';
import { Map, List, fromJS, toJS } from 'immutable';
import {
  // set changed to true
  UPDATE_CELL,
  UPDATE_CELL_BY_ID,
  ADD_ROW,
  DELETE_ROW,
  ADD_COLUMN,
  UPDATE_COLUMN,
  SORT_COLUMN,
  REMOVE_COLUMN,
  INSERT_COLUMN,
  FORMULA_COLUMN,
  RESIZE_TABLE_COL,
  // no need to set changed to true
  TOGGLE_CHANGED,
  UPDATE_MODAL_CELL,
  CHANGE_SHEET,
  CLEAR_SHEET,
  SHOW_HISTORY_MODAL,
  CLOSE_HISTORY_MODAL,
  CURRENT_CELL,
  SET_HISTORY_TABLE,
  UPDATE_HISTORY,
  SEARCH_SHEET,
  CLEAR_SEARCH_GRID,
  CLEAR_FILTERED_ROWS,
  SHOW_LOOKUP_MODAL,
  CLOSE_LOOKUP_MODAL,
  SHOW_ROW_MODAL,
  CLOSE_ROW_MODAL,
  MOVE_TO_CELL,
  SHOW_MAP,
  HIDE_MAP,
  DRAG_TABLE_COL,
  SEND_LAT_LONGS
} from 'constants/index';
import {
  insertNewColInRows,
  runCustomFunc,
  navToNewCell,
  newColInfo
} from './sheetHelpers.js';

export default function sheet(state = {
  grid: [],
  columnHeaders: [],
  showRowModal: false,
  modalRow: {data:null,rowIdx:null} }, action = {}) {
    let immutableState = fromJS(state);
  switch (action.type) {
    case CLEAR_SHEET:
      return {}
    case CHANGE_SHEET:
      // {
        // let newState=_.cloneDeep(state);

        action.sheet.grid.forEach(row => {
          for (let cell in row){
            row[cell].focused = false;
          }
        })


        // const newGridState = immutableState.map(row => {
        //   return row.map(cell => cell.set('focused', false))
        // })


        // newState.columnHeaders = action.sheet.columnHeaders || [];
        // newState.grid = action.sheet.grid || [];
        // if (newState.grid[0] && newState.grid[0]['100']) {
        //   newState.grid[0]['100'].focused = true;
        //   newState.currentCell = {
        //     cell: newState.grid[0]['100'],
        //     rowIdx: 0,
        //     cellKey: "100"
        //   };
        // }
        // newState.history = action.history || [];
        // newState.historySheet = action.historySheet || null;
        // newState.modalRow = {
        //   data: null,
        //   rowIdx: null
        // };
        // newState.showRowModal= false;
        // newState.showHistoryModal= false;
        // newState.changed = false;
        // return newState


        const newGridToSet = action.sheet.grid ? fromJS(action.sheet.grid) : List()
        console.log(newGridToSet.hasIn(['grid','0','100']))

        const newGridWFocus = newGridToSet.hasIn(['grid','0','100']) ? newGridToSet.setIn(['0', '100', 'focused'], true) : newGridToSet

        console.log(newGridWFocus.toJS())

        return immutableState
          .set('columnHeaders', action.sheet ? action.sheet.columnHeaders : List())
          // .set('grid', action.sheet.grid ? action.sheet.grid : List())
          // .setIn(['grid','0', '100', 'focused'], true)
          .set('grid', newGridWFocus)
          .set('currentCell', Map({
            cell: newGridToSet.getIn(['0', '100']),
            rowIdx: 0,
            cellKey: '100'
          }))
          .set('history', action.history ? action.history : List())
          .set('historySheet', action.historySheet ? action.historySheet : List())
          .set('modalRow', Map({
            data: null,
            rowIdx: null
          }))
          .set('showRowModal', false)
          .set('showHistoryModal', false)
          .set('changed', false)
          .toJS()

    case TOGGLE_CHANGED:
      // {
      //   let newState = _.cloneDeep(state)
      //   newState.changed = false
      //   return newState
      // }
      return immutableState.set('changed', false).toJS();

    case UPDATE_CELL:
      // {
      //   let newState = _.cloneDeep(state);
      //   if(action.fromSuper && newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey]) {
      //     newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey].focused = false;
      //   }
      //   newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
      //   newState.currentCell.cell.data = action.cell.data;
      //   if (action.formulaCells)
      //   {
      //     action.formulaCells.forEach(cell =>{
      //       let data = runCustomFunc(newState, newState.grid[action.cell.idx], cell.formula);
      //       newState.grid[action.cell.idx][cell.col].data = data;
      //     })
      //   }
      //   newState.changed = true
      //   return newState
      // }
      //
      let stateWithoutCC = immutableState
      if (action.fromSuper && immutableState.get('grid').hasIn([immutableState.getIn(['currentCell', 'rowIdx']), immutableState.getIn(['currentCell', 'cellKey'])])) {
        stateWithoutCC = immutableState.setIn(['grid', immutableState.getIn(['currentCell', 'rowIdx']), immutableState.getIn(['currentCell', 'cellKey']), 'focused'], false)
      }

      return stateWithoutCC
          .setIn(['grid', action.cell.idx, action.cell.key, 'data'], action.cell.data)
          .setIn(['currentCell', 'cell', 'data'], action.cell.data)
          .update('grid', grid => {
            return grid.map((row, rowI) => {
              return row.map((cell, cellI) => {
                if(action.formulaCells && cellI === action.idx) {
                  return runCustomFunc(stateWithoutCC, row, action.formulaCells[cellI])
                } else {
                  return cell
                }
              })
            })
          })
          .toJS()



    case UPDATE_CELL_BY_ID:
      // {
      //   let newState = _.cloneDeep(state);
      //   newState.grid.forEach(function(row){
      //     for (let key in row) {
      //       if (row[key].id == action.cell.id) {
      //         row[key].data = action.cell.data;
      //         break;
      //       }
      //     }
      //   })
      //
      //
      //   newState.changed = true
      //   return newState
      // }

      // TODO use updateIn instead of multiple step
      let newStateGrid = immutableState
                      .get('grid')
                      .map(row => {
                        return row.map(key => {
                          if(key.get('id') === action.cell.id) {
                            return key.set('data', action.cell.data)
                          } else {
                            return key
                          }
                        })
                      })

      return immutableState
              .set('grid', newStateGrid)
              .toJS()

    case MOVE_TO_CELL:
      // {
      //   let newState = _.cloneDeep(state);
      //   let newCoord = navToNewCell(action.keyCode, newState);
      //   newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey].focused = false;
      //   newState.currentCell.cell = state.grid[newCoord.newRowIdx][newCoord.newColId];
      //   newState.currentCell.rowIdx = newCoord.newRowIdx;
      //   newState.currentCell.cellKey = newCoord.newColId;
      //   newState.grid[newCoord.newRowIdx][newCoord.newColId].focused = true;
      //   return newState
      // }

      let newCoord = navToNewCell(action.keyCode, immutableState);

      return immutableState
              .setIn(['grid', immutableState.getIn(['currentCell','rowIdx']), immutableState.getIn(['currentCell','cellKey']), 'focused'], false)
              .setIn(['currentCell', 'cell'], immutableState.getIn(['grid', newCoord.get('newRowIdx'), newCoord.get('newColId')]))
              .setIn(['currentCell','rowIdx'], newCoord.get('newRowIdx'))
              .setIn(['currentCell','cellKey'], newCoord.get('newColId'))
              .setIn(['grid', newCoord.get('newRowIdx'), newCoord.get('newColId'), 'focused'], true)
              .toJS()


    case CURRENT_CELL:
      // {
      //   let newState = _.cloneDeep(state);
      //   if(newState.currentCell) newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey].focused = false;
      //   newState.currentCell = action.cell;
      //   if(action.cell) newState.grid[action.cell.rowIdx][action.cell.cellKey].focused = true;
      //   // find cell and give it focus
      //   return newState
      // }

      let CCCurrentCellState = immutableState;
      if(immutableState.has('currentCell')) {
          CCCurrentCellState = immutableState.setIn(['grid',
                  immutableState.getIn(['currentCell', 'rowIdx']),
                  immutableState.getIn(['currentCell', 'cellKey']),
                  'focused'], false)
                  .set('currentCell', action.cell)
      }

      if (action.cell) {
        return CCCurrentCellState.setIn(['grid', action.cell.rowIdx, action.cell.cellKey, 'focused'], true).toJS()
      } else {
        return CCCurrentCellState.toJS();
      }


    case UPDATE_MODAL_CELL:
      // {
      //   let modalRowState = _.cloneDeep(state);
      //   if (action.push) {
      //     modalRowState.modalRow.data[action.cell.key].data.push(action.cell.data)
      //   } else {
      //     modalRowState.modalRow.data[action.cell.key].data = action.cell.data
      //   }
      //   return modalRowState
      // }

      return action.push ? immutableState.updateIn(['modalRow', 'data', action.cell.key, 'data'], data => data.push(action.cell.data)).toJS()
      : immutableState.setIn(['modalRow', 'data', action.cell.key, 'data'], action.cell.data).toJS()


    case SHOW_LOOKUP_MODAL:
      // {
      //   let newState = _.cloneDeep(state)
      //   newState.showLookupModal = true;
      //   newState.lookup = {
      //     row: action.row,
      //     cell: action.cell,
      //     rowIdx: action.rowIdx,
      //     colId: action.cellKey
      //   }
      //   return newState
      // }
      return immutableState
              .set('showLookupModal', false)
              .set('lookup', Map({
                row: action.row,
                cell: action.cell,
                rowIdx: action.rowIdx,
                colId: action.cellKey
              }))
              .toJS()

    case CLOSE_LOOKUP_MODAL:

      // {
      // let newState = _.cloneDeep(state)
      // newState.showLookupModal = false;
      // return newState
      // }
      return immutableState.set('showLookupModal', false).toJS()


    case SHOW_ROW_MODAL:
      // {
      //   let newState = _.cloneDeep(state)
      //   newState.showRowModal = true;
      //   newState.modalRow = {
      //     data: state.grid[action.rowIdx],
      //     rowIdx: action.rowIdx
      //   }
      //   return newState
      // }

      return immutableState
              .set('showRowModal', true)
              .set('modalRow', Map({
                data: immutableState.getIn(['grid', action.rowIdx]),
                rowIdx: action.rowIdx
              }))
              .toJS();

    case CLOSE_ROW_MODAL:

      // {
      //   let newState = _.cloneDeep(state)
      //   console.log(newState.modalRow.data)
      //   newState.showRowModal = false;
      //   if (!action.dontSave) {
      //     newState.grid[newState.modalRow.rowIdx] = newState.modalRow.data
      //   }
      //   newState.modalRow.data = null;
      //   newState.modalRow.rowIdx = null;
      //   newState.changed = true;
      //   return newState

      let savedGridRow;
      let savedGridRowState = immutableState;
      if(!action.dontSave) {
        savedGridRow = immutableState.get('grid').set(immutableState.getIn(['modalRow', 'rowIdx']),immutableState.getIn(['modalRow', 'data']))
        savedGridRowState = immutableState.set('grid', savedGridRow);

      }
      return savedGridRowState
              .set('showRowModal', false)
              .set('changed', true)
              .setIn(['modalRow', 'data'], null)
              .setIn(['moalRow', 'rowIdx'], null)
              .toJS()

    case SHOW_HISTORY_MODAL:
      {
        return immutableState.set('showHistoryModal', true).toJS()
      }
    case SET_HISTORY_TABLE:
      {
        return immutableState.set('historySheet', immutableState.getIn(['history', action.index])).toJS()  // state.history[action.index]).toJS()
      }
    case UPDATE_HISTORY:
      {
        return immutableState.set('history', action.history).toJS();
      }
    case CLOSE_HISTORY_MODAL:
      {
        return immutableState.set('showHistoryModal', false).set('historySheet', null).toJS()
      }
    case ADD_COLUMN:
      // {
      //   let newState =  _.cloneDeep(state);
      //   let newColumn = newColInfo(newState.columnHeaders)
      //
      //   newState.columnHeaders.push(newColumn);
      //   newState = insertNewColInRows(newState, newColumn);
      //   newState.changed = true
      //   return newState;
      // }
      let columnToAdd = newColInfo(immutableState.get('columnHeaders'));

      return insertNewColInRows(immutableState
              .update('columnHeaders', ch => ch.push(columnToAdd)),columnToAdd)
              .set('changed',  true)
              .toJS()

      // const newColumnAC = newColInfo(immutableState.get('columnHeaders').toJS())
      //
      // const newState =  immutableState.updateIn('columnHeaders', col => col.push(newColumnAC))



    case UPDATE_COLUMN:
      // {
      //   let newState =  _.cloneDeep(state);
      //   let updatingId = action.data.id;
      //   newState.columnHeaders = newState.columnHeaders.map(column=>{
      //     if (column.id===updatingId) {return action.data}
      //     else return column;
      //   })
      //
      //   newState.grid = newState.grid.map(row=>{
      //     let curRow = row[updatingId];
      //     curRow.type = action.data.type;
      //     if(action.data.type==="Checkbox") curRow.data = "off";
      //     if(action.data.formula) {
      //       curRow.data = runCustomFunc(newState, row, action.data.formula);
      //       curRow.formula = action.data.formula;
      //     }
      //     if(action.data.selectOptions) {
      //       curRow.selectOptions = action.data.selectOptions;
      //     }
      //     return row;
      //   })
      //   newState.changed = true;
      //   return newState;
      // }

      return immutableState
              .update('columnHeaders', columnHeaders => columnHeaders.map(column => {
                return column.get('id') === action.data.id ? action.data : column;
              }))
              .update('grid', grid => grid.map(row => {
                let curCell = row
                                .get(action.data.id)
                                .set('type', action.data.type)
                                .update('data', data => action.data.type === "Checkbox" ? 'off' : null)
                                .update('data', data => action.data.formula ? runCustomFunc(immutableState, row, action.data.formula) : data)
                                .update('formula', formula => {if(action.data.formula) return action.data.formula})
                                .update('selectOptions', options => {if(action.data.selectOptions) return action.data.selectOptions})

                return row.set(action.data.id, curCell)
              }))
              .set('changed', true)
              .toJS()


    case INSERT_COLUMN:
      // {
      //   let newState = _.cloneDeep(state);
      //
      //   let newColumn = newColInfo(newState.columnHeaders)
      //   newColumn.name = 'Column ' + (1+action.colIdx);
      //   newColumn.idx = action.colIdx;
      //
      //   newState.columnHeaders = newState.columnHeaders.map(column=>{
      //     if (column.idx >= action.colIdx) {column.idx++}
      //     return column;
      //   })
      //
      //   newState.columnHeaders.splice(action.colIdx, 0, newColumn);
      //
      //   newState = insertNewColInRows(newState, newColumn);
      //   newState.changed = true;
      //   return newState
      // }


      let columnToInsert = newColInfo(immutableState.get('columnHeaders'))
                        .set('name', 'Column ' + (1+action.colIdx))
                        .set('idx', action.colIdx)

      return inserNewColInRowsIm(immutableState.update('columnHeaders', columnHeaders => columnHeaders.map(column => {
        if (column.get('idx') >= action.colIdx) return column.set('idx',column.get('idx')+1)
        else return column
      }))
      .insert(action.colIdx, 0, columnToInsert),columnToInsert).set('changed', true)
      .toJS()



    case SORT_COLUMN:
      // {
      //   let newState = _.cloneDeep(state);
      //   let colId = action.sortBy.colId;
      //   let sortFn = function(a,b){
      //       if (!a[colId].data) return (1);
      //       else if (!b[colId].data) return (-1);
      //       else if (a[colId].data > b[colId].data) return (1*action.sortBy.order);
      //       else if (b[colId].data > a[colId].data) return (-1*action.sortBy.order);
      //       else return 0;
      //   };
      //   newState.grid = newState.grid.sort(sortFn);
      //   newState.changed = true;
      //   return newState;
      // }

      let colId = action.sortBy.colId;
      let sortFnImm = function(a, b) {
        if(!a.hasIn([colId, 'data'])) return 1;
        else if(!b.hasIn([colId, 'data'])) return -1;
        else if(a.getIn([colId,'data'])>b.getIn([colId,'data'])) return (1*action.sortBy.order)
        else if(b.getIn([colId,'data'])>a.getIn([colId,'data'])) return (-1*action.sortBy.order)
        else return 0;
      }
      return immutableState
        .updateIn(['grid'], grid => grid.sort(sortFnImm))
        .set('changed', true)
        .toJS()

    case SEARCH_SHEET:
      // {
      //   let newState = _.cloneDeep(state);
      //   // approach to hide the rows that don't meet search criteria
      //   newState.filteredRows = newState.grid.reduce((accum, row, idx) => {
      //     let toSave;
      //     for(let cell in row) {
      //       if (row[cell].data && typeof row[cell].data === 'string') {
      //         row[cell].data.toLowerCase().indexOf(action.term.toLowerCase()) > -1 ? toSave = true : null;
      //       }
      //     }
      //     if (!toSave) accum.push(idx);
      //     return accum;
      //   }, [])
      //   return newState;
      // }

      return immutableState
        .set('filteredRows',
        immutableState.get('grid')
          .reduce((accum, row, idx) => {
            let toSave;
            row.forEach(cell => {
              if (cell.has('data') && typeof cell.get('data') === 'string') {
                cell.get('data').toLowerCase().indexOf(action.term.toLowerCase()) > -1 ?
                  toSave = true : null;
              }
            })
            if (!toSave) return accum.push(idx);
            else return accum
          }, List())
        )
        .toJS()

    case CLEAR_FILTERED_ROWS:
      // {
      //   let newState = _.cloneDeep(state);
      //   newState.filteredRows = [];
      //   return newState;
      //
      // }
      return immutableState.set('filteredRows', []).toJS();
    case REMOVE_COLUMN:
      // {
      //   let newState = _.cloneDeep(state);
      //   // let colId = action.colId ? action.colId : newState.columnHeaders[newState.columnHeaders.length-1].id ;
      //
      //   newState.columnHeaders = newState.columnHeaders.filter(col => {
      //     return colId !== col.id;
      //   })
      //
      //   newState.grid = newState.grid.map(row=>{
      //     if (row[colId]) delete row[colId];
      //     return row;
      //   })
      //   newState.changed = true;
      //   return newState;
      // }


      let colIdIm = action.colId ? action.colId :
        immutableState.getIn(['columnHeaders',immutableState.get('columnHeaders').length-1, 'id'])

      return immutableState
              .updateIn(['columnHeaders'], cols => cols.filter(col => colIdIm !== col.get('id')))
              .updateIn(['grid'], grid => grid.map(row => row.delete(colIdIm)))
              .set('changed', true)
              .toJS()

    case FORMULA_COLUMN:
      // {
      //   let newState = _.cloneDeep(state);
      //
      //   let newColumn = Object.assign({}, action.colData);
      //   let colIdIdx = newColInfo(newState.columnHeaders);
      //   newColumn.id = colIdIdx.id;
      //   newColumn.name = 'Column ' + colIdIdx.idx;
      //   newColumn.idx = colIdIdx.idx;
      //
      //   // action.arrMeth usually = 'map' or 'reduce';
      //   newState.grid = newState.grid[action.arrMeth]((row) =>{
      //     let newData = action.func(row[action.colData.id].data);
      //
      //     // TODO should this corralate to the type of the new cell?
      //     // if (!newColumn.type) newColumn.type = 'Text';
      //
      //     row[newColumn.id] = {
      //       data: newData,
      //       type: newColumn.type,
      //       width: newColumn.width,
      //     }
      //     return row;
      //   })
      //
      //   newState.columnHeaders.push(newColumn);
      //   newState.changed = true;
      //   return newState;
      // }
      let colIdIdx = newColInfo(immutableState.get('columnHeaders'))
      let newColumn = Map(action.colData)
                        .set('id', colIdIdx.get('id'))
                        .set('name', 'Column ' + colIdIdx.get('idx'))
                        .set('idx', colIdIdx.get('idx'))


      // TODO assume map method for arr.method - confirm that is satisfactory
      return immutableState.update('grid', grid => grid.map(row => {
        let newData = action.func(row.getIn([action.coldata.id,'data']))
        return row.set(newColumn.get('id'), Map({
          data: newData,
          type: newColumn.get('type'),
          width: newColumn.get('width')
        }))
      }))
      .update('columnHeaders', headers => headers.push(newColumn))
      .set('changed', true)
      .toJS()

    case ADD_ROW:
      // {
      //   let newState = _.cloneDeep(state);
      //   let newRow = {}
      //   newState.columnHeaders.forEach(function(col) {
      //     newRow[col.id] = { width: col.width || 200 ,data: null, type: col.type, id: col.id + Math.floor((Math.random() * (99999999 - 111111) + 111111)) }
      //     if (col.formula) newRow[col.id].formula = col.formula;
      //     if (col.selectOptions) newRow[col.id].selectOptions = col.selectOptions;
      //   })
      //   newState.grid.push(newRow)
      //   newState.changed = true;
      //   return newState
      // }

      const rowToAddAdd = immutableState.get('columnHeaders').reduce((accum, col) => {
        return accum.set(col.get('id'),
        Map({
          width: col.has('width') ?  col.get('width'): 200,
          data: null,
          type: col.get('type'),
          id: col.get('id') + Math.floor((Math.random() * (99999999 - 111111) + 111111)),
          formula: col.has('formula') ? col.get('formula') : '',
          selectOptions: col.has('selectOptions') ? col.get('selectOptions') : ''
        }))
        }
        , Map())

        const newGridAdd = immutableState.get('grid').push(rowToAddAdd);

        return immutableState
                .set('changed', true)
                .set('grid', newGridAdd)
                .toJS()

    case DELETE_ROW:

      // {
      //   let newState = _.cloneDeep(state);
      //   let newGrid = []
      //   newState.currentCell = null;
      //   newState.grid.forEach((row,i)=>{
      //     if (i !== action.rowIdx) {
      //       newGrid.push(row)
      //     }
      //   })
      //   newState.grid = newGrid
      //   newState.changed = true;
      //   return newState
      // }

      const newGrid = immutableState
        .get('grid')
        .filter((row, i) => i !== action.rowIdx ? true : false)

      return immutableState
              .set('grid', newGrid)
              .set('changed', true)
              .toJS()

    case RESIZE_TABLE_COL:
      // {
      //   let newState=_.cloneDeep(state);
      //   // newState.columnHeaders[(action.size.id)-100].width=action.size.rect.width;
      //
      //   newState.columnHeaders.forEach(ch => {
      //     if (ch.id === action.size.id) ch.width=action.size.rect.width;
      //   })
      //
      //   newState.grid.forEach(row => {
      //     row[action.size.id].width=action.size.rect.width;
      //   })
      //   newState.changed = true;
      //   return newState;
      // }

      return immutableState
              .update('columnHeaders', headers => headers.map(ch => {
                if(ch.get('id') === action.size.id) return ch.set('width', action.size.rect.width)
                else return ch;
              }))
              .update('grid', grid => grid.map(row => {
                row.setIn([action.size.id, 'width'], action.size.rect.width)
              }))
              .set('changed', true)
              .toJS()

    case SHOW_MAP:
      const newAddressData = immutableState
                          .get('grid')
                          .reduce((accum, row) =>  {
                            if (row.get(action.colId)) {
                              return accum.push(Map({data: row.getIn([action.colId, 'data']), name:row.getIn(['100','data'])}))
                            }
                          }, List());

      const newMapColumn = immutableState
                              .get('columnHeaders')
                              .filter(col => col.get('id') === action.colId ? true : false)
                              .get(['0', 'name'])

      return immutableState
                .set('showMap', true)
                .set('mapMarkersData', null)
                .set('addressData', newAddressData)
                .set('mapColumn', newMapColumn)
                .toJS()
    case SEND_LAT_LONGS:
        return immutableState.set('mapMarkersData', action.geoResults).toJS();
    case HIDE_MAP:
        return immutableState.set('showMap', false).toJS()
    default:
      return immutableState.toJS();
  }
}
