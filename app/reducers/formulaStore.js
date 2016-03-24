import _ from 'lodash';
import {
  FORMULA_UPLOAD,
  FORMULA_FETCH
} from 'constants/index';

// TODO get all formulas on sheet load.
export default function sheet(state = {formulas: []}, action = {}) {
  switch (action.type) {
  	case FORMULA_UPLOAD:{
  	  		let newState = _.cloneDeep(state);
  	  		newState.formulas.push(action.addedFormula);
  	  		return newState;}
  	case FORMULA_FETCH:{
  	  		let newState = _.cloneDeep(state);
  	  		newState.formulas=action.allFormulas;
  	  		return newState;
  	  	}
    default:
      return state;
  }
}