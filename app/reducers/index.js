import { combineReducers } from 'redux';
import user from 'reducers/user';
import message from 'reducers/message';
import sheet from 'reducers/sheet';
import spacecontrol from 'reducers/spacecontrol';
import dashboard from 'reducers/dashboard';
import dragtable from 'reducers/dragtable';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  message,
  sheet,
  routing,
  spacecontrol,
  dashboard,
  dragtable
});

export default rootReducer;
