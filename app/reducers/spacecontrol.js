import {
  LOAD_SPACE,
  ADD_SHEET
} from 'constants/index';

import initialState from './sheetState';

export default function sheet(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SPACE:
      return Object.assign({}, state, { space: action.space, sheet: action.sheet });
    case ADD_SHEET:
      return state;
    default:
      return state;
  }
}
