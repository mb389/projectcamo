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
function makeTopicRequest(method, id, data, api='/topic') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function addSheet() {
  //make request to server to add a new sheet in the account. Get back the mongoID and then add a new sheet with that ID and link to that sheet
  console.log('addSheet');
}

// Fetch posts logic
export function fetchTopics() {
  return {
    type: types.GET_TOPICS,
    promise: makeTopicRequest('get')
  };
}

export function loadSpace(obj) {
  return {
    type: types.LOAD_SPACE,
    space: obj.space,
    sheetToShow: obj.sheetToShow,
    sheetNames: obj.sheetNames
  };
}

export function getSpace(spaceId) {
  return (dispatch) => {
    request(`/workspace/${spaceId}`)
    .then(res => res.data)
    .then(res => dispatch(loadSpace({
      space: res.space,
      sheetToShow: res.sheet,
      sheetNames: res.sheetNames
    })));
  };
}

export function loadSheet(obj) {
  return {
    type: types.LOAD_SHEET,
    sheetToShow: obj.sheetToShow
  }
}

export function getSheet(spaceId, sheetName) {
  return (dispatch) => {
    request(`/sheet/${spaceId}/${sheetName}`)
    .then(res => res.data)
    .then(res => dispatch(loadSheet({
      sheetToShow: res
    })))
  }
}
