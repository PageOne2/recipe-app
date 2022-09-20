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

export const getUserRecipes = (id) => ({
  type: sagaActionTypes.GET_USER_RECIPES,
  payload: id
})

export const getRecipesUserLiked = (id) => ({
  type: sagaActionTypes.GET_RECIPES_USER_LIKED,
  payload: id
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

export const getUserInfo = (userId) => ({
  type: sagaActionTypes.GET_USER_INFO,
  payload: userId
})

export const updateUserPassword = (passwords) => ({
  type: sagaActionTypes.UPDATE_USER_PASSWORD_START,
  payload: passwords
})

export const changeProfilePicture = (data) => ({
  type: sagaActionTypes.CHANGE_PROFILE_PICTURE,
  payload: data
})

export const createRecipe = (recipeInfo) => ({
  type: sagaActionTypes.CREATE_RECIPE_START,
  payload: recipeInfo
})

export const deleteRecipe = (id) => ({
  type: sagaActionTypes.DELETE_RECIPE_START,
  payload: id
})

export const updateRecipe = (recipeInfo) => ({
  type: sagaActionTypes.UPDATE_RECIPE_START,
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