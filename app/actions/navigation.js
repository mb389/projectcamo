/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */



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
  }
}

export function changeSpaceName(space) {
  return (dispatch) => {
    request.put(`/workspace/${space._id}`, { name: space.name })
    .then(res => res.data)
    .then(() => dispatch(updateSpaceName(space.name)))
  }
}
