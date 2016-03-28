import _ from 'lodash';
import {
  UPDATE_FORMULA_CELL,
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
  UPDATE_CELL_BY_ID,
  MOVE_TO_CELL,
  SHOW_MAP,
  HIDE_MAP
} from 'constants/index';
import {
  insertNewColInRows,
  runCustomFunc,
  navToNewCell
} from './sheetHelpers.js';

export default function sheet(state = {
  grid: [],
  columnHeaders: [],
  showRowModal: false,
  modalRow: {data:null,rowIdx:null} }, action = {}) {
  switch (action.type) {
    case CLEAR_SHEET:
      return {}
    case CHANGE_SHEET:
      action.sheet.grid.forEach(row => {
        for (let cell in row){
          row[cell].focused = false;
        }
      })
      return {
        columnHeaders: action.sheet.columnHeaders || [{ id: '100', type: 'ID', name: 'Record Name', idx: 0 }],
        grid: action.sheet.grid || [],
        history: action.history || [],
        historySheet: action.historySheet || null,
        modalRow: {
          data: null,
          rowIdx: null
        },
        showRowModal: false,
        showHistoryModal: false
      }
    case UPDATE_CELL:
      {
        let newState = _.cloneDeep(state);
        if(action.fromSuper) newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey].focused = false;
        newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
        newState.currentCell.cell.data = action.cell.data
        // TODO find the dependent function cells and use this already cloned State.
        return newState
      }
    case UPDATE_CELL_BY_ID:
      console.log(action.cell.data)
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
        return newState
      }
    case MOVE_TO_CELL:{
          let newState = _.cloneDeep(state);
          let newCoord = navToNewCell(action.keyCode, newState)
          newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey].focused = false;
          newState.currentCell.cell = state.grid[newCoord.newRowIdx][newCoord.newColId];
          newState.currentCell.rowIdx = newCoord.newRowIdx;
          newState.currentCell.cellKey = newCoord.newColId;
          newState.grid[newCoord.newRowIdx][newCoord.newColId].focused = true;
          return newState}
    case UPDATE_FORMULA_CELL:
      {
        let newState = _.cloneDeep(state);
        let data = runCustomFunc(newState, action.row, action.formula);
        newState.grid[action.cell.idx][action.cell.key].data = data;
        return newState
      }
    case CURRENT_CELL:{
          let newState = _.cloneDeep(state);
          if(newState.currentCell) newState.grid[newState.currentCell.rowIdx][newState.currentCell.cellKey].focused = false;
          newState.currentCell = action.cell;
          if(action.cell) newState.grid[action.cell.rowIdx][action.cell.cellKey].focused = true;
          // find cell and give it focus
          return newState}
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
    case SHOW_LOOKUP_MODAL:
      {
        let newState = _.cloneDeep(state)
        newState.showLookupModal = true;
        newState.lookup = {
          row: action.row,
          cell: action.cell,
          rowIdx: action.rowIdx
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
        modalCloseState.grid[modalCloseState.modalRow.rowIdx] = modalCloseState.modalRow.data
        modalCloseState.modalRow.data = null;
        modalCloseState.modalRow.rowIdx = null;
        return modalCloseState
      }
    case SHOW_HISTORY_MODAL:
      {
        let newState = _.cloneDeep(state)
        newState.showHistoryModal = true;
        return newState
      }
    case SET_HISTORY_TABLE:
      {
        let newState = _.cloneDeep(state);
        newState.historySheet = newState.history[action.index]
        return newState
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
          if(action.data.formula) {
            row[updatingId].data = runCustomFunc(updateColumnState, row, action.data.formula);
            row[updatingId].formula = action.data.formula;
          }
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
    case SEARCH_SHEET:
      let searchState = _.cloneDeep(state);
      // approach to hide the rows that don't meet search criteria
      searchState.filteredRows = searchState.grid.reduce((accum, row, idx) => {
        let toSave;
        for(let cell in row) {
          if (row[cell].data && typeof row[cell].data === 'string') {
            row[cell].data.toLowerCase().indexOf(action.term.toLowerCase()) > -1 ? toSave = true : null;
          }
        }
        if (!toSave) accum.push(idx);
        return accum;
      }, [])
      return searchState;
    case CLEAR_FILTERED_ROWS:
      let clearedFilteredState = _.cloneDeep(state);
      clearedFilteredState.filteredRows = [];
      return clearedFilteredState;
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
          newRow[col.id] = { data: null, type: col.type, id: col.id + Math.floor((Math.random() * (99999999 - 111111) + 111111)) }
        })
        addRowState.grid.push(newRow)
        return addRowState
      }
    case SHOW_MAP:
      let showMapState = _.cloneDeep(state);
      let colId = action.colId
      let addressData = showMapState.grid.reduce((accum, row) => {
        if(row[colId]) accum.push(row[colId].data)
        return accum
      },[])
      showMapState.showMap = true;
      showMapState.addressData = addressData;
      console.log(addressData);
      return showMapState;
    case HIDE_MAP:
        let hideMapState = _.cloneDeep(state);
        hideMapState.showMap = false;
        return hideMapState;
    default:
      return state;
  }
}


function decorationType (cell) {
  switch (cell.type) {
    case 'Images': return '["' + cell.data.join('","') + '"]';
    case 'Formula': case 'Link': case 'Text': return '"' + cell.data + '"';
    default: return cell.data;
  }
}
