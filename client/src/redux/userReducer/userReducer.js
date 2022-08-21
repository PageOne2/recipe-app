import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userLikedRecipes: [],
    myRecipes: [],
    userData: {}
  },
  reducers: {
    getUserSuccess: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
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
    getMyRecipesSuccess: (state, action) => {
      return {
        ...state,
        myRecipes: action.payload
      }
    },
    logOut: (state, action) => {}
  }
})

export const { 
  getUserSuccess, 
  userLikedRecipes, 
  getMyRecipesSuccess,
  logOut 
} = userReducer.actions;

export default userReducer.reducer;