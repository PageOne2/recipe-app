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
    type: sagaActionTypes.GET_RECIPE_BY_ID_START,
    payload: id
})

export const logUser = (credentials) => ({
    type: sagaActionTypes.LOG_USER,
    payload: credentials
})

export const getMe = () => ({
    type: sagaActionTypes.GET_ME,
})

export const likeRecipe = (id) => ({
    type: sagaActionTypes.LIKE_RECIPE,
    payload: id
})

export const dislikeRecipe = (id) => ({
    type: sagaActionTypes.DISLIKE_RECIPE,
    payload: id
})

export const keepPage = (page) => ({
    type: sagaActionTypes.KEEP_PAGE,
    payload: page
})