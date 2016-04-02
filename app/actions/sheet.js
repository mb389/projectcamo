import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';
import secrets from '../../server/config/secrets'; 

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

export function deleteRow(rowIdx) {
  return {
    type: types.DELETE_ROW,
    rowIdx
  };
}

export function updateCell(data, key, idx, fromSuper, formulaCells) {
  return {
    type: types.UPDATE_CELL,
    cell: {
    	data,
    	key,
    	idx,
    },
    fromSuper,
    formulaCells,
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

export function showLookupModal(row,rowIdx,cell,cellKey){
	return {
		 type: types.SHOW_LOOKUP_MODAL,
		 row,
		 cell,
		 rowIdx,
		 cellKey
	}
}

export function closeLookupModal(){
	return {
		type: types.CLOSE_LOOKUP_MODAL
	}
}

export function showRowModal(rowIdx){
	return {
		 type: types.SHOW_ROW_MODAL,
		 rowIdx: rowIdx
	}
}

export function updateModalCell(data, key, idx, push) {
	return {
		type: types.UPDATE_MODAL_CELL,
		cell: {
    	data: data,
    	key: key,
    	idx: idx
    },
    push
	}
}

export function closeRowModal(dontSave) {
	return {
		type: types.CLOSE_ROW_MODAL,
		dontSave
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



export function dragCol(panes) {
	return {
		type: types.DRAG_TABLE_COL,
		panes
	}
}


export function resizeCol(size) {
	return {
		type: types.RESIZE_TABLE_COL,
		size
}
}

export function showMap(colId) {
	return {
		type: types.SHOW_MAP,
		colId
	}
}

export function closeMap() {
	return {
		type: types.HIDE_MAP
	}
}

export function getLatLongs(addressArray) {
	return (dispatch) => {
		let addresses = addressArray.filter(item => item.data ? true : false)
		let addressUrls = addresses.map(add => {
			return request(`https://maps.googleapis.com/maps/api/geocode/json?address=${add.data}&key=${secrets.google.clientID}`);
		})
		Promise.all(addressUrls)
		.then(resArray => {
			let geoCoded = resArray.map((result,i) => {
				if(result.data.status === 'OK') {
					return {loc: result.data.results[0].geometry.location, name:addresses[i].name};
				}
			}).filter(item => item)
			dispatch(sendLatLongs(geoCoded))
		})
	}
}

export function sendLatLongs(geoResults) {
	return {
		type: types.SEND_LAT_LONGS,
		geoResults
	}
}
