import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userData: {},
  },
  reducers: {
    getUserSuccess: (state, action) => {
      return {
        isLoggedIn: true,
        userData: action.payload
      }
    }
  }
})

export const { getUserSuccess } = userReducer.actions;

export default userReducer.reducer;