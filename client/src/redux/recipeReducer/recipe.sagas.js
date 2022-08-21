import SagaActionTypes from '../redux-saga/sagaActionTypes';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import {
  getMostRecentRecipesSuccess,
  getMostLikedRecipesSuccess,
  getRecipeByIdSuccess,
  deleteRecipeSuccess,
  addRecentSharedRecipe,
  recipeLiked,
  recipeDisliked,
  setRequesting
} from './recipeReducer';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';

export function* getMostRecent({ payload }) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/recipes/mostRecent/${payload}` 
    : `http://localhost:3000/api/recipes/mostRecent/${payload}`;

    let data = yield fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let res = yield data.json();
    yield put(setRequesting(false))
    if (data.status === 200) {
      if (res.data.recipes.length) {
        yield put(getMostRecentRecipesSuccess(res.data.recipes));
      }
    }
  } catch (err) {

  }
}

export function* getMostLiked({ payload }) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/recipes/mostLiked/${payload}` 
    : `http://localhost:3000/api/recipes/mostLiked/${payload}`;

    let data = yield fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let res = yield data.json();
    yield put(setRequesting(false));
    if (data.status === 200) {
      if (res.data.recipes.length) {
        yield put(getMostLikedRecipesSuccess(res.data.recipes));
      }
    }
  } catch (err) {

  }
}

export function* getRecipeById({ payload }) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/recipes/${payload}` 
    : `http://localhost:3000/api/recipes/${payload}`;
    
    let data = yield fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let res = yield data.json();
    if (data.status === 200) {
      yield put(getRecipeByIdSuccess(res.data.recipe));
    }
  } catch (err) {

  }
}

export function* likeRecipe({payload}) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/users/likeRecipe/${payload}` 
    : `http://localhost:3000/api/users/likeRecipe/${payload}`;

    let data = yield fetch(apiUrl, {
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
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/users/dislikeRecipe/${payload}` 
    : `http://localhost:3000/api/users/dislikeRecipe/${payload}`;

    let data = yield fetch(apiUrl, {
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

export function* createRecipe({ payload }) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/recipes` 
    : 'http://localhost:3000/api/recipes';
    
    const formData = new FormData();
    const recipeInfo = {
      recipeName: payload.recipeName,
      ingredients: payload.ingredients,
      method: payload.method,
      servings: payload.servings,
      preparationTime: payload.preparationTime,
    };

    formData.append("recipeInfo", JSON.stringify(recipeInfo));
    formData.append("imageCover", payload.imageCover);

    const headers = { 'Authorization': 'Bearer ' + Cookies.get('jwt') };

    const res = yield toast.promise(
      axios.post(apiUrl, formData, { headers }),
      {
        pending: 'Sharing your recipe...',
        success: 'Recipe Shared Successfully!',
        error: 'Unable to share your recipe!'
      },
      {
        position: toast.POSITION.TOP_CENTER
      }
    );

    const createdRecipe = res.data.data.recipe;
    yield put(addRecentSharedRecipe(createdRecipe));
  } catch (err) {
    toast.error("Unable to share your recipe!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

export function* deleteRecipe({ payload }) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/recipes/${payload}` 
    : `http://localhost:3000/api/recipes/${payload}`;

    const res = yield fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('jwt')
      }
    }) 
    if (res.status) {
      toast.success("Recipe deleted successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
      yield put(deleteRecipeSuccess({ id: payload }))
    }
  } catch (err) {
    toast.error("Unable to delete your recipe!", {
      position: toast.POSITION.TOP_CENTER
    });
  } 
}

export function* updateRecipe({ payload }) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/recipes/${payload.id}` 
    : `http://localhost:3000/api/recipes/${payload.id}`;
    
    const formData = new FormData();

    formData.append("recipeInfo", JSON.stringify(payload.updatedRecipe));
    if (payload.imageCover) formData.append("imageCover", payload.imageCover);

    const headers = { 'Authorization': 'Bearer ' + Cookies.get('jwt') };
    yield toast.promise(
      axios.patch(apiUrl, formData, { headers }),
      {
        pending: 'Updating...',
        success: 'Updated Successfully!',
        error: 'Unable to update!'
      },
      {
        position: toast.POSITION.TOP_CENTER
      }
    );
  } catch (err) {
    toast.error("Unable to Update!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

export function* onGetAllRecipes() {
  yield takeLatest(SagaActionTypes.GET_MOST_RECENT_RECIPES_START, getMostRecent)
}

export function* onGetMostLiked() {
  yield takeLatest(SagaActionTypes.GET_MOST_LIKED_RECIPES_START, getMostLiked)
}

export function* onGetById() {
  yield takeLatest(SagaActionTypes.GET_RECIPE_BY_ID_START, getRecipeById)
}

export function* onLikeRecipe() {
  yield takeLatest(SagaActionTypes.LIKE_RECIPE, likeRecipe);
}

export function* onDislikeRecipe() {
  yield takeLatest(SagaActionTypes.DISLIKE_RECIPE, dislikeRecipe);
}

export function* onCreateRecipe() {
  yield takeLatest(SagaActionTypes.CREATE_RECIPE_START, createRecipe)
}

export function* onDeleteRecipe() {
  yield takeLatest(SagaActionTypes.DELETE_RECIPE_START, deleteRecipe)
}

export function* onUpdateRecipe() {
  yield takeLatest(SagaActionTypes.UPDATE_RECIPE_START, updateRecipe)
}

export function* recipeSagas() {
  yield all([
    call(onGetAllRecipes),
    call(onGetMostLiked),
    call(onGetById),
    call(onLikeRecipe),
    call(onDislikeRecipe),
    call(onCreateRecipe),
    call(onDeleteRecipe),
    call(onUpdateRecipe)
  ])
} 