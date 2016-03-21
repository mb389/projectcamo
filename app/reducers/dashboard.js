import _ from 'lodash';

import {LOAD_USER_SPACES} from 'constants/index';

export default function dashboard(state = {}, action = {}) {
  switch (action.type) {
    case LOAD_USER_SPACES:
      return Object.assign({}, state, {
        spaces: action.spaces
      });
    default:
      return state;
  }
}
