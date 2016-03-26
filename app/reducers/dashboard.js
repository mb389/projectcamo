import _ from 'lodash';

import {
  LOAD_USER_SPACES,
  ADD_USER_SPACE
} from 'constants/index';

export default function dashboard(state = {}, action = {}) {
  switch (action.type) {
    case LOAD_USER_SPACES:
      return Object.assign({}, state, {
        spaces: action.spaces,
        collabSpaces: action.collabSpaces
      });
    case ADD_USER_SPACE:
      let newSpaces = state.spaces.concat({_id:action.id, name:action.name})
      return { ...state, spaces: newSpaces }
    default:
      return state;
  }
}
