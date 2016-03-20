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
  };
}

export function getSheet(spaceId, sheetName) {
  return (dispatch) => {
    request(`/sheet/${spaceId}/${sheetName}`)
    .then(res => res.data)
    .then(res => dispatch(loadSheet({
      sheetToShow: res
    })));
  };
}

export function addSheetToView(obj) {
  return {
    type: types.ADD_SHEET_VIEW,
    newSheetId: obj.newSheetId,
    sheetName: obj.sheetName
  }
}

export function addSheet(spaceId) {
  return (dispatch) => {
    request.post(`/sheet/${spaceId}`)
    .then(res => res.data)
    .then(res => dispatch(addSheetToView({
      newSheetId: res._id,
      sheetName: res.name

    })))
  }
}

// export function makeActiveSheet(sheet) {
//   return {
//     type: types.MAKE_ACTIVE_SHEET,
//     activeSheet: sheet.name
//   }
// }
