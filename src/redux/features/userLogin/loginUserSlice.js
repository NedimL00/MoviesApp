import { createSlice } from "@reduxjs/toolkit";



export const loginUserSlice = createSlice({
  name:'login',
  initialState: {},
  reducers: {
    login: (state, action) => {
      return state = action.payload;
    },
    logout: (state) => {
     return state = {};
    }
  }
})

export const {login, logout} = loginUserSlice.actions;

export const selectUser = (state) => state.login;
export const getLoggedInInfo = (state) => state.login.loggedIn;

export default loginUserSlice.reducer