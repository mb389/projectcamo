import _ from 'lodash';
import {
  FORMULA_UPLOAD,
} from 'constants/index';

export default function sheet(state = {formulas: []}, action = {}) {
  switch (action.type) {
  	case FORMULA_UPLOAD:
  		let newState = _.cloneDeep(state);
  		newState.formulas.push(action.addedFormula);
  		return newState;
    default:
      return state;
  }
}