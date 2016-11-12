/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from '../constants/index';

polyfill();

function updateSheetsArray(sheetId, sheetContent, dbSheet) {
  return {
    type: types.UPDATE_SHEETS,
    sheetId,
    sheetContent,
    dbSheet
  };
}

function toggleChanged() {
  return {
    type: types.TOGGLE_CHANGED
  };
}

export function searching(bool = true) {
  return {
    type: types.SEARCHING,
    bool
  };
}

export function loadSheet(obj) {
  return {
    type: types.LOAD_SHEET,
    sheetToShow: obj.sheetToShow
  };
}

export function saveOtherSheets(sheets, currSheet) {
  let didWeSave;
  sheets.forEach((sheet) => {
    if (sheet._id !== currSheet._id && sheet.changed) {
      request.put(`/sheet/${sheet._id}`, { sheet: sheet.content });
      didWeSave = true;
    }
  });
  const type = didWeSave ? types.ALL_CHANGED_FALSE : 'none';
  return {
    type
  };
}

// Quick Save Only
export function saveSheet(sheetId, sheetData) {
  return (dispatch) => {
    dispatch(updateSheetsArray(sheetId, sheetData));
    dispatch(toggleChanged());
    request.put(`/sheet/${sheetId}`, { sheet: sheetData });
  };
}

export function saveAllSheets(sheets, currSheet, sheetData) {
  return (dispatch) => {
    dispatch(saveSheet(currSheet._id, sheetData));
    dispatch(saveOtherSheets(sheets, currSheet));
  };
}

export function updateSheet(history) {
  return {
    type: types.UPDATE_HISTORY,
    history
  };
}

function fetchUpdatesFromOtherSheets(sheets, sheetToShow) {
  function updateCellData(cell) {
    cell.data.map((item) => {
      const refSheet = sheets.filter(sheet => sheet._id === item.sheet);
      if (refSheet.length) {
        refSheet[0].content.grid.forEach((orow) => {
          for (const key in orow) {
            if (orow[key].id === item.rowId.id) {
              item.data = orow[key].data;
            }
          }
        });
      }
      return item;
    });
  }

  function findRefs(grid) {
    grid.forEach((row) => {
      for (const key in row) {
        if (row[key].type === 'Reference' && row[key].data && row[key].data.length) {
          updateCellData(row[key]);
        }
      }
    });
  }

  const refCols = sheetToShow.content.columnHeaders.filter(col => col.type === 'Reference');
  if (refCols.length) {
    findRefs(sheetToShow.content.grid);
  }
}

export function changeSheet(obj) {
  if (obj.sheets) {
    fetchUpdatesFromOtherSheets(obj.sheets, obj.sheetToShow);
  }
  return {
    type: types.CHANGE_SHEET,
    sheet: obj.sheetToShow.content,
    history: obj.sheetToShow.history
  };
}

function findInSheets(sheetId, sheets, deleting = false) {
  for (let i = 0; i < sheets.length; i++) {
    if (sheets[i]._id === sheetId && !deleting) {
      return sheets[i];
    }
  }
  if (deleting) {
    return sheets.filter(sheet => sheet._id !== sheetId)[0];
  }
}

export function getSheet(sheetId, sheets, deleting = false) {
  const nextSheet = findInSheets(sheetId, sheets, deleting);
  return (dispatch) => {
      // CHANGE TAB NAME
    dispatch(loadSheet({
      sheetToShow: nextSheet
    }));
      // CHANGE HITS SHEETS REDUCER
    dispatch(changeSheet({
      sheetToShow: nextSheet,
      sheets
    }));
      // READJUST COLUMN WIDTHS
    dispatch(searching(false));
  };
}

export function updateRefSheet(targetSheet, data, currSheet, currRow) {
  return {
    type: types.UPDATE_REF_SHEET,
    targetSheet,
    data,
    currSheet,
    currRow
  };
}

export function removeRef(targetSheet, data, currSheet, currRow) {
  return {
    type: types.REMOVE_REF,
    targetSheet,
    data,
    currSheet,
    currRow
  };
}

// Act as the commit save only
export function commit(sheetId, sheet) {
  return (dispatch) => {
    request.put(`/sheet/${sheetId}`, { sheet, commit })
    .then(res => dispatch(updateSheet(res.data.history)))
    .then(() => dispatch(updateSheetsArray(sheetId, sheet)));
  };
}

export function loadSpace(obj) {
  return {
    type: types.LOAD_SPACE,
    space: obj.space,
    sheetToShow: obj.sheetToShow,
    sheetNames: obj.sheetNames,
    sheets: obj.sheets,
    email: obj.email
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
        sheets: res.sheets,
        email: res.email
      }));
      return res;
    }).then(res => dispatch(changeSheet({
      sheetToShow: res.sheet,
      sheets: res.sheets
    })))
    .catch(err => err);
  };
}

export function addColumn() {
  return {
    type: types.ADD_COLUMN
  };
}

export function removeColumn() {
  return {
    type: types.REMOVE_COLUMN,
  };
}

export function addSheetToView(obj) {
  return {
    type: types.ADD_SHEET_VIEW,
    newSheetId: obj.newSheetId,
    sheetName: obj.sheetName
  };
}

export function addSheet(spaceId, sheet) {
  return (dispatch) => {
    request.post(`/sheet/${spaceId}`, sheet)
    .then(res => res.data)
    .then((res) => {
      dispatch(addSheetToView({
        newSheetId: res._id,
        sheetName: res.name
      }));
      return res;
    })
    .then(addedSheet => dispatch(updateSheetsArray(addedSheet._id, addedSheet.content, addedSheet)))
    .catch(err => err);
  };
}

function updateSheetName(name, sheetId) {
  return {
    type: types.CHANGE_SHEET_NAME,
    name,
    sheetId
  };
}

export function changeSheetName(sheetId, newName) {
  return (dispatch) => {
    request.put(`/sheet/${sheetId}/name`, { name: newName })
    .then(() => dispatch(updateSheetName(newName, sheetId)))
    .catch(err => err);
  };
}

export function showShareModal() {
  return {
    type: types.SHOW_SHARE_MODAL
  };
}

export function closeShareModal() {
  return {
    type: types.CLOSE_SHARE_MODAL
  };
}

export function deleteSheetForReducer(sheetId) {
  return {
    type: types.DELETE_SHEET,
    sheetId
  };
}

export function deleteSheet(sheetId, sheets, spaceId) {
  return (dispatch) => {
    // delete sheet from the database
    request.delete(`/sheet/${sheetId}`)
    // delete the sheet from sheetNames and sheets array
    .then(() => dispatch(deleteSheetForReducer(sheetId)))
    // add a sheet if it was the only one or get the new sheet to show
    .then(() => sheets.length === 1 ? dispatch(addSheet(spaceId)) : dispatch(getSheet(sheetId, sheets, true)))
    // addSheet needs to also load the new sheet
    .catch(err => err);
  };
}
