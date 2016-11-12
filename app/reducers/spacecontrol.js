import {
  LOAD_SPACE,
  LOAD_SHEET,
  ADD_SHEET_VIEW,
  CHANGE_SPACE_NAME,
  CHANGE_SHEET_NAME,
  SHOW_SHARE_MODAL,
  CLOSE_SHARE_MODAL,
  SEARCHING,
  UPDATE_SHEETS,
  UPDATE_REF_SHEET,
  REMOVE_REF,
  ADD_USER_COLLAB,
  ALL_CHANGED_FALSE,
  DELETE_SHEET
} from '../constants';
import { insertNewColInRowsNonIm, newColInfoNonIm } from './sheetHelpers';


export default function spaceControl(state = { }, action = {}) {
  function removeRef(cell, ref) {
    for (let i = 0; i < cell.data.length; i++) {
      if (cell.data[i].data === ref) {
        cell.data.splice(i, 1);
        break;
      }
    }
  }
  switch (action.type) {
    case ADD_USER_COLLAB: {
      const newCollabSpace = _.cloneDeep(state);
      newCollabSpace.space.collabs.push(action.email);
      return newCollabSpace;
    }
    case LOAD_SPACE:
      {
        const newState = _.cloneDeep(state);
        newState.showShareModal = false;
        newState.space = action.space;
        newState.space.email = action.email;
        newState.sheetToShow = action.sheetToShow;
        newState.sheetNames = action.sheetNames;
        newState.sheets = action.sheets;
        return newState;
      }
    case LOAD_SHEET:
      {
        const newState = _.cloneDeep(state);
        newState.sheetToShow = action.sheetToShow;
        return newState;
      }
    case ALL_CHANGED_FALSE:
      {
        const newState = _.cloneDeep(state);
        newState.sheets.forEach((sheet) => { sheet.changed = false; });
        return newState;
      }
    case UPDATE_SHEETS:
      {
        const newState = _.cloneDeep(state);
        let found = false;
        newState.sheets.forEach((sheet, i) => {
          if (sheet._id === action.sheetId) {
            newState.sheets[i].content = action.sheetContent;
            found = true;
          }
        });
        if (!found && action.dbSheet) {
          newState.sheets.push(action.dbSheet);
        }
        return newState;
      }
    case UPDATE_REF_SHEET:
      {
        const newState = _.cloneDeep(state);
        // find matching sheet and add reference to it
        newState.sheets.filter((sheet) => sheet._id === action.targetSheet._id)
        .forEach((sheet) => {
          const columnHeaders = sheet.content.columnHeaders;
          let existingCol;
          const newRefLabel = {
            data: action.currRow['100'].data,
            rowId: action.currRow['100'],
            sheet: action.currSheet._id
          };
          // check for an existing column reference
          for (let i = 0; i < columnHeaders.length; i++) {
            if (columnHeaders[i].linkedSheet == action.currSheet._id) {
              existingCol = columnHeaders[i];
              break;
            }
          }
          if (existingCol) {
            sheet.content.grid.forEach((row) => {
              if (row['100'].data === action.data.data) {
                row[existingCol.id].data ? row[existingCol.id].data.push(newRefLabel) : row[existingCol.id].data = [newRefLabel];
              }
            });
          } else {
            const newColumn = newColInfoNonIm(sheet.content.columnHeaders);
            newColumn.name = action.currSheet.name;
            newColumn.linkedSheet = action.currSheet._id;
            newColumn.type = 'Reference';
            sheet.content.columnHeaders.push(newColumn);
            sheet.content = insertNewColInRowsNonIm(sheet.content, newColumn);
            // search and add
            for (let i = 0; i < sheet.content.grid.length; i++) {
              if (sheet.content.grid[i]['100'].data === action.data.data) {
                sheet.content.grid[i][newColumn.id].data = [newRefLabel];
                break;
              }
            }
          }
          sheet.changed = true;
        });
        return newState;
      }
    case REMOVE_REF:
      {
        const newState = _.cloneDeep(state);
       // refactor to helper formula
        newState.sheets.filter((sheet) => sheet._id === action.targetSheet._id)
        .forEach((sheet) => {
          const columnHeaders = sheet.content.columnHeaders;
          let existingCol;
          // const newRefLabel = {
          //   data: action.currRow['100'].data,
          //   rowId: action.currRow['100'],
          //   sheet: action.currSheet._id
          // };
          // find existing column reference
          for (let i = 0; i < columnHeaders.length; i++) {
            if (columnHeaders[i].linkedSheet == action.currSheet._id) {
              existingCol = columnHeaders[i];
              break;
            }
          }
          for (let i = 0; i < sheet.content.grid.length; i++) {
            if (sheet.content.grid[i]['100'].data === action.data.data) {
              removeRef(sheet.content.grid[i][existingCol.id], action.currRow['100'].data);
              break;
            }
          }
          sheet.changed = true;
        });
        return newState;
      }
    case SHOW_SHARE_MODAL:
      {
        const newState = _.cloneDeep(state);
        newState.showShareModal = true;
        return newState;
      }
    case CLOSE_SHARE_MODAL:
      {
        const newState = _.cloneDeep(state);
        newState.showShareModal = false;
        return newState;
      }
    case ADD_SHEET_VIEW:
      {
        const sheetNamesToShow = state.sheetNames.concat({
          name: action.sheetName,
          id: action.newSheetId
        });
        const newState = _.cloneDeep(state);
        newState.newSheetId = action.newSheetId;
        newState.sheetNames = sheetNamesToShow;
        return newState;
      }
    case CHANGE_SPACE_NAME:
      {
        const newState = _.cloneDeep(state);
        newState.space.name = action.name;
        return newState;
      }
    case CHANGE_SHEET_NAME:
      {
        const newState = _.cloneDeep(state);
        newState.sheetToShow.name = action.name;
        const sheetNames = state.sheetNames.map(
        sheetInSpace => sheetInSpace.id === action.sheetId ? {
          name: action.name, id: sheetInSpace.id
        } : sheetInSpace
      );
        newState.sheetNames = sheetNames;
        return newState;
      }
    case SEARCHING:
      { const newState = _.cloneDeep(state);
        newState.searching = action.bool;
        return newState;
      }
    case DELETE_SHEET:
      {
        const newState = _.cloneDeep(state);
        newState.sheets = newState.sheets.filter(sheet => sheet._id !== action.sheetId);
        newState.sheetNames = newState.sheetNames.filter(sheet => sheet.id !== action.sheetId);
        return newState;
      }
    default:
      return state;
  }
}
