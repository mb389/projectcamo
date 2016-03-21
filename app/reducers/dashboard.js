import {
  LOAD_USER_SPACES
} from 'constants/index';

import initialState from './sheetState';

export default function dashboard(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USER_SPACES:
      return Object.assign({}, state, {
        spaces: action.spaces
      });
    default:
      return state;
  }
}
