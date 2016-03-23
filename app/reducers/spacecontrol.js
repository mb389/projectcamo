import {
  LOAD_SPACE,
  LOAD_SHEET,
  ADD_SHEET_VIEW,
  CHANGE_SPACE_NAME,
  CHANGE_SHEET_NAME,
  SHOW_SHARE_MODAL,
  CLOSE_SHARE_MODAL,
  SEARCHING
} from 'constants/index';


export default function spaceControl(state = { showShareModal: false }, action = {}) {

  switch (action.type) {
    case LOAD_SPACE:
      return Object.assign({}, state, {
        space: action.space,
        sheetToShow: action.sheetToShow,
        sheetNames: action.sheetNames
      });
    case LOAD_SHEET:
      return Object.assign({}, state, { sheetToShow: action.sheetToShow });
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
