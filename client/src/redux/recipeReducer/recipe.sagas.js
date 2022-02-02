import RecipeActionTypes from './sagaActionTypes'
import { takeLatest, put, call, all } from 'redux-saga/effects'

import { getMostRecentRecipesSuccess, getMostLikedRecipesSuccess, keepPage } from './recipeReducer'

export function* getMostRecent({payload}) {
    try {
        let data = yield fetch(`http://localhost:3000/api/recipes/mostRecent/${payload}`);
        let res = yield data.json();

        if(res.data.recipes.length) {
            yield put(getMostRecentRecipesSuccess(res.data.recipes))
        } else {
            yield put(keepPage([true, false]))
        }

    } catch(err) {
    }
}

export function* getMostLiked({payload}) {
    try {
        let data = yield fetch(`http://localhost:3000/api/recipes/mostLiked/${payload}`)
        let res = yield data.json()

        if(res.data.recipes.length) {
            yield put(getMostLikedRecipesSuccess(res.data.recipes))
        } else {
            yield put(keepPage([false, true]))
        }

    } catch(err) {

    }
}

export function* onGetAllRecipes() {
    yield takeLatest(RecipeActionTypes.GET_MOST_RECENT_RECIPES_START, getMostRecent)
}

export function* onGetMostLiked() {
    yield takeLatest(RecipeActionTypes.GET_MOST_LIKED_RECIPES_START, getMostLiked)
}

export function* recipeSagas() {
    yield all([
        call(onGetAllRecipes),
        call(onGetMostLiked)
    ])
} 