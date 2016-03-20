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
      let newState = Object.assign({}, state, {});
      newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
      return newState
    case SHOW_ROW_MODAL:
      return Object.assign({}, state, {
        showRowModal: true,
        modalRow: state.grid[action.rowIdx]
      });
    case CLOSE_ROW_MODAL:
      return Object.assign({}, state, {
        showRowModal: false,
        modalRow: null
      });
    case ADD_ROW:
      let addRowState = Object.assign({}, state, {});
      let lastRow = addRowState.grid[addRowState.grid.length - 1]
      for (let key in lastRow) {
        lastRow[key].data = null
      }
      addRowState.grid.push(lastRow)
      return addRowState
    default:
      return state;
  }
}