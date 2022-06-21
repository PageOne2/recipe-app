import { createSlice } from '@reduxjs/toolkit'

export const recipeReducer = createSlice({
  name: 'recipe',
  initialState: {
    noResultsMostRecent: false,
    noResultsMostLiked: false,
    mostRecentPage: 0,
    mostLikedPage: 0,
    categorie: 'mostRecent',
    mostRecentRecipes: [],
    mostLikedRecipes: [],
    recipeById: {}
  },
  reducers: {
    changeCategorie: (state, action) => {
      return {
        ...state,
        categorie: action.payload
      }
    },
    getMostRecentRecipesSuccess: (state, action) => {
      return {
        ...state,
        mostRecentPage: state.mostRecentPage + 1,
        categorie: 'mostRecent',
        mostRecentRecipes: [...state.mostRecentRecipes, ...action.payload]
      }
    },
    getMostLikedRecipesSuccess: (state, action) => {
      return {
        ...state,
        mostLikedPage: state.mostLikedPage + 1,
        categorie: 'mostLiked',
        mostLikedRecipes: [...state.mostLikedRecipes, ...action.payload]
      }
    },
    getRecipeByIdSuccess: (state, action) => {
      return {
        ...state,
        recipeById: action.payload
      }
    },
    keepPage: (state, action) => {
      return {
        ...state,
        noResultsMostRecent: state.noResultsMostRecent ? true : action.payload[0],
        noResultsMostLiked: state.noResultsMostLiked ? true : action.payload[1]
      }
    }
  }
})

export const { changeCategorie, getMostRecentRecipesSuccess, getMostLikedRecipesSuccess, getRecipeByIdSuccess, keepPage } = recipeReducer.actions

export default recipeReducer.reducer