import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import user from './user';
import message from './message';
import sheet from './sheet';
import spacecontrol from './spacecontrol';
import formulaStore from './formulaStore';
import dashboard from './dashboard';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  message,
  sheet,
  routing,
  spacecontrol,
  dashboard,
  formulaStore,
});

export default rootReducer;
