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

export const getMyRecipes = () => ({
  type: sagaActionTypes.GET_MY_RECIPES_START
})

export const logUser = (credentials) => ({
  type: sagaActionTypes.LOG_USER,
  payload: credentials
})

export const signUp = (credentials) => ({
  type: sagaActionTypes.SIGN_UP_USER_START,
  payload: credentials
})

export const getMe = () => ({
  type: sagaActionTypes.GET_ME
})

export const updateUserPassword = (passwords) => ({
  type: sagaActionTypes.UPDATE_USER_PASSWORD_START,
  payload: passwords
})

export const createRecipe = (recipeInfo) => ({
  type: sagaActionTypes.CREATE_RECIPE_START,
  payload: recipeInfo
})

export const likeRecipe = (id) => ({
  type: sagaActionTypes.LIKE_RECIPE,
  payload: id
})

export const dislikeRecipe = (id) => ({
  type: sagaActionTypes.DISLIKE_RECIPE,
  payload: id
})