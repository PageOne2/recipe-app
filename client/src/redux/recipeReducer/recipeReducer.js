import { createSlice } from '@reduxjs/toolkit'

export const recipeReducer = createSlice({
  name: 'recipe',
  initialState: {
    noResultsMR: false,
    noResultsML: false,
    m_r_page: 1,
    m_l_page: 1,
    btn_class: 'mostRecent',
    most_recent_recipes: [],
    most_liked_recipes: [],
    recipeById: {}
  },
  reducers: {
    changeClassName: (state, action) => {
      return {
        ...state,
        btn_class: action.payload
      }
    },
    recipeLiked: (state, action) => {
      const mrRecipeIdx = state.most_recent_recipes.findIndex(el => el._id === action.payload.id);
      const mlRecipeIdx = state.most_liked_recipes.findIndex(el => el._id === action.payload.id);
      const mrrNewArray = [...state.most_recent_recipes];
      const mlrNewArray = [...state.most_liked_recipes];
      if (mrRecipeIdx > -1) mrrNewArray[mrRecipeIdx].likes = action.payload.likes;
      if (mlRecipeIdx > -1) mlrNewArray[mlRecipeIdx].likes = action.payload.likes;
      state.most_recent_recipes = mrrNewArray;
      state.most_liked_recipes = mlrNewArray
    },
    recipeDisliked: (state, action) => {
      const mrRecipeIdx = state.most_recent_recipes.findIndex(el => el._id === action.payload.id);
      const mlRecipeIdx = state.most_liked_recipes.findIndex(el => el._id === action.payload.id);
      const mrrNewArray = [...state.most_recent_recipes];
      const mlrNewArray = [...state.most_liked_recipes];
      if (mrRecipeIdx > -1) mrrNewArray[mrRecipeIdx].likes = action.payload.likes;
      if (mlRecipeIdx > -1) mlrNewArray[mlRecipeIdx].likes = action.payload.likes;
      state.most_recent_recipes = mrrNewArray;
      state.most_liked_recipes = mlrNewArray
    },
    getMostRecentRecipesSuccess: (state, action) => {
      return {
        ...state,
        m_r_page: state.m_r_page + 1,
        btn_class: 'mostRecent',
        most_recent_recipes: [...state.most_recent_recipes, ...action.payload]
      }
    },
    getMostLikedRecipesSuccess: (state, action) => {
      return {
        ...state,
        m_l_page: state.m_l_page + 1,
        btn_class: 'mostLiked',
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

export const { changeClassName, recipeLiked, recipeDisliked, getMostRecentRecipesSuccess, getMostLikedRecipesSuccess, getRecipeByIdSuccess, keepPage } = recipeReducer.actions

export default recipeReducer.reducer