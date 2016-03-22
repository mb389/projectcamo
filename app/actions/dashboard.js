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
