import _ from 'lodash';
import { Map, List, fromJS, toJS } from 'immutable';
import {
  // set changed to true
  UPDATE_CELL,
  UPDATE_CELL_BY_ID,
  ADD_ROW,
  DELETE_ROW,
  ADD_COLUMN,
  UPDATE_COLUMN,
  SORT_COLUMN,
  REMOVE_COLUMN,
  INSERT_COLUMN,
  FORMULA_COLUMN,
  RESIZE_TABLE_COL,
  // no need to set changed to true
  TOGGLE_CHANGED,
  UPDATE_MODAL_CELL,
  CHANGE_SHEET,
  CLEAR_SHEET,
  SHOW_HISTORY_MODAL,
  CLOSE_HISTORY_MODAL,
  CURRENT_CELL,
  SET_HISTORY_TABLE,
  UPDATE_HISTORY,
  SEARCH_SHEET,
  CLEAR_SEARCH_GRID,
  CLEAR_FILTERED_ROWS,
  SHOW_LOOKUP_MODAL,
  CLOSE_LOOKUP_MODAL,
  SHOW_ROW_MODAL,
  CLOSE_ROW_MODAL,
  MOVE_TO_CELL,
  SHOW_MAP,
  HIDE_MAP,
  DRAG_TABLE_COL,
  SEND_LAT_LONGS
} from 'constants/index';
import {
  insertNewColInRows,
  runCustomFunc,
  navToNewCell,
  newColInfo
} from './sheetHelpers.js';

export default function sheet(state = {
  grid: [],
  columnHeaders: [],
  showRowModal: false,
  modalRow: {data:null,rowIdx:null} }, action = {}) {
    let immutableState = fromJS(state);
  switch (action.type) {
    case CLEAR_SHEET:
      return Map({})
    case CHANGE_SHEET:
      // {
        // let newState=_.cloneDeep(state);

        action.sheet.grid.forEach(row => {
          for (let cell in row){
            row[cell].focused = false;
          }
        })

        const newGridToSet = action.sheet.grid ? fromJS(action.sheet.grid) : List()

        const newGridWFocus = newGridToSet.hasIn(['grid','0','100']) ? newGridToSet.setIn(['0', '100', 'focused'], true) : newGridToSet

        return immutableState
          .set('columnHeaders', action.sheet ? action.sheet.columnHeaders : List())
          .set('grid', newGridWFocus)
          .set('currentCell', Map({
            cell: newGridToSet.getIn(['0', '100']),
            rowIdx: 0,
            cellKey: '100'
          }))
          .set('history', action.history ? action.history : List())
          .set('historySheet', action.historySheet ? action.historySheet : List())
          .set('modalRow', Map({
            data: null,
            rowIdx: null
          }))
          .set('showRowModal', false)
          .set('showHistoryModal', false)
          .set('changed', false)


    case TOGGLE_CHANGED:

      return immutableState.set('changed', false);

    case UPDATE_CELL:

      let stateWithoutCC = immutableState
      if (action.fromSuper && immutableState.get('grid').hasIn([immutableState.getIn(['currentCell', 'rowIdx']), immutableState.getIn(['currentCell', 'cellKey'])])) {
        stateWithoutCC = immutableState.setIn(['grid', immutableState.getIn(['currentCell', 'rowIdx']), immutableState.getIn(['currentCell', 'cellKey']), 'focused'], false)
      }

      return stateWithoutCC
          .setIn(['grid', action.cell.idx, action.cell.key, 'data'], action.cell.data)
          .setIn(['currentCell', 'cell', 'data'], action.cell.data)
          .update('grid', grid => {
            return grid.map((row, rowI) => {
              return row.map((cell, cellI) => {
                if(action.formulaCells && cellI === action.idx) {
                  return runCustomFunc(stateWithoutCC, row, action.formulaCells[cellI])
                } else {
                  return cell
                }
              })
            })
          })




    case UPDATE_CELL_BY_ID:

      return immutableState.update('grid', grid => grid.map(row => {
            return row.map(key => {
              if(key.get('id') === action.cell.id) {
                return key.set('data', action.cell.data)
              } else {
                return key
              }
            })
          })
        )


    case MOVE_TO_CELL:

      let newCoord = navToNewCell(action.keyCode, immutableState);

      return immutableState
              .setIn(['grid', immutableState.getIn(['currentCell','rowIdx']), immutableState.getIn(['currentCell','cellKey']), 'focused'], false)
              .setIn(['currentCell', 'cell'], immutableState.getIn(['grid', newCoord.get('newRowIdx'), newCoord.get('newColId')]))
              .setIn(['currentCell','rowIdx'], newCoord.get('newRowIdx'))
              .setIn(['currentCell','cellKey'], newCoord.get('newColId'))
              .setIn(['grid', newCoord.get('newRowIdx'), newCoord.get('newColId'), 'focused'], true)



    case CURRENT_CELL:

      let CCCurrentCellState = immutableState;
      if(immutableState.has('currentCell')) {
          CCCurrentCellState = immutableState.setIn(['grid',
                  immutableState.getIn(['currentCell', 'rowIdx']),
                  immutableState.getIn(['currentCell', 'cellKey']),
                  'focused'], false)
                  .set('currentCell', action.cell)
      }

      if (action.cell) {
        return CCCurrentCellState.setIn(['grid', action.cell.rowIdx, action.cell.cellKey, 'focused'], true)
      } else {
        return CCCurrentCellState;
      }


    case UPDATE_MODAL_CELL:

      return action.push ? immutableState.updateIn(['modalRow', 'data', action.cell.key, 'data'], data => data.push(action.cell.data))
      : immutableState.setIn(['modalRow', 'data', action.cell.key, 'data'], action.cell.data)


    case SHOW_LOOKUP_MODAL:

      return immutableState
              .set('showLookupModal', true)
              .set('lookup', Map({
                row: action.row,
                cell: action.cell,
                rowIdx: action.rowIdx,
                colId: action.cellKey
              }))


    case CLOSE_LOOKUP_MODAL:

      return immutableState.set('showLookupModal', false)


    case SHOW_ROW_MODAL:


      return immutableState
              .set('showRowModal', true)
              .set('modalRow', Map({
                data: immutableState.getIn(['grid', action.rowIdx]),
                rowIdx: action.rowIdx
              }))
              ;

    case CLOSE_ROW_MODAL:

      let savedGridRow;
      let savedGridRowState = immutableState;
      if(!action.dontSave) {
        savedGridRow = immutableState.get('grid').set(immutableState.getIn(['modalRow', 'rowIdx']),immutableState.getIn(['modalRow', 'data']))
        savedGridRowState = immutableState.set('grid', savedGridRow);
      }
      return savedGridRowState
              .set('showRowModal', false)
              .set('changed', true)
              .setIn(['modalRow', 'data'], null)
              .setIn(['moalRow', 'rowIdx'], null)


    case SHOW_HISTORY_MODAL:
      {
        return immutableState.set('showHistoryModal', true)
      }
    case SET_HISTORY_TABLE:
      {
        return immutableState.set('historySheet', immutableState.getIn(['history', action.index]))  // state.history[action.index])
      }
    case UPDATE_HISTORY:
      {
        return immutableState.set('history', action.history);
      }
    case CLOSE_HISTORY_MODAL:
      {
        return immutableState.set('showHistoryModal', false).set('historySheet', null)
      }
    case ADD_COLUMN:
      let columnToAdd = newColInfo(immutableState.get('columnHeaders'));

      return insertNewColInRows(immutableState
              .update('columnHeaders', ch => ch.push(columnToAdd)),columnToAdd)
              .set('changed',  true)


    case UPDATE_COLUMN:
      return immutableState
              .update('columnHeaders', columnHeaders => columnHeaders.map(column => {
                return column.get('id') === action.data.id ? action.data : column;
              }))
              .update('grid', grid => grid.map(row => {
                let curCell = row
                                .get(action.data.id)
                                .set('type', action.data.type)
                                .update('data', data => action.data.type === "Checkbox" ? 'off' : null)
                                .update('data', data => action.data.formula ? runCustomFunc(immutableState, row, action.data.formula) : data)
                                .update('formula', formula => {if(action.data.formula) return action.data.formula})
                                .update('selectOptions', options => {if(action.data.selectOptions) return action.data.selectOptions})

                return row.set(action.data.id, curCell)
              }))
              .set('changed', true)



    case INSERT_COLUMN:

      let columnToInsert = newColInfo(immutableState.get('columnHeaders'))
                        .set('name', 'Column ' + (1+action.colIdx))
                        .set('idx', action.colIdx)

      return insertNewColInRows(immutableState.update('columnHeaders', columnHeaders => columnHeaders.map(column => {
        if (column.get('idx') >= action.colIdx) return column.set('idx',column.get('idx')+1)
        else return column
      }).insert(action.colIdx, columnToInsert)),columnToInsert)
      .set('changed', true)




    case SORT_COLUMN:

      let colId = action.sortBy.colId;
      let sortFnImm = function(a, b) {
        if(!a.hasIn([colId, 'data'])) return 1;
        else if(!b.hasIn([colId, 'data'])) return -1;
        else if(a.getIn([colId,'data'])>b.getIn([colId,'data'])) return (1*action.sortBy.order)
        else if(b.getIn([colId,'data'])>a.getIn([colId,'data'])) return (-1*action.sortBy.order)
        else return 0;
      }
      return immutableState
        .updateIn(['grid'], grid => grid.sort(sortFnImm))
        .set('changed', true)


    case SEARCH_SHEET:
      return immutableState
        .set('filteredRows',
        immutableState.get('grid')
          .reduce((accum, row, idx) => {
            let toSave;
            row.forEach(cell => {
              if (cell.has('data') && typeof cell.get('data') === 'string') {
                cell.get('data').toLowerCase().indexOf(action.term.toLowerCase()) > -1 ?
                  toSave = true : null;
              }
            })
            if (!toSave) return accum.push(idx);
            else return accum
          }, List())
        )


    case CLEAR_FILTERED_ROWS:
      return immutableState.set('filteredRows', []);
    case REMOVE_COLUMN:
      let colIdIm = action.colId ? action.colId :
        immutableState.getIn(['columnHeaders',immutableState.get('columnHeaders').length-1, 'id'])

      return immutableState
              .updateIn(['columnHeaders'], cols => cols.filter(col => colIdIm !== col.get('id')))
              .updateIn(['grid'], grid => grid.map(row => row.delete(colIdIm)))
              .set('changed', true)


    case FORMULA_COLUMN:
          // TODO should this corralate to the type of the new cell?
          // if (!newColumn.type) newColumn.type = 'Text';
      let colIdIdx = newColInfo(immutableState.get('columnHeaders'))
      let newColumn = Map(action.colData)
                        .set('id', colIdIdx.get('id'))
                        .set('name', 'Column ' + colIdIdx.get('idx'))
                        .set('idx', colIdIdx.get('idx'))


      // TODO assume map method for arr.method - confirm that is satisfactory
      return immutableState.update('grid', grid => grid.map(row => {
        let newData = action.func(row.getIn([action.coldata.id,'data']))
        return row.set(newColumn.get('id'), Map({
          data: newData,
          type: newColumn.get('type'),
          width: newColumn.get('width')
        }))
      }))
      .update('columnHeaders', headers => headers.push(newColumn))
      .set('changed', true)


    case ADD_ROW:
      const rowToAddAdd = immutableState.get('columnHeaders').reduce((accum, col) => {
        return accum.set(col.get('id'),
        Map({
          width: col.has('width') ?  col.get('width'): 200,
          data: null,
          type: col.get('type'),
          id: col.get('id') + Math.floor((Math.random() * (99999999 - 111111) + 111111)),
          formula: col.has('formula') ? col.get('formula') : '',
          selectOptions: col.has('selectOptions') ? col.get('selectOptions') : ''
        }))
        }
        , Map())

        const newGridAdd = immutableState.get('grid').push(rowToAddAdd);

        return immutableState
                .set('changed', true)
                .set('grid', newGridAdd)


    case DELETE_ROW:

      const newGrid = immutableState
        .get('grid')
        .filter((row, i) => i !== action.rowIdx ? true : false)

      return immutableState
              .set('grid', newGrid)
              .set('changed', true)


    case RESIZE_TABLE_COL:

      return immutableState
              .update('columnHeaders', headers => headers.map((ch,i) => {
                if(ch.get('id') === action.size.id) return ch.set('width', action.size.rect.width)
                else return ch;
              }))
              .update('grid', grid => grid.map(row => {
                return row.setIn([action.size.id, 'width'], action.size.rect.width)
              }))
              .set('changed', true)


    case SHOW_MAP:
      const newAddressData = immutableState
                          .get('grid')
                          .reduce((accum, row) =>  {
                            if (row.get(action.colId)) {
                              return accum.push(Map({data: row.getIn([action.colId, 'data']), name:row.getIn(['100','data'])}))
                            }
                          }, List());

      const newMapColumn = immutableState
                              .get('columnHeaders')
                              .filter(col => col.get('id') === action.colId ? true : false)
                              .get(['0', 'name'])

      return immutableState
                .set('showMap', true)
                .set('mapMarkersData', null)
                .set('addressData', newAddressData)
                .set('mapColumn', newMapColumn)

    case SEND_LAT_LONGS:
        return immutableState.set('mapMarkersData', action.geoResults);
    case HIDE_MAP:
        return immutableState.set('showMap', false)
    default:
      return immutableState;
  }
}
