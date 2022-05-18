import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    redirected: false,
    userLikedRecipes: [],
    userData: {},
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
    userLikedRecipes: (state, action) => {
      return {
        ...state,
        userLikedRecipes: action.payload.type === 'like' 
        ? state.userLikedRecipes.concat(action.payload.id)
        : state.userLikedRecipes.filter(x => x !== action.payload.id) 
      }
    },
    redirection: (state, action) => {
      return {
        ...state,
        redirected: action.payload
      }
    }
  }
})

export const { getUserSuccess, userLikedRecipes, redirection } = userReducer.actions;

export default userReducer.reducer;