import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userLikedRecipes: [],
    myRecipes: [],
    userData: {},
    userProfilePicUpdateStatus: ''
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
    updateProfilePicture: (state, action) => {
      const updatedUserData = {...state.userData};
      updatedUserData.photo = action.payload;
      return {
        ...state,
        userData: updatedUserData
      }
    },
    profilePicUpdateStatus: (state, action) => {
      return {
        ...state,
        userProfilePicUpdateStatus: action.payload
      }
    },
    logOut: (state, action) => {}
  }
})

export const { 
  getUserSuccess, 
  userLikedRecipes, 
  getMyRecipesSuccess,
  updateProfilePicture,
  profilePicUpdateStatus,
  logOut 
} = userReducer.actions;

export default userReducer.reducer;