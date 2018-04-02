import {polyfill} from 'es6-promise';
import request from 'axios';
import {push} from 'react-router-redux';
import {updateSheet} from './SpaceControls';
import * as types from '../constants';
import {getSpaces} from '../actions/dashboard';

polyfill();

function makeUserRequest(method, data, api = '/login') {
  return request({
    url: api,
    method,
    data,
    withCredentials: true,
  });
}

// function getUser(user) {
//   return {
//     type: types.GET_USER_INFO,
//     user
//   };
// }

export function retrieveUserInfo(id) {
  return (dispatch) => {
    request(`/user/${id}`)
      .then((res) => dispatch(updateSheet(res.data.history)))
      .catch((err) => err);
  };
}

// Log In Action Creators
function beginLogin() {
  return {type: types.MANUAL_LOGIN_USER};
}

function loginSuccess(message) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message,
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message,
  };
}

// Sign Up Action Creators
function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message,
  };
}

function beginSignUp() {
  return {type: types.SIGNUP_USER};
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message,
  };
}

// Log Out Action Creators
function beginLogout() {
  return {type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return {type: types.LOGOUT_SUCCESS_USER};
}

function logoutError() {
  return {type: types.LOGOUT_ERROR_USER};
}

export function toggleLoginMode() {
  return {type: types.TOGGLE_LOGIN_MODE};
}

export function manualLogin(data) {
  return (dispatch) => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then((response) => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message));
          dispatch(getSpaces());
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch((err) => dispatch(loginError(err.data.message)));
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(beginSignUp());

    return makeUserRequest('post', data, '/signup')
      .then((response) => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message));
          dispatch(push('/'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch((err) => dispatch(signUpError(err.data.message)));
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());

    return makeUserRequest('post', null, '/logout')
      .then((response) => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      })
      .then(() => dispatch(push('/login')))
      .catch((err) => err);
  };
}
