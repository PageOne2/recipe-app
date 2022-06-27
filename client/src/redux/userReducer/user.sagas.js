import SagaActionTypes from '../redux-saga/sagaActionTypes';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { 
  getUserSuccess, 
  logInUserFailure, 
  signUpUserFailure, 
  userLikedRecipes, 
  getMyRecipesSuccess,
  recipeLiked, 
  recipeDisliked 
} from './userReducer';
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
    if (data.status === 200) {
      Cookies.set('jwt', res.token);
      yield all([
        put(getUserSuccess(res.data.user)),
        put(userLikedRecipes(res.data.user.likedRecipes))
      ])
    } else {
      throw new Error(res.message);
    }
  } catch (err) {
    yield put(logInUserFailure(err.message));
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
    if (data.status === 201) {
      Cookies.set('jwt', res.token);
      yield all([
        put(getUserSuccess(res.data.user)),
        put(userLikedRecipes(res.data.user.likedRecipes))
      ])
    } else {
      throw new Error(res.message);
    }
  } catch (err) {
    yield put(signUpUserFailure(err.message));
  }
}

export function* getMe() {
  try {
    let data = yield fetch('http://localhost:3000/api/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export function* updateUserPassword({payload}) {
  try {
    let data = yield fetch('http://localhost:3000/api/users/updateMyPassword', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('jwt')
      },
      body: JSON.stringify(payload)
    });
    let res = yield data.json();
    if (data.status === 200) {
      Cookies.set('jwt', res.token);
    }
  } catch (err) {

  }
}

export function* getMyRecipes() {
  try {
    let data = yield fetch('http://localhost:3000/api/users/myRecipes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('jwt')
      }
    });
    let res = yield data.json();
    if (data.status === 200) {
      yield put(getMyRecipesSuccess(res.data.myRecipes));
    }
  } catch (err) {
    console.log(err)
  }
}

export function* likeRecipe({payload}) {
  try {
    let data = yield fetch(`http://localhost:3000/api/users/likeRecipe/${payload}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
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

export function* onUpdateUserPassword() {
  yield takeLatest(SagaActionTypes.UPDATE_USER_PASSWORD_START, updateUserPassword);
}

export function* onGetMyRecipes() {
  yield takeLatest(SagaActionTypes.GET_MY_RECIPES_START, getMyRecipes);
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
    call(onUpdateUserPassword),
    call(onGetMyRecipes),
    call(onLikeRecipe),
    call(onDislikeRecipe)
  ])
}