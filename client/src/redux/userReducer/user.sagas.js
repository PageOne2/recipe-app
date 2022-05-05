import SagaActionTypes from '../redux-saga/sagaActionTypes';
import { takeLatest, put, call, all } from 'redux-saga/effects';

import { getUserSuccess } from './userReducer';

export function* getUser({payload}) {
  try {
    let data = yield fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) 
    });
    let res = yield data.json();
    if (res.data.user) {
      yield put(getUserSuccess(res.data.user));
    }
  } catch (err) {

  }
}

export function* onGetUser() {
  yield takeLatest(SagaActionTypes.GET_USER, getUser);
}

export function* userSagas() {
  yield all([
    call(onGetUser)
  ])
}