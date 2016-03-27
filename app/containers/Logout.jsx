import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import {LoginOrRegister} from './LoginOrRegister';
import styles from 'css/components/login';
import * as UserActions from 'actions/users';

class Logout extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
  }

  componentWillMount() {
      this.props.dispatch(UserActions.logOut());
    }

  render() {
    return (
      <div>
      </div>
    )
  }

}


function mapStateToProps(state) {
  return {user: state.user};
}

export default connect(mapStateToProps)(Logout);
