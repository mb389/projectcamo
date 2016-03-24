import _ from 'lodash';

import * as types from 'constants/index';

export default function dashboard(state = {}, action = {}) {
  switch (action.type) {
    case types.LOAD_USER_SPACES:
      return Object.assign({}, state, {
        spaces: action.spaces
      });
    default:
      return state;
  }
}
