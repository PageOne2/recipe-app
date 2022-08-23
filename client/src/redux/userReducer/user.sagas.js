import SagaActionTypes from '../redux-saga/sagaActionTypes';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { 
  getUserSuccess, 
  userLikedRecipes, 
  getMyRecipesSuccess,
  updateProfilePicture,
  profilePicUpdateStatus
} from './userReducer';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import axios from 'axios';

export function* logUser({payload}) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/users/login` 
    : 'http://localhost:3000/api/users/login';

    const res = yield fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) 
    });
    
    const data = yield res.json();
    if (res.status === 200) {
      Cookies.set('jwt', data.token);
      toast.success('Successfully Logged in!', {
        position: toast.POSITION.TOP_CENTER
      });
      yield all([
        put(getUserSuccess(data.data.user)),
        put(userLikedRecipes(data.data.user.likedRecipes))
      ])
    } else {
      throw new Error();
    }
  } catch (err) {
    toast.error("Incorrect Email or Password!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

export function* signUp({payload}) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/users/signup` 
    : 'http://localhost:3000/api/users/signup';

    let res = yield fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    let data = yield res.json();
    if (res.status === 201) {
      Cookies.set('jwt', data.token);
      toast.success('Sign Up Successfull!', {
        position: toast.POSITION.TOP_CENTER
      });
      yield all([
        put(getUserSuccess(data.data.user)),
        put(userLikedRecipes(data.data.user.likedRecipes))
      ])
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    toast.error(`${err.message}`, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

export function* getMe() {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/users/me` 
    : 'http://localhost:3000/api/users/me';

    let data = yield fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('jwt')
      }
    });
    let res = yield data.json(); 
    if (data.status === 200) {
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
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/users/updateMyPassword` 
    : 'http://localhost:3000/api/users/updateMyPassword';

    const res = yield fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('jwt')
      },
      body: JSON.stringify(payload)
    });
      
    const data = yield res.json();
    if (res.status === 200) {
      Cookies.set('jwt', data.token);
      toast.success('Password successfully updated!', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  } catch (err) {
    toast.error("Unable to update your password!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

export function* changeProfilePicture({payload}) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/users/updateMyProfilePic/${payload.id}` 
    : `http://localhost:3000/api/users/updateMyProfilePic/${payload.id}`;

    const formData = new FormData();
    formData.append("photo", payload.file);

    const headers = { 'Authorization': 'Bearer ' + Cookies.get('jwt') };
    const res = yield axios.patch(apiUrl, formData, { headers });

    if (res.status === 200) {
      yield all([
        put(updateProfilePicture(res.data.data.updatedProfilePic)),
        put(profilePicUpdateStatus('success'))
      ]);
      toast.success('Profile picture updated successfully!', {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    yield put(profilePicUpdateStatus('fail'));
    toast.error('Unable to update your profile picture!', {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

export function* getMyRecipes() {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/users/myRecipes` 
    : 'http://localhost:3000/api/users/myRecipes';

    let data = yield fetch(apiUrl, {
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

export function* onChangeProfilePicture() {
  yield takeLatest(SagaActionTypes.CHANGE_PROFILE_PICTURE, changeProfilePicture);
}

export function* onGetMyRecipes() {
  yield takeLatest(SagaActionTypes.GET_MY_RECIPES_START, getMyRecipes);
}

export function* userSagas() {
  yield all([
    call(onLogUser),
    call(onSignUp),
    call(onGetUser),
    call(onUpdateUserPassword),
    call(onChangeProfilePicture),
    call(onGetMyRecipes)
  ])
}