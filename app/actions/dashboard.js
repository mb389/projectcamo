/* eslint consistent-return: 0, no-else-return: 0*/
import {polyfill} from 'es6-promise';
import request from 'axios';
import * as types from '../constants/index';

polyfill();

function loadSpaces(spaces) {
  return {
    type: types.LOAD_USER_SPACES,
    spaces: spaces.spaces,
    collabSpaces: spaces.collabSpaces,
  };
}

// function loadUserInfo(user) {
//   return {
//     type: types.LOAD_USER_INFO,
//     user
//   };
// }

function addCollab(data, email) {
  return {
    type: types.ADD_USER_COLLAB,
    collabSpaces: data.collabs,
    email,
  };
}

export function addCollabRoute(email, id) {
  return (dispatch) => {
    request
      .post(`/workspace/${id}/add`, {email})
      .then((res) => dispatch(addCollab(res.data, email)))
      .catch((err) => err);
  };
}

export function clearSheet() {
  return {
    type: types.CLEAR_SHEET,
  };
}

export function spaceToStore(res) {
  return {
    type: types.ADD_USER_SPACE,
    id: res.space._id,
    name: res.space.name,
    sheet: res.sheet,
  };
}

export function spaceToRemove(res) {
  return {
    type: types.REMOVE_USER_SPACE,
    id: res._id,
  };
}

export function getSpaces() {
  return (dispatch) => {
    request('/workspace')
      .then((res) => dispatch(loadSpaces(res.data)))
      .then(() => dispatch(clearSheet()))
      .catch((err) => err);
  };
}

export function createSpace(spaceCount = 0) {
  return (dispatch) => {
    request
      .post('/workspace', {spaceCount})
      .then((res) => dispatch(spaceToStore(res.data)))
      .catch((err) => err);
  };
}

export function removeSpace(space) {
  return (dispatch) => {
    request
      .delete(`/workspace/${space._id}`)
      .then(() => dispatch(spaceToRemove(space)))
      .catch((err) => err);
  };
}
