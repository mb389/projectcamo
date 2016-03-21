import _ from 'lodash';
import {
  UPDATE_CELL,
  SHOW_ROW_MODAL,
  CLOSE_ROW_MODAL,
  ADD_ROW,
  ADD_COLUMN,
  UPDATE_COLUMN,
  SORT_COLUMN,
  REMOVE_COLUMN,
  INSERT_COLUMN,
  FORMULA_COLUMN,
  UPDATE_MODAL_CELL,
} from 'constants/index';

import initialState from './sheetState';

export default function sheet(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CELL:
      {
        let newState = _.cloneDeep(state);
        newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
        return newState
      }
    case UPDATE_MODAL_CELL:
      {
        let modalRowState = _.cloneDeep(state);
        if (Array.isArray(modalRowState.modalRow.data[action.cell.key].data)) { 
          modalRowState.modalRow.data[action.cell.key].data.push(action.cell.data) 
        } else {
          modalRowState.modalRow.data[action.cell.key].data = action.cell.data
        }
        return modalRowState
      }
    case SHOW_ROW_MODAL:
      {
        let modalState = _.cloneDeep(state)
        modalState.showRowModal = true;
        modalState.modalRow = {
          data: state.grid[action.rowIdx],
          rowIdx: action.rowIdx
        }
        return modalState
      }
    case CLOSE_ROW_MODAL:
      {
        let modalCloseState = _.cloneDeep(state)
        modalCloseState.showRowModal = false;
        modalCloseState.grid[modalCloseState.modalRow.rowIdx] = modalCloseState.modalRow.data
        modalCloseState.modalRow.data = null;
        modalCloseState.modalRow.rowIdx = null;
        return modalCloseState
      }
    case ADD_COLUMN:{
      let addColumnState =  _.cloneDeep(state);
      let newColumn = {
        id: (Date.now()+addColumnState.columnHeaders[addColumnState.columnHeaders.length-1].id).toString(),
        type: 'Text',
        name: 'Column ' + (1+addColumnState.columnHeaders.length),
        idx: addColumnState.columnHeaders.length,
      } 

      addColumnState.columnHeaders.push(newColumn);
      addColumnState = insertNewColInRows(addColumnState, newColumn);
      return addColumnState;}
    case UPDATE_COLUMN:
      {
        let updateColumnState = _.cloneDeep(state);
        updateColumnState.columnHeaders = updateColumnState.columnHeaders.map(column => {
          if (column.id === action.data.id) {
            return action.data
          } else return column;
        })
        updateColumnState.grid.forEach(row => {
          row[action.data.id].type = action.data.type;
        })
        return updateColumnState;
      }
    case INSERT_COLUMN:{
      let insertColumnState = _.cloneDeep(state);
      let newColumn = {
        id: (Date.now()+insertColumnState.columnHeaders[insertColumnState.columnHeaders.length-1].id).toString(),
        type: 'Text',
        name: 'Column ' + (1+action.colIdx),
        idx: action.colIdx,
      } 

      insertColumnState.columnHeaders = insertColumnState.columnHeaders.map(column=>{
        if (column.idx >= action.colIdx) {column.idx++}
        return column;
      })

      insertColumnState.columnHeaders.splice(action.colIdx, 0, newColumn);

      insertColumnState = insertNewColInRows(insertColumnState, newColumn);

      return insertColumnState}
    case UPDATE_COLUMN:{
      let updateColumnState =  _.cloneDeep(state);
      updateColumnState.columnHeaders = updateColumnState.columnHeaders.map(column=>{
        if (column.id===action.data.id) {return action.data}
        else return column;
      })
      updateColumnState.grid.forEach(row=>{
        row[action.data.id].type = action.data.type;
      })
      return updateColumnState;}
    case SORT_COLUMN:{
      let sortColumnState = _.cloneDeep(state);
      let colId = action.sortBy.colId;
      let sortFn = function(a,b){
          if (!a[colId].data) return (1);
          else if (!b[colId].data) return (-1);
          else if (a[colId].data > b[colId].data) return (1*action.sortBy.order);
          else if (b[colId].data > a[colId].data) return (-1*action.sortBy.order);
          else return 0;
      };
      sortColumnState.grid = sortColumnState.grid.sort(sortFn);
      return sortColumnState;}
    case REMOVE_COLUMN:{
      let removeColumnState = _.cloneDeep(state);
      let colId = action.colId;
      removeColumnState.columnHeaders = removeColumnState.columnHeaders.filter(col => {
        return colId !== col.id;
      })

      removeColumnState.grid = removeColumnState.grid.map(row=>{
        if (row[colId]) delete row[colId];
        return row;
      })

      return removeColumnState;
    }
    case FORMULA_COLUMN:{
      let formulaColumnState = _.cloneDeep(state);
      formulaColumnState.columnHeaders
      action.colId;
      action.func;
    }
    case ADD_ROW:
      {
        let addRowState = _.cloneDeep(state);
        let newRow = {}
        addRowState.columnHeaders.forEach(function(col) {
          newRow[col.id] = { data: null, type: col.type }
        })
        addRowState.grid.push(newRow)
        return addRowState
      }
    default:
      return state;
  }
}

function insertNewColInRows (state, newColumn){
  state.grid.forEach(row => {
    row[newColumn.id] = {
      type: newColumn.type,
      data: null,
    }
  });
  return state;
}
