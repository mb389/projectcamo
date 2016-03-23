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

export function saveSheet(sheetId, sheet){
  console.log("savingSheet")
  return (dispatch) => {
    request.put(`/sheet/${sheetId}`, sheet)
    .then(res => console.log(res))
  }
}

export function loadSpace(obj) {
  return {
    type: types.LOAD_SPACE,
    space: obj.space,
    sheetToShow: obj.sheetToShow,
    sheetNames: obj.sheetNames
  };
}

export function changeSheet(obj) {
  return {
    type: types.CHANGE_SHEET,
    sheet: obj.sheetToShow.content
  };
}

export function getSpace(spaceId) {
  return (dispatch) => {
    request(`/workspace/${spaceId}`)
    .then(res => res.data)
    .then((res) => {
      dispatch(loadSpace({
        space: res.space,
        sheetToShow: res.sheet,
        sheetNames: res.sheetNames
      }))
      return res
    }).then(res => dispatch(changeSheet({
        sheetToShow: res.sheet
      })));
  };
}

export function loadSheet(obj) {
  return {
    type: types.LOAD_SHEET,
    sheetToShow: obj.sheetToShow
  };
}

export function getSheet(sheetId) {
  return (dispatch) => {
    request(`/sheet/${sheetId}`)
    .then((res) => {
      dispatch(loadSheet({
        sheetToShow: res.data
      }))
      console.log(res.data)
      return res.data
    }).then(res => dispatch(changeSheet({
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

function updateSheetName(name, sheetId) {
  return {
    type: types.CHANGE_SHEET_NAME,
    name,
    sheetId
  }
}

export function changeSheetName(sheetId, newName) {
  return (dispatch) => {
    request.put(`/sheet/${sheetId}`, { name: newName })
    .then(() => dispatch(updateSheetName(newName, sheetId)))
  }
}
