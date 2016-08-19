/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

export function formulaUpload(name, functionStr) {
	return (dispatch) => {
		request.post('/formulaStore', {name, functionStr})
		.then(res => res.data)
		.then(res => dispatch(addOneToList(res)))
	}
}

function addOneToList(addedFormula) {
	return {
		type: types.FORMULA_UPLOAD,
		addedFormula,
	}
}

export function fetchFormulaStore(){
	return (dispatch) => {
		request('/formulaStore')
		.then(res => res.data)
		.then(res => dispatch(addFormualsToFormulaStore(res)))
		.catch(err => console.log(err))
	}
}

function addFormualsToFormulaStore (allFormulas) {
	return {
		type: types.FORMULA_FETCH,
		allFormulas,
	}
}

export function formulaRemove(formulaId) {
	console.log("Action", formulaId);
	return (dispatch) => {
		request.delete('/formulaStore/' + formulaId)
		.then(() => dispatch(removeFromList(formulaId)))
		.catch(err => console.log(err))
	}
}

function removeFromList(formulaId) {
	return {
		type: types.FORMULA_REMOVE,
		formulaId,
	}
}
