import { 
  UPDATE_CELL,
  SHOW_ROW_MODAL,
  CLOSE_ROW_MODAL,
  ADD_ROW,
  ADD_COLUMN,
  UPDATE_COLUMN,
  SORT_COLUMN,
} from 'constants/index';

import initialState from './sheetState';
import _ from 'lodash';

export default function sheet(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CELL:
      let newState = Object.assign({}, state, {});
      newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
      return newState
    case SHOW_ROW_MODAL:
      return Object.assign({}, state, {
        showRowModal: true,
        modalRow: { 
          data: state.grid[action.rowIdx],
          rowIdx: action.rowIdx
        }
      });
    case CLOSE_ROW_MODAL:
      return Object.assign({}, state, {
        showRowModal: false,
        modalRow: {data:null, rowIdx:null}
      });
    case ADD_COLUMN:
      let addColumnState = Object.assign({}, state, {});
      let newColumn = {
        id: (1+addColumnState.columnHeaders[addColumnState.columnHeaders.length-1].id).toString(),
        // How are we making ids?
        type: 'Text',
        name: 'Column ' + (1+addColumnState.columnHeaders.length),
        idx: addColumnState.columnHeaders.length,
      } 

      addColumnState.columnHeaders.push(newColumn);

      addColumnState.grid.forEach(row => {
          row[newColumn.id] = {
            type: newColumn.type,
            data: null,
          }
        });

      return addColumnState;
    case UPDATE_COLUMN:
      let updateColumnState = Object.assign({}, state, {});
      updateColumnState.columnHeaders = updateColumnState.columnHeaders.map(column=>{
        if (column.id===action.data.id) {return action.data}
        else return column;
      })
      updateColumnState.grid.forEach(row=>{
        row[action.data.id].type = action.data.type;
      })
      return updateColumnState;
    case SORT_COLUMN:
      let sortColumnState = _.cloneDeep(state);
      console.log(action.sortBy, sortColumnState.grid[0]);
      let colId = action.sortBy.colId;
      let sortFn = function(a,b){
          if (a[colId].data > b[colId].data) return (1*action.sortBy.order);
          else if (b[colId].data > a[colId].data) return (-1*action.sortBy.order);
          else return 0;
      };
      sortColumnState.grid = sortColumnState.grid.sort(sortFn);
      console.log(sortColumnState.grid[0]);
      return sortColumnState;
    case ADD_ROW:
      let addRowState = Object.assign({}, state, {});
      let newRow = {}
      addRowState.columnHeaders.forEach(function (col) {
        newRow[col.id] = { data: null, type: col.type }
      })
      addRowState.grid.push(newRow)
      return addRowState
    default:
      return state;
  }
}