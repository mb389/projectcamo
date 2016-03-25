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

export function updateSheet(history) {
  return {
    type: types.UPDATE_HISTORY,
    history: history
  }
}

export function saveSheet(sheetId, sheet){
  return (dispatch) => {
    request.put(`/sheet/${sheetId}`, sheet)
    .then(res => dispatch(updateSheet(res.data.history)))
  }
}

export function loadSpace(obj) {
  return {
    type: types.LOAD_SPACE,
    space: obj.space,
    sheetToShow: obj.sheetToShow,
    sheetNames: obj.sheetNames,
    sheets: obj.sheets
  };
}

export function changeSheet(obj) {
  if (obj.sheets) {
    let refCols = obj.sheetToShow.content.columnHeaders.filter((col)=> col.type === 'Reference')
    if (refCols.length) {
      obj.sheetToShow.content.grid.forEach((row)=>{
        for (let key in row) {
          if (row[key].type === 'Reference' && row[key].data && row[key].data.length){
            // look up reference to table 
            // dispatch action to update each cell? or batch?
            row[key].data.map((item)=>{
              let refSheet = obj.sheets.filter((sheet)=> sheet._id === item.sheet)
              if (refSheet.length){
                refSheet[0].content.grid.forEach((orow) => {
                  for (let key in orow) {
                    if (orow[key].id === item.rowId.id) { item.data = orow[key].data };
                  }
                })
              }
              return item
            })
          }
        }
      })
    } 
  }
  return {
    type: types.CHANGE_SHEET,
    sheet: obj.sheetToShow.content,
    history: obj.sheetToShow.history
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
        sheetNames: res.sheetNames,
        sheets: res.sheets
      }))
      return res
    }).then(res => dispatch(changeSheet({
        sheetToShow: res.sheet,
        sheets: res.sheets
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

export function addSheet(spaceId, sheet) {
  return (dispatch) => {
    request.post(`/sheet/${spaceId}`, sheet)
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
    request.put(`/sheet/${sheetId}/name`, { name: newName })
    .then(() => dispatch(updateSheetName(newName, sheetId)))
  }
}

export function showShareModal(){
	return {
		 type: types.SHOW_SHARE_MODAL
	}
}

export function closeShareModal() {
	return {
		type: types.CLOSE_SHARE_MODAL
	}
}

export function searching(bool=true) {
  return {
    type: types.SEARCHING,
    bool
  }
}
