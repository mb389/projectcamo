/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

export function closeHistoryModal() {
	return {
    type: types.CLOSE_HISTORY_MODAL
  };
}

export function showHistoryModal() {
	return {
    type: types.SHOW_HISTORY_MODAL
  };
}

export function clearSheet() {
  return {
    type: types.CLEAR_SHEET
  };
}

export function updateCell(data, key, idx, fromSuper) {
  return {
    type: types.UPDATE_CELL,
    cell: {
    	data,
    	key,
    	idx,
    },
    fromSuper,
  };
}

export function updateCellById(data, id) {
  return {
    type: types.UPDATE_CELL_BY_ID,
    cell: {
    	data: data,
    	id: id
    }
  };
}

export function showLookupModal(row,rowIdx,cell){
	return {
		 type: types.SHOW_LOOKUP_MODAL,
		 row,
		 cell,
		 rowIdx
	}
}

export function closeLookupModal(){
	return {
		type: types.CLOSE_LOOKUP_MODAL
	}
}

export function updateFormulaCell(key, idx, formula, row){
	return {
		type: types.UPDATE_FORMULA_CELL,
		formula,
		row,
		cell: {
			key,
			idx,
		}
	};
}

export function showRowModal(rowIdx){
	return {
		 type: types.SHOW_ROW_MODAL,
		 rowIdx: rowIdx
	}
}

export function updateModalCell(data, key, idx) {
	return {
		type: types.UPDATE_MODAL_CELL,
		cell: {
    	data: data,
    	key: key,
    	idx: idx
    }
	}
}

export function closeRowModal() {
	return {
		type: types.CLOSE_ROW_MODAL
	}
}

export function addRow() {
	return {
		type: types.ADD_ROW
	}
}

export function addColumn() {
	return {
		type: types.ADD_COLUMN
	}
}

export function updateColumn(data) {
	return {
		type: types.UPDATE_COLUMN,
		data,
	}
}

export function sortColumn(colId, sign) {
	return {
		type: types.SORT_COLUMN,
		sortBy: {
			colId: colId,
			order: sign,
		}
	}
}

export function removeColumn(colId) {
	return {
		type: types.REMOVE_COLUMN,
		colId,
	}
}

export function insertColumn(colIdx){
	return {
		type: types.INSERT_COLUMN,
		colIdx,
	}
}

export function currentCell(cell) {
  return {
    type: types.CURRENT_CELL,
    cell
  }
}

export function formulaColumn(arrMeth, func, colData){
	return {
		type: types.FORMULA_COLUMN,
		colData,
		func,
		arrMeth,
	}
}

export function moveToCell(keyCode) {
    return {
        type: types.MOVE_TO_CELL,
        keyCode
    }
}

export function searchSheet(term) {
  return {
    type: types.SEARCH_SHEET,
    term
  }
}

export function setHistoryTable(index) {
	return {
		type: types.SET_HISTORY_TABLE,
		index
	}
}

export function clearFilteredRows() {
	return {
		type: types.CLEAR_FILTERED_ROWS
	}
}

export function showMap() {
	return {
		type: types.SHOW_MAP
	}
}

export function closeMap() {
	return {
		type: types.HIDE_MAP
	}
}
