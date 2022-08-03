import { createSlice } from '@reduxjs/toolkit'

export const recipeReducer = createSlice({
  name: 'recipe',
  initialState: {
    requesting: false,
    mostRecentPage: 0,
    mostLikedPage: 0,
    categorie: 'mostRecent',
    mostRecentRecipes: [],
    mostLikedRecipes: [],
    recipeById: {},
  },
  reducers: {
    changeCategorie: (state, action) => {
      return {
        ...state,
        categorie: action.payload
      }
    },
    getMostRecentRecipesSuccess: (state, action) => {
      let mostRecentPage = state.mostRecentPage;
      let mostRecentRecipes = [];
      if (action.payload.length >= 8) mostRecentPage = state.mostRecentPage + 1; 
      if (state.mostRecentRecipes.length) {
        action.payload.forEach(item => {
          const existingRecipe = state.mostRecentRecipes.find(x => x._id === item._id);
          if (!existingRecipe) mostRecentRecipes.push(item);
        })
      } else {
        mostRecentRecipes = [...action.payload]
      }
      return {
        ...state,
        mostRecentPage: mostRecentPage,
        categorie: 'mostRecent',
        mostRecentRecipes: [...state.mostRecentRecipes, ...mostRecentRecipes]
      }
    },
    getMostLikedRecipesSuccess: (state, action) => {
      let mostLikedPage = state.mostLikedPage;
      let mostLikedRecipes = [];
      if (action.payload.length >= 8) mostLikedPage = state.mostLikedPage + 1;
      if (state.mostLikedRecipes.length) {
        action.payload.forEach(item => {
          const existingRecipe = state.mostLikedRecipes.find(x => x._id === item._id);
          if (!existingRecipe) mostLikedRecipes.push(item);
        })
      } else {
        mostLikedRecipes = [...action.payload]
      }
      return {
        ...state,
        mostLikedPage: mostLikedPage,
        categorie: 'mostLiked',
        mostLikedRecipes: [...state.mostLikedRecipes, ...mostLikedRecipes]
      }
    },
    getRecipeByIdSuccess: (state, action) => {
      return {
        ...state,
        recipeById: action.payload
      }
    },
    deleteRecipeSuccess: (state, action) => {
      return {
        ...state,
        mostRecentRecipes: state.mostRecentRecipes.filter(x => x._id !== action.payload.id),
        mostLikedRecipes: state.mostLikedRecipes.filter(x => x._id !== action.payload.id)
      }
    },
    addRecentSharedRecipe: (state, action) => {
      return {
        ...state,
        mostRecentRecipes: [action.payload, ...state.mostRecentRecipes],
      }
    },
    setRequesting: (state, action) => {
      return {
        ...state,
        requesting: action.payload
      }
    }
  }
})

export const { 
  changeCategorie, 
  getMostRecentRecipesSuccess, 
  getMostLikedRecipesSuccess, 
  getRecipeByIdSuccess, 
  deleteRecipeSuccess,
  addRecentSharedRecipe,
  setRequesting
} = recipeReducer.actions

export default recipeReducer.reducer