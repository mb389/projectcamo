/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

function loadSpaces(spaces) {
  return {
    type: types.LOAD_USER_SPACES,
    spaces: spaces.spaces,
    collabSpaces: spaces.collabSpaces
  }
}

function loadUserInfo(user) {
  return {
    type: types.LOAD_USER_INFO,
    user
  }
}

function addCollab(data, email) {
  return {
    type: types.ADD_USER_COLLAB,
    collabSpaces: data.collabs,
    email,

  }
}

export function addCollabRoute(email,id) {
  return (dispatch) => {
    request.post(`/workspace/${id}/add`,{email})
    .then(res => {
      dispatch(addCollab(res.data, email))
    })
  }
}

export function clearSheet() {
  return {
    type: types.CLEAR_SHEET
  };
}

export function getSpaces() {
  return (dispatch) => {
    request(`/workspace`)
    .then(res => {
      dispatch(loadSpaces(res.data))
    })
    .then(() => dispatch(clearSheet()))
  }
}

export function createSpace(spaceCount=0) {

  return (dispatch) => {
    request.post('/workspace', { spaceCount })
    .then(res => {
      dispatch(spaceToStore(res.data))
    })
    .then(null,console.log("post workspace failed"))
  }
}

export function removeSpace(space) {
  console.log(space)
  return (dispatch) => {
    request.delete(`/workspace/${space._id}`)
    .then(res => {
      dispatch(spaceToRemove(space))
    })
    .then(null,(err)=>console.log(err))
  }
}

export function spaceToStore(res) {
  return {
    type: types.ADD_USER_SPACE,
    id: res.space._id,
    name: res.space.name,
    sheet: res.sheet
  }
}

export function spaceToRemove(res) {
  return {
    type: types.REMOVE_USER_SPACE,
    id: res._id
  }
}
