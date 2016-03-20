import { 
  UPDATE_CELL,
  SHOW_ROW_MODAL,
  CLOSE_ROW_MODAL,
  ADD_ROW
} from 'constants/index';

import initialState from './sheetState'

export default function sheet(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CELL:
      let newState = Object.assign({}, state);
      newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
      return newState
    case SHOW_ROW_MODAL:
      return Object.assign({}, state, {
        showRowModal: true,
        modalRow: { 
          data: state.grid[action.rowIdx],
          rowIdx: action.rowIdx
        }
      });
    case CLOSE_ROW_MODAL:
      return Object.assign({}, state, {
        showRowModal: false,
        modalRow: {data:null, rowIdx:null}
      });
    case ADD_ROW:
      let addRowState = Object.assign({}, state, {});
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