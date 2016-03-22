import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import About from 'containers/About';
import SpaceControl from 'containers/SpaceControl';
import LoginOrRegister from 'containers/LoginOrRegister';
import Dashboard from 'containers/Dashboard';
import { logOut } from 'actions/users';
import Logout from 'containers/Logout';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="login"
        component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="logout"
          component={Logout} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="about" component={About} />
      <Route path="space/:spaceId" component={SpaceControl} />
    </Route>
  );
};
