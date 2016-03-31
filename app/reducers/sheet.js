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
      {
        let newState=_.cloneDeep(state);

        action.sheet.grid.forEach(row => {
          for (let cell in row){
            row[cell].focused = false;
          }
        })
        newState.columnHeaders= action.sheet.columnHeaders || [];
        newState.grid= action.sheet.grid || [];
        newState.history= action.history || [];
        newState.historySheet= action.historySheet || null;
        newState.modalRow= {
          data: null,
          rowIdx: null
        };
        newState.showRowModal= false;
        newState.showHistoryModal= false;
        newState.changed = false;

        return newState;
      }
    case TOGGLE_CHANGED:
      {
        let newState = _.cloneDeep(state)
        newState.changed = false
        return newState
      }
    case UPDATE_CELL:
      {
        let newState = _.cloneDeep(state);
        if(action.fromSuper && newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey]) newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey].focused = false;
        newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
        newState.currentCell.cell.data = action.cell.data;
        if (action.formulaCells)
        {
          action.formulaCells.forEach(cell =>{
            let data = runCustomFunc(newState, newState.grid[action.cell.idx], cell.formula);
            newState.grid[action.cell.idx][cell.col].data = data;
          })
        }
        newState.changed = true
        return newState
      }
    case UPDATE_CELL_BY_ID:
      {
        let newState = _.cloneDeep(state);
        newState.grid.forEach(function(row){
          for (let key in row) {
            if (row[key].id == action.cell.id) {
              row[key].data = action.cell.data;
              break;
            }
          }
        })
        newState.changed = true
        return newState
      }
    case MOVE_TO_CELL:
      {
        let newState = _.cloneDeep(state);
        let newCoord = navToNewCell(action.keyCode, newState)
        newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey].focused = false;
        newState.currentCell.cell = state.grid[newCoord.newRowIdx][newCoord.newColId];
        newState.currentCell.rowIdx = newCoord.newRowIdx;
        newState.currentCell.cellKey = newCoord.newColId;
        newState.grid[newCoord.newRowIdx][newCoord.newColId].focused = true;
        return newState
      }
    case CURRENT_CELL:
      {
        let newState = _.cloneDeep(state);
        if(newState.currentCell) newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey].focused = false;
        newState.currentCell = action.cell;
        if(action.cell) newState.grid[action.cell.rowIdx][action.cell.cellKey].focused = true;
        // find cell and give it focus
        return newState
      }
    case UPDATE_MODAL_CELL:
      {
        let modalRowState = _.cloneDeep(state);
        if (action.push) {
          modalRowState.modalRow.data[action.cell.key].data.push(action.cell.data)
        } else {
          modalRowState.modalRow.data[action.cell.key].data = action.cell.data
        }
        return modalRowState
      }
    case SHOW_LOOKUP_MODAL:
      {
        let newState = _.cloneDeep(state)
        newState.showLookupModal = true;
        newState.lookup = {
          row: action.row,
          cell: action.cell,
          rowIdx: action.rowIdx,
          colId: action.cellKey
        }
        return newState
      }
    case CLOSE_LOOKUP_MODAL:
      {
        let modalCloseState = _.cloneDeep(state)
        modalCloseState.showLookupModal = false;
        return modalCloseState
      }
    case SHOW_ROW_MODAL:
      {
        let newState = _.cloneDeep(state)
        newState.showRowModal = true;
        newState.modalRow = {
          data: state.grid[action.rowIdx],
          rowIdx: action.rowIdx
        }
        return newState
      }
    case CLOSE_ROW_MODAL:
      {
        let modalCloseState = _.cloneDeep(state)
        modalCloseState.showRowModal = false;
        if (!action.dontSave) {
          modalCloseState.grid[modalCloseState.modalRow.rowIdx] = modalCloseState.modalRow.data
        }
        modalCloseState.modalRow.data = null;
        modalCloseState.modalRow.rowIdx = null;
        return modalCloseState
      }
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
        let newState = _.cloneDeep(state);
        newState.history = action.history;
        return newState
      }
    case CLOSE_HISTORY_MODAL:
      {
        let newState = _.cloneDeep(state)
        newState.showHistoryModal = false;
        newState.historySheet = null
        return newState
      }
    case ADD_COLUMN:
      {
        let newState =  _.cloneDeep(state);

        let newColumn = newColInfo(newState.columnHeaders)

        // // TODO need to set this.props.view: 'editNameAndType';
        newState.columnHeaders.push(newColumn);
        newState = insertNewColInRows(newState, newColumn);
        newState.changed = true
        return newState;
      }
    case UPDATE_COLUMN:
      {
        let newState =  _.cloneDeep(state);
        let updatingId = action.data.id;
        newState.columnHeaders = newState.columnHeaders.map(column=>{
          if (column.id===updatingId) {return action.data}
          else return column;
        })

        newState.grid = newState.grid.map(row=>{
          let curRow = row[updatingId];
          curRow.type = action.data.type;
          if(action.data.type==="Checkbox") curRow.data = "off";
          if(action.data.formula) {
            curRow.data = runCustomFunc(newState, row, action.data.formula);
            curRow.formula = action.data.formula;
          }
          if(action.data.selectOptions) {
            curRow.selectOptions = action.data.selectOptions;
          }
          return row;
        })
        newState.changed = true;
        return newState;
      }
    case INSERT_COLUMN:
      {
        let newState = _.cloneDeep(state);

        let newColumn = newColInfo(newState.columnHeaders)
        newColumn.name = 'Column ' + (1+action.colIdx);
        newColumn.idx = action.colIdx;

        newState.columnHeaders = newState.columnHeaders.map(column=>{
          if (column.idx >= action.colIdx) {column.idx++}
          return column;
        })

        // TODO need to set this.props.view: 'editNameAndType';
        newState.columnHeaders.splice(action.colIdx, 0, newColumn);

        newState = insertNewColInRows(newState, newColumn);
        newState.changed = true;
        return newState
      }
    case SORT_COLUMN:
      {
        let newState = _.cloneDeep(state);
        let colId = action.sortBy.colId;
        let sortFn = function(a,b){
            if (!a[colId].data) return (1);
            else if (!b[colId].data) return (-1);
            else if (a[colId].data > b[colId].data) return (1*action.sortBy.order);
            else if (b[colId].data > a[colId].data) return (-1*action.sortBy.order);
            else return 0;
        };
        newState.grid = newState.grid.sort(sortFn);
        newState.changed = true;
        return newState;
      }
    case SEARCH_SHEET:
      {
        let newState = _.cloneDeep(state);
        // approach to hide the rows that don't meet search criteria
        newState.filteredRows = newState.grid.reduce((accum, row, idx) => {
          let toSave;
          for(let cell in row) {
            if (row[cell].data && typeof row[cell].data === 'string') {
              row[cell].data.toLowerCase().indexOf(action.term.toLowerCase()) > -1 ? toSave = true : null;
            }
          }
          if (!toSave) accum.push(idx);
          return accum;
        }, [])
        return newState;
      }
    case CLEAR_FILTERED_ROWS:
      {
        let newState = _.cloneDeep(state);
        newState.filteredRows = [];
        return newState;
      }
    case REMOVE_COLUMN:
      {
        let newState = _.cloneDeep(state);
        let colId = action.colId ? action.colId : newState.columnHeaders[newState.columnHeaders.length-1].id ;
        newState.columnHeaders = newState.columnHeaders.filter(col => {
          return colId !== col.id;
        })

        newState.grid = newState.grid.map(row=>{
          if (row[colId]) delete row[colId];
          return row;
        })
        newState.changed = true;
        return newState;
      }
    case FORMULA_COLUMN:
      {
        let newState = _.cloneDeep(state);

        let newColumn = Object.assign({}, action.colData);
        let colIdIdx = newColInfo(newState.columnHeaders);
        newColumn.id = colIdIdx.id;
        newColumn.name = 'Column ' + colIdIdx.idx;
        newColumn.idx = colIdIdx.idx;

        // action.arrMeth usually = 'map' or 'reduce';
        newState.grid = newState.grid[action.arrMeth]((row) =>{
          let newData = action.func(row[action.colData.id].data);

          // TODO should this corralate to the type of the new cell?
          // if (!newColumn.type) newColumn.type = 'Text';

          row[newColumn.id] = {
            data: newData,
            type: newColumn.type,
            width: newColumn.width,
          }
          return row;
        })

        newState.columnHeaders.push(newColumn);
        newState.changed = true;
        return newState;
      }
    case ADD_ROW:
      {
        let newState = _.cloneDeep(state);
        let newRow = {}
        newState.columnHeaders.forEach(function(col) {
          newRow[col.id] = { width: col.width || 200 ,data: null, type: col.type, id: col.id + Math.floor((Math.random() * (99999999 - 111111) + 111111)) }
          if (col.formula) newRow[col.id].formula = col.formula;
          if (col.selectOptions) newRow[col.id].selectOptions = col.selectOptions;
        })
        newState.grid.push(newRow)
        newState.changed = true;
        return newState
      }
    case DELETE_ROW:
      {
        let newState = _.cloneDeep(state);
        let newGrid = []
        newState.grid.forEach((row,i)=>{
          if (i !== action.rowIdx) {
            newGrid.push(row)
          }
        })
        newState.grid = newGrid
        newState.changed = true;
        return newState
      }
    case RESIZE_TABLE_COL:
      {
        let newState=_.cloneDeep(state);
        // newState.columnHeaders[(action.size.id)-100].width=action.size.rect.width;

        newState.columnHeaders.forEach(ch => {
          if (ch.id === action.size.id) ch.width=action.size.rect.width;
        })

        newState.grid.forEach(row => {
          row[action.size.id].width=action.size.rect.width;
        })
        newState.changed = true;
        return newState;
      }
    case SHOW_MAP:
      {
        let newState = _.cloneDeep(state);
        let colId = action.colId
        let addressData = newState.grid.reduce((accum, row) => {
          if(row[colId]) accum.push({data: row[colId].data, name: row[100].data})
          return accum
        },[])
        newState.showMap = true;
        newState.addressData = addressData;
        newState.mapMarkersData = null;
        newState.mapColumn = newState.columnHeaders.filter(col => col.id === colId ? true : false)[0].name
        return newState;
      }
    case SEND_LAT_LONGS:
      {
        let newState = _.cloneDeep(state);
        newState.mapMarkersData = action.geoResults;
        return newState;
      }
    case HIDE_MAP:
      {
        let newState = _.cloneDeep(state);
        newState.showMap = false;
        return newState;
      }
    default:
      return state;
  }
}
