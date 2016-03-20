import {
  LOAD_SPACE,
  LOAD_SHEET,
  ADD_SHEET_VIEW,
  CHANGE_SPACE_NAME
} from 'constants/index';

import initialState from './sheetState';

export default function sheet(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SPACE:
      return Object.assign({}, state, {
        space: action.space,
        sheetToShow: action.sheetToShow,
        sheetNames: action.sheetNames
      });
    case LOAD_SHEET:
      return Object.assign({}, state, { sheetToShow: action.sheetToShow });
    case ADD_SHEET_VIEW:
      const sheetNames = state.sheetNames.concat(action.sheetName);
      return Object.assign({}, state, {
        newSheetId: action.newSheetId, sheetNames
      });
    case CHANGE_SPACE_NAME:
      const space = state.space;
      space.name = action.name;
      return Object.assign({}, state, { space })
    default:
      return state;
  }
}
