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
  CHANGE_SHEET,
  CLEAR_SHEET,
  CURRENT_CELL
} from 'constants/index';

import initialState from './sheetState';

export default function sheet(state = {
  grid: [],
  columnHeaders: [],
  showRowModal: false,
  modalRow: {data:null,rowIdx:null} }, action = {}) {
  switch (action.type) {
    case CLEAR_SHEET:
      return {}
    case CHANGE_SHEET:
      return {
        columnHeaders: action.sheet.columnHeaders || [],
        grid: action.sheet.grid || [],
        modalRow: {
          data: null,
          rowIdx: null
        },
        showRowModal: false
      }
    case UPDATE_CELL:
      {
        let newState = _.cloneDeep(state);
        newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
        return newState
      }
    case CURRENT_CELL:
      return Object.assign({}, state, {currentCell : action.cell})
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
        id: (100+addColumnState.columnHeaders.length).toString(),
        name: 'Column ' + (1+addColumnState.columnHeaders.length),
        idx: addColumnState.columnHeaders.length,
      }

      // TODO need to set this.props.view: 'editNameAndType';
      addColumnState.columnHeaders.push(newColumn);
      addColumnState = insertNewColInRows(addColumnState, newColumn);
      return addColumnState;}
    case UPDATE_COLUMN:
      {
        let updateColumnState =  _.cloneDeep(state);
        let updatingId = action.data.id;
        updateColumnState.columnHeaders = updateColumnState.columnHeaders.map(column=>{
          if (column.id===updatingId) {return action.data}
          else return column;
        })

        updateColumnState.grid = updateColumnState.grid.map(row=>{
          row[updatingId].type = action.data.type;
          if(action.data.formula) row[updatingId].data = runCustomFunc(updateColumnState, row, action.data.formula)
          return row;
        })
        return updateColumnState;
      }
    case INSERT_COLUMN:{
      let insertColumnState = _.cloneDeep(state);
      let newColumn = {
        id: (100+insertColumnState.columnHeaders.length).toString(),
        name: 'Column ' + (1+action.colIdx),
        idx: action.colIdx,
      }

      insertColumnState.columnHeaders = insertColumnState.columnHeaders.map(column=>{
        if (column.idx >= action.colIdx) {column.idx++}
        return column;
      })

      // TODO need to set this.props.view: 'editNameAndType';
      insertColumnState.columnHeaders.splice(action.colIdx, 0, newColumn);

      insertColumnState = insertNewColInRows(insertColumnState, newColumn);

      return insertColumnState}
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

      let newColumn = Object.assign({}, action.colData);
      newColumn.id = (100+formulaColumnState.columnHeaders.length).toString();
      newColumn.name = 'Column ' + (1+formulaColumnState.columnHeaders.length);
      newColumn.idx = formulaColumnState.columnHeaders.length;

      // action.arrMeth usually = 'map' or 'reduce';
      formulaColumnState.grid = formulaColumnState.grid[action.arrMeth]((row) =>{
        let newData = action.func(row[action.colData.id].data);

        // TODO should this corralate to the type of the new cell?
        // if (!newColumn.type) newColumn.type = 'Text'; 

        row[newColumn.id] = {
          data: newData,
          type: newColumn.type,
        }
        return row;
      })

      formulaColumnState.columnHeaders.push(newColumn);

      return formulaColumnState;
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

function runCustomFunc (state, row, funcText) {
  let columnDefs = 'let document = undefined, window = undefined, alert = undefined; ';

  state.columnHeaders.forEach((elem, idx) => { 
    // TODO remove the column that we're adding to to prevent errors?
    funcText = funcText.replace(elem.name, 'userCol' + idx);

    let userData = decorationType(row[elem.id]);

    columnDefs += 'let userCol' + idx + ' = ' + userData + '; ';
    });

  return eval(columnDefs+funcText);
}

function decorationType (cell) {
  switch (cell.type) {
    case 'Images': return '["' + cell.data.join('","') + '"]';
    case 'Formula': case 'Link': case 'Text': return '"' + cell.data + '"';
    default: return cell.data;
  }
}

