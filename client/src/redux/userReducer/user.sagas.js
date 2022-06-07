import SagaActionTypes from '../redux-saga/sagaActionTypes';
import { takeLatest, put, call, all } from 'redux-saga/effects';

import { getUserSuccess, userLikedRecipes } from './userReducer';
import { recipeLiked, recipeDisliked } from '../recipeReducer/recipeReducer';

import Cookies from 'js-cookie';

export function* logUser({payload}) {
  try {
    let data = yield fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) 
    });
    let res = yield data.json();
    if (res.data.user && res.token) {
      Cookies.set('jwt', res.token);
      yield put(getUserSuccess(res.data.user));
      yield put(userLikedRecipes(res.data.user.likedRecipes));
    }
  } catch (err) {

  }
}

export function* getMe() {
  try {
    let data = yield fetch('http://localhost:3000/api/users/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('jwt')
      }
    });
    let res = yield data.json(); 
    if (res.data.user) {
      yield put(getUserSuccess(res.data.user));
      yield put(userLikedRecipes(res.data.user.likedRecipes));
    }
  } catch(err) {

  }
}

let aborter = null;
export function* likeRecipe({payload}) {
  if (aborter) aborter.abort();
  aborter = new AbortController();
  const signal = aborter.signal;
  try {
    let data = yield fetch(`http://localhost:3000/api/users/likeRecipe/${payload}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('jwt')
      },
      signal
    });
    let res = yield data.json();
    if (data.status === 200) {
      yield put(userLikedRecipes({ type: 'like', id: payload }));
      yield put(recipeLiked({ id: payload, likes: res.likes }));
    }
  } catch (err) {

  }
}

export function* dislikeRecipe({payload}) {
  if (aborter) aborter.abort();
  aborter = new AbortController();
  const signal = aborter.signal;
  try {
    let data = yield fetch(`http://localhost:3000/api/users/dislikeRecipe/${payload}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('jwt')
      },
      signal
    });
    let res = yield data.json();
    if (data.status === 200) {
      yield put(recipeDisliked({ id: payload, likes: res.likes }));
    }
  } catch (err) {

  }
}

export function* onLogUser() {
  yield takeLatest(SagaActionTypes.LOG_USER, logUser);
}

export function* onGetUser() {
  yield takeLatest(SagaActionTypes.GET_ME, getMe);
}

export function* onLikeRecipe() {
  yield takeLatest(SagaActionTypes.LIKE_RECIPE, likeRecipe);
}

export function* onDislikeRecipe() {
  yield takeLatest(SagaActionTypes.DISLIKE_RECIPE, dislikeRecipe);
}

export function* userSagas() {
  yield all([
    call(onLogUser),
    call(onGetUser),
    call(onLikeRecipe),
    call(onDislikeRecipe)
  ])
}