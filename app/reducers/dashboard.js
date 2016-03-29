import _ from 'lodash';

import {
  LOAD_USER_SPACES,
  ADD_USER_SPACE,
  LOAD_USER_INFO,
} from 'constants/index';

export default function dashboard(state = {}, action = {}) {
  switch (action.type) {
    case LOAD_USER_INFO: {
      let newState = _.cloneDeep(state);
      newState.user=action.user;
      return newState;
  }
    case LOAD_USER_SPACES: {
      return Object.assign({}, state, {
        spaces: action.spaces,
        collabSpaces: action.collabSpaces,
        sheet: action.sheet
      });
    }
    case ADD_USER_SPACE: {
      let newSpaces = state.spaces.concat({_id:action.id, name:action.name, user: action.email})
      return { ...state, spaces: newSpaces }
    }
    default:
      return state;
  }
}
