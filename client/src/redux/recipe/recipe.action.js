import RecipeActionTypes from './recipe.types'

export const getMostRecentRecipes = (page) => ({
    type: RecipeActionTypes.GET_MOST_RECENT_RECIPES_START,
    payload: page
})

export const getMostRecentRecipesSuccess = (recipes) => ({
    type: RecipeActionTypes.GET_MOST_RECENT_RECIPES_SUCCESS,
    payload: recipes
})

export const getMostLikedRecipes = (page) => ({
    type: RecipeActionTypes.GET_MOST_LIKED_RECIPES_START,
    payload: page
})

export const getMostLikedSuccess = (recipes) => ({
    type: RecipeActionTypes.GET_MOST_LIKED_RECIPES_SUCCESS,
    payload: recipes
})

export const changeClassName = (className) => ({
    type: RecipeActionTypes.CHANGE_CLASS_NAME,
    payload: className
})

export const keepPage = (page) => ({
    type: RecipeActionTypes.KEEP_PAGE,
    payload: page
})