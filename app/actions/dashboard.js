/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

function loadSpaces(spaces) {
  return {
    type: types.LOAD_USER_SPACES,
    spaces: spaces
  }
}

export function clearSheet() {
  return {
    type: types.CLEAR_SHEET
  };
}

export function getSpaces() {
  return (dispatch) => {
    request(`/workspace`)
    .then(res => {
      dispatch(loadSpaces(res.data))
    })
    .then(() => dispatch(clearSheet()))
  }
}


export function createSpace(spaceCount) {
  return (dispatch) => {
    request.post('/workspace', { spaceCount })
    .then(res => {
      dispatch(spaceToStore(res.data))
    })
  }
}

export function spaceToStore(space) {
  return {
    type: types.ADD_USER_SPACE,
    id: space._id,
    name: space.name
  }
}
