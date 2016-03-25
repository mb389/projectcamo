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
  UPDATE_REF_SHEET
} from 'constants/index';
import { insertNewColInRows } from './sheetHelpers.js';


export default function spaceControl(state = { showShareModal: false }, action = {}) {

  switch (action.type) {
    case LOAD_SPACE:
      return Object.assign({}, state, {
        space: action.space || state.space,
        sheetToShow: action.sheetToShow || state.sheetToShow,
        sheetNames: action.sheetNames || state.sheetNames,
        sheets: action.sheets || state.sheets
      });
    case LOAD_SHEET:
      return Object.assign({}, state, { sheetToShow: action.sheetToShow });
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
        !found ? newState.sheets.push(action.dbSheet) : null;
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
          for (var i = 0; i < columnHeaders.length; i++){
            if (columnHeaders[i].name == action.currSheet.name) {
              existingCol = columnHeaders[i]
              break;
            }
          }
          if (existingCol) {
            console.log(sheet)
            let newRefLabel = {
                    data: action.currRow["100"].data,
                    id: action.currRow["100"].id,
                    type: "ID"
                  }
            sheet.content.grid.forEach((row)=>{
              if (row['100'].data === action.data.data) {
                row[existingCol.id].data ? row[existingCol.id].data.push(newRefLabel) : row[existingCol.id].data = [newRefLabel]
              }
            })
          } else {
            let newColumn = {
              id: "" + (100 + sheet.content.columnHeaders.length),
              idx: sheet.content.columnHeaders.length,
              name: action.currSheet.name,
              type: "Reference"
            }
            sheet.content.columnHeaders.push(newColumn)
            sheet.content = insertNewColInRows(sheet.content,newColumn)
            sheet.content.grid.forEach((row)=>{
              if (row['100'].data === action.data.data) {
                row[newColumn.id].data = [{
                  data: action.currRow["100"].data,
                  id: action.currRow["100"].id,
                  type: "ID"
                }]
              }
            })
          }
        })
        return newState
      }
    case SHOW_SHARE_MODAL:
      {
          return Object.assign({},state,{ showShareModal: true});
      }
      case CLOSE_SHARE_MODAL:
        {
          return Object.assign({},state,{ showShareModal: false});
        }
    case ADD_SHEET_VIEW:
      const sheetNamesToShow = state.sheetNames.concat({
        name: action.sheetName,
        id: action.newSheetId
      });
      return Object.assign({}, state, {
        newSheetId: action.newSheetId, sheetNames: sheetNamesToShow
      });
    case CHANGE_SPACE_NAME:
      const space = Object.assign({}, state.space);
      space.name = action.name;
      return Object.assign({}, state, { space })
    case CHANGE_SHEET_NAME:
      const sheetToShow = Object.assign({}, state.sheetToShow);
      sheetToShow.name = action.name
      const sheetNames = state.sheetNames.map(
        sheetInSpace => sheetInSpace.id === action.sheetId ? {
          name: action.name, id: sheetInSpace.id
        } : sheetInSpace
      )
      return Object.assign({}, state, { sheetNames, sheetToShow });
    case SEARCHING:
      return { ...state, searching:action.bool };
    default:
      return state;
  }
}
