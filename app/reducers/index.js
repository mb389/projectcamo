import { combineReducers } from 'redux';
import user from 'reducers/user';
import message from 'reducers/message';
import sheet from 'reducers/sheet';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  message,
  sheet,
  routing
});

export default rootReducer;
