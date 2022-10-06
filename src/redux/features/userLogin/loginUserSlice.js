import { createSlice } from "@reduxjs/toolkit";



export const loginUserSlice = createSlice({
  name:'login',
  initialState: {
    user:null,
  },
  reducers: {
    login: (state, action) => {
      void (state.user = action.payload);
    },
    logout: (state) => {
      void (state.user = null);
    }
  }
})

export const {login, logout} = loginUserSlice.actions;

export const selectUser = (state) => state.login.user;

export default loginUserSlice.reducer