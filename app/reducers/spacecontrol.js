import {
  LOAD_SPACE,
  LOAD_SHEET,
  ADD_SHEET_VIEW,
  CHANGE_SPACE_NAME,
  CHANGE_SHEET_NAME
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
      const sheetNamesToShow = state.sheetNames.concat(action.sheetName);
      return Object.assign({}, state, {
        newSheetId: action.newSheetId, sheetNames: sheetNamesToShow
      });
    case CHANGE_SPACE_NAME:
      const space = Object.assign({}, state.space);
      space.name = action.name;
      return Object.assign({}, state, { space })
    case CHANGE_SHEET_NAME:
      console.log(action);
      const sheetToShow = Object.assign({}, state.sheetToShow);
      sheetToShow.name = action.name
      const sheetNames = state.sheetNames.map(
        sheetInSpace => sheetInSpace.id === action.sheetId ? {
          name: action.name, id: sheetInSpace.id
        } : sheetInSpace
      )
      return Object.assign({}, state, { sheetNames, sheetToShow });
    default:
      return state;
  }
}
