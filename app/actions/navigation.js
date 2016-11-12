/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from '../constants/index';

polyfill();

export function loadSpace(obj) {
  return {
    type: types.LOAD_SPACE,
    space: obj.space,
    sheetToShow: obj.sheetToShow,
    sheetNames: obj.sheetNames
  };
}

export function updateSpaceName(name) {
  return {
    type: types.CHANGE_SPACE_NAME,
    name
  };
}

export function changeSpaceName(spaceId, name) {
  return (dispatch) => {
    request.put(`/workspace/${spaceId}`, { name })
    .then(() => dispatch(updateSpaceName(name)))
    .catch(err => err);
  };
}
