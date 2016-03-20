import {
  LOAD_SPACE,
  ADD_SHEET,
  LOAD_SHEET
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
    case ADD_SHEET:
      return state;
    default:
      return state;
  }
}
