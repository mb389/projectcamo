import _ from 'lodash';
import { 
  UPDATE_CELL,
  SHOW_ROW_MODAL,
  CLOSE_ROW_MODAL,
  ADD_ROW,
  ADD_COLUMN,
  UPDATE_COLUMN,
  SORT_COLUMN,
  UPDATE_MODAL_CELL,
} from 'constants/index';

import initialState from './sheetState';

export default function sheet(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CELL:
      let newState =  _.cloneDeep(state);
      newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
      return newState
    case UPDATE_MODAL_CELL:
      let modalRowState =  _.cloneDeep(state);
      let cell = newState.grid[action.cell.idx][action.cell.key].data
      if (typeof cell === 'array') cell.push(action.cell.data)
        else cell = action.cell.data
      return modalRowState
    case SHOW_ROW_MODAL:
      let modalState = _.cloneDeep(state)
      modalState.showRowModal = true;
      modalState.modalRow = { 
          data: state.grid[action.rowIdx],
          rowIdx: action.rowIdx
        }
      return modalState
    case CLOSE_ROW_MODAL:
      let modalCloseState = _.cloneDeep(state)
      modalCloseState.showRowModal = false;
      modalCloseState.grid[modalCloseState.modalRow.rowIdx] = modalCloseState.modalRow.data
      modalCloseState.modalRow.data = null;
      modalCloseState.modalRow.rowIdx = null;
      return modalCloseState
    case ADD_COLUMN:
      let addColumnState =  _.cloneDeep(state);
      let newColumn = {
        id: (1+addColumnState.columnHeaders[addColumnState.columnHeaders.length-1].id).toString(),
        // How are we making ids?
        type: 'Text',
        name: 'Column ' + (1+addColumnState.columnHeaders.length),
        idx: addColumnState.columnHeaders.length,
      } 

      addColumnState.columnHeaders.push(newColumn);

      addColumnState.grid.forEach(row => {
          row[newColumn.id] = {
            type: newColumn.type,
            data: null,
          }
        });

      return addColumnState;
    case UPDATE_COLUMN:
      let updateColumnState =  _.cloneDeep(state);
      updateColumnState.columnHeaders = updateColumnState.columnHeaders.map(column=>{
        if (column.id===action.data.id) {return action.data}
        else return column;
      })
      updateColumnState.grid.forEach(row=>{
        row[action.data.id].type = action.data.type;
      })
      return updateColumnState;
    case SORT_COLUMN:
      let sortColumnState = _.cloneDeep(state);
      let colId = action.sortBy.colId;
      let sortFn = function(a,b){
          if (a[colId].data > b[colId].data) return (1*action.sortBy.order);
          else if (b[colId].data > a[colId].data) return (-1*action.sortBy.order);
          else return 0;
      };
      sortColumnState.grid = sortColumnState.grid.sort(sortFn);
      console.log(sortColumnState.grid[0]);
      return sortColumnState;
    case ADD_ROW:
      let addRowState = _.cloneDeep(state);
      let newRow = {}
      addRowState.columnHeaders.forEach(function (col) {
        newRow[col.id] = { data: null, type: col.type }
      })
      addRowState.grid.push(newRow)
      return addRowState
    default:
      return state;
  }
}