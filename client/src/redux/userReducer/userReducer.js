import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    errorMessage: '',
    redirected: false,
    userLikedRecipes: [],
    userData: {},
    interactedRecipes: []
  },
  reducers: {
    getUserSuccess: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        redirected: true,
        userLikedRecipes: [...action.payload.likedRecipes],
        userData: action.payload
      }
    },
    getUserFailure: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
        errorMessage: action.payload
      }
    },
    userLikedRecipes: (state, action) => {
      return {
        ...state,
        userLikedRecipes: action.payload.type === 'like' 
        ? state.userLikedRecipes.concat(action.payload.id)
        : state.userLikedRecipes.filter(x => x !== action.payload.id) 
      }
    },
    recipeLiked: (state, action) => {
      const recipeIdx = state.interactedRecipes.findIndex(x => x.id === action.payload.id);
      const newArray = [...state.interactedRecipes];
      if (recipeIdx > -1) newArray[recipeIdx].likes = action.payload.likes;
      else newArray.push(action.payload);
      state.interactedRecipes = newArray;
    },
    recipeDisliked: (state, action) => {
      const recipeIdx = state.interactedRecipes.findIndex(x => x.id === action.payload.id);
      const newArray = [...state.interactedRecipes];
      if (recipeIdx > -1) newArray[recipeIdx].likes = action.payload.likes;
      else newArray.push(action.payload);
      state.interactedRecipes = newArray;
    },
    redirection: (state, action) => {
      return {
        ...state,
        redirected: action.payload
      }
    },
    logOut: (state, action) => {}
  }
})

export const { getUserSuccess, getUserFailure, userLikedRecipes, recipeLiked, recipeDisliked, redirection, logOut } = userReducer.actions;

export default userReducer.reducer;