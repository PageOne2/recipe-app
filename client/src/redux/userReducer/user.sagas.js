import SagaActionTypes from '../redux-saga/sagaActionTypes';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { getUserSuccess, userLikedRecipes, recipeLiked, recipeDisliked } from './userReducer';
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
      yield all([
        put(getUserSuccess(res.data.user)),
        put(userLikedRecipes(res.data.user.likedRecipes))
      ])
    }
  } catch (err) {

  }
}

export function* signUp({payload}) {
  try {
    let data = yield fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    let res = yield data.json();
    if (res.data.user && res.token) {
      Cookies.set('jwt', res.token);
      yield all([
        put(getUserSuccess(res.data.user)),
        put(userLikedRecipes(res.data.user.likedRecipes))
      ])
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
      yield all([
        put(getUserSuccess(res.data.user)),
        put(userLikedRecipes(res.data.user.likedRecipes))
      ])
    }
  } catch(err) {

  }
}

export function* likeRecipe({payload}) {
  try {
    let data = yield fetch(`http://localhost:3000/api/users/likeRecipe/${payload}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('jwt')
      }
    });
    let res = yield data.json();
    if (data.status === 200) {
      yield put(recipeLiked({ id: payload, likes: res.likes }));
    }
  } catch (err) {

  }
}

export function* dislikeRecipe({payload}) {
  try {
    let data = yield fetch(`http://localhost:3000/api/users/dislikeRecipe/${payload}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('jwt')
      }
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

export function* onSignUp() {
  yield takeLatest(SagaActionTypes.SIGN_UP_USER_START, signUp);
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
    call(onSignUp),
    call(onGetUser),
    call(onLikeRecipe),
    call(onDislikeRecipe)
  ])
}