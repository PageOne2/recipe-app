import sagaActionTypes from './sagaActionTypes'

export const getMostRecentRecipes = (page) => ({
    type: sagaActionTypes.GET_MOST_RECENT_RECIPES_START,
    payload: page
})

export const getMostLikedRecipes = (page) => ({
    type: sagaActionTypes.GET_MOST_LIKED_RECIPES_START,
    payload: page
})

export const getRecipeById = (id) => ({
    type: sagaActionTypes.GET_RECIPE_BY_ID,
    payload: id
})

export const getUser = (credentials) => ({
    type: sagaActionTypes.GET_USER,
    payload: credentials
})

export const keepPage = (page) => ({
    type: sagaActionTypes.KEEP_PAGE,
    payload: page
})