import { createSlice } from '@reduxjs/toolkit'

export const recipeReducer = createSlice({
  name: 'recipe',
  initialState: {
    noResultsMR: false,
    noResultsML: false,
    m_r_page: 0,
    m_l_page: 0,
    categorie: 'mostRecent',
    most_recent_recipes: [],
    most_liked_recipes: [],
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
        m_r_page: state.m_r_page + 1,
        categorie: 'mostRecent',
        most_recent_recipes: [...state.most_recent_recipes, ...action.payload]
      }
    },
    getMostLikedRecipesSuccess: (state, action) => {
      return {
        ...state,
        m_l_page: state.m_l_page + 1,
        categorie: 'mostLiked',
        most_liked_recipes: [...state.most_liked_recipes, ...action.payload]
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
        noResultsMR: state.noResultsMR ? true : action.payload[0],
        noResultsML: state.noResultsML ? true : action.payload[1]
      }
    }
  }
})

export const { changeCategorie, getMostRecentRecipesSuccess, getMostLikedRecipesSuccess, getRecipeByIdSuccess, keepPage } = recipeReducer.actions

export default recipeReducer.reducer