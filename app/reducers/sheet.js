import _ from 'lodash';
import { 
  UPDATE_CELL,
  SHOW_ROW_MODAL,
  CLOSE_ROW_MODAL,
  ADD_ROW,
  ADD_COLUMN,
  UPDATE_MODAL_CELL
} from 'constants/index';

import initialState from './sheetState'

export default function sheet(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CELL:
      let newState =  _.cloneDeep(state);
      newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
      return newState
    case UPDATE_MODAL_CELL:
      let modalRowState =  _.cloneDeep(state);
      modalRowState.sheet.modalRow = action.modalRow
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
      modalCloseState.modalRow = {data:null, rowIdx:null};
      return modalCloseState
    case ADD_COLUMN:
      let addColumnState = Object.assign({}, state, {});
      let newColumn = {
        id: (1+addColumnState.columnHeaders[addColumnState.columnHeaders.length-1].id).toString(),
        // How are we making ids?
        type: action.column.type,
        name: action.column.name,
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