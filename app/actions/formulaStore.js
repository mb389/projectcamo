/* eslint consistent-return: 0, no-else-return: 0*/
import {polyfill} from 'es6-promise';
import request from 'axios';
import * as types from '../constants/index';

polyfill();

function addOneToList(addedFormula) {
  return {
    type: types.FORMULA_UPLOAD,
    addedFormula,
  };
}

export function formulaUpload(name, functionStr) {
  return (dispatch) => {
    request
      .post('/formulaStore', {name, functionStr})
      .then((res) => res.data)
      .then((res) => dispatch(addOneToList(res)))
      .catch((err) => err);
  };
}

function addFormualsToFormulaStore(allFormulas) {
  return {
    type: types.FORMULA_FETCH,
    allFormulas,
  };
}

export function fetchFormulaStore() {
  return (dispatch) => {
    request('/formulaStore')
      .then((res) => res.data)
      .then((res) => dispatch(addFormualsToFormulaStore(res)))
      .catch((err) => err);
  };
}

function removeFromList(formulaId) {
  return {
    type: types.FORMULA_REMOVE,
    formulaId,
  };
}

export function formulaRemove(formulaId) {
  return (dispatch) => {
    request
      .delete(`/formulaStore/${formulaId}`)
      .then(() => dispatch(removeFromList(formulaId)))
      .catch((err) => err);
  };
}
