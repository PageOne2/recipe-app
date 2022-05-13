import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    isRedirected: false,
    userLikedRecipes: [],
    userData: {},
  },
  reducers: {
    getUserSuccess: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        isRedirected: true,
        userLikedRecipes: [...action.payload.likedRecipes],
        userData: action.payload
      }
    },
    userLikedRecipes: (state, action) => {
      return {
        ...state,
        userLikedRecipes: action.payload[0] === 'like' 
        ? [...state.userLikedRecipes, ...action.payload[1]]
        : [...action.payload[1]]
      }
    }
  }
})

export const { getUserSuccess, userLikedRecipes } = userReducer.actions;

export default userReducer.reducer;