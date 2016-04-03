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
} from 'constants/index';
import { insertNewColInRows, newColInfo } from './sheetHelpers.js';


export default function spaceControl(state = {  }, action = {}) {

  switch (action.type) {
    case ADD_USER_COLLAB: {
      let newCollabSpace=_.cloneDeep(state);
      newCollabSpace.space.collabs.push(action.email);
      return newCollabSpace;
    }
    case LOAD_SPACE:
      {
        let newState=_.cloneDeep(state)
        newState.showShareModal=false;
        newState.space=action.space;
        newState.space.email=action.email;
        newState.sheetToShow=action.sheetToShow;
        newState.sheetNames=action.sheetNames;
        newState.sheets=action.sheets;
        return newState;
      }
    case LOAD_SHEET:
      {
        let newState=_.cloneDeep(state)
        newState.sheetToShow = action.sheetToShow
        return newState
      }
    case ALL_CHANGED_FALSE:
      {
        let newState = _.cloneDeep(state);
        newState.sheets.forEach(sheet => sheet.changed = false)
        return newState
      }
    case UPDATE_SHEETS:
      {
        let newState = _.cloneDeep(state);
        let found = false;
        newState.sheets.forEach((sheet, i) => {
          if (sheet._id === action.sheetId) {
            newState.sheets[i].content = action.sheetContent;
            found = true;
          }
        })
        !found && action.dbSheet ? newState.sheets.push(action.dbSheet) : null;
        return newState
      }
    case UPDATE_REF_SHEET:
      {
        let newState = _.cloneDeep(state);
        // find matching sheet and add reference to it
        newState.sheets.filter((sheet)=> sheet._id === action.targetSheet._id)
        .forEach((sheet)=>{
          let columnHeaders = sheet.content.columnHeaders;
          let existingCol;
          let newRefLabel = {
                    data: action.currRow["100"].data,
                    rowId: action.currRow["100"],
                    sheet: action.currSheet._id
                  }
          // check for an existing column reference
          for (var i = 0; i < columnHeaders.length; i++){
            if (columnHeaders[i].linkedSheet == action.currSheet._id) {
              existingCol = columnHeaders[i]
              break;
            }
          }
          if (existingCol) {
              sheet.content.grid.forEach((row)=>{
              if (row['100'].data === action.data.data) {
                row[existingCol.id].data ? row[existingCol.id].data.push(newRefLabel) : row[existingCol.id].data = [newRefLabel]
              }
            })
          }
          // if no column ref make a new one
          else {
            let newColumn = newColInfo(sheet.content.columnHeaders)
            newColumn.name = action.currSheet.name
            newColumn.linkedSheet = action.currSheet._id
            newColumn.type = 'Reference'
            sheet.content.columnHeaders.push(newColumn)
            sheet.content = insertNewColInRows(sheet.content,newColumn)
            // search and add
            for (var i = 0; i < sheet.content.grid.length; i++) {
              if (sheet.content.grid[i]['100'].data === action.data.data) {
                sheet.content.grid[i][newColumn.id].data = [newRefLabel]
                break;
              }
            }
          }
          sheet.changed = true;
        })
        return newState
      }
    case REMOVE_REF:
      function removeRef(cell,ref) {
        for (var i = 0; i < cell.data.length; i++) {
          if (cell.data[i].data === ref) {
            cell.data.splice(i,1)
            break;
          }
        }
      }

      {
       let newState = _.cloneDeep(state);
       //refactor to helper formula
       newState.sheets.filter((sheet)=> sheet._id === action.targetSheet._id)
        .forEach((sheet)=>{
          let columnHeaders = sheet.content.columnHeaders;
          let existingCol;
          let newRefLabel = {
                    data: action.currRow["100"].data,
                    rowId: action.currRow["100"],
                    sheet: action.currSheet._id
                  }
          // find existing column reference
          for (var i = 0; i < columnHeaders.length; i++){
            if (columnHeaders[i].linkedSheet == action.currSheet._id) {
              existingCol = columnHeaders[i]
              break;
            }
          }
          for (var i = 0; i < sheet.content.grid.length; i++) {
            if (sheet.content.grid[i]['100'].data === action.data.data) {
              removeRef(sheet.content.grid[i][existingCol.id],action.currRow['100'].data)
              break;
            }
          }
          sheet.changed = true
        })
        return newState
      }
    case SHOW_SHARE_MODAL:
      {
        let newState = _.cloneDeep(state);
        newState.showShareModal = true;
        return newState
        // return Object.assign({},state,{ showShareModal: true});
      }
    case CLOSE_SHARE_MODAL:
      {
        let newState = _.cloneDeep(state);
        newState.showShareModal = false;
        return newState
        // return Object.assign({},state,{ showShareModal: false});
      }
    case ADD_SHEET_VIEW:
      const sheetNamesToShow = state.sheetNames.concat({
        name: action.sheetName,
        id: action.newSheetId
      });
      let newState = _.cloneDeep(state);
      newState.newSheetId = action.newSheetId
      newState.sheetNames = sheetNamesToShow
      return newState
      // return Object.assign({}, state, {
      //   newSheetId: action.newSheetId, sheetNames: sheetNamesToShow
      // });
    case CHANGE_SPACE_NAME:
      {let newState = _.cloneDeep(state);
      newState.space.name = action.name
      return newState
      // const space = Object.assign({}, state.space);
      // space.name = action.name;
      // return Object.assign({}, state, { space })
    }
    case CHANGE_SHEET_NAME:
      {let newState = _.cloneDeep(state);
      newState.sheetToShow.name = action.name
      const sheetNames = state.sheetNames.map(
        sheetInSpace => sheetInSpace.id === action.sheetId ? {
          name: action.name, id: sheetInSpace.id
        } : sheetInSpace
      )
      newState.sheetNames = sheetNames;
      return newState;
      // return Object.assign({}, state, { sheetNames, sheetToShow });
    }
    case SEARCHING:
    {  let newState = _.cloneDeep(state);
      newState.searching = action.bool
      return newState;
      // return { ...state, searching:action.bool };
    }
    case DELETE_SHEET:
    {
      let newState = _.cloneDeep(state);
      newState.sheets = newState.sheets.filter(sheet => sheet._id !== action.sheetId)
      newState.sheetNames = newState.sheetNames.filter(sheet => sheet.id !== action.sheetId)
      return newState
    }
    default:
      return state;
  }
}
