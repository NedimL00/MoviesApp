import { configureStore } from "@reduxjs/toolkit";
import fetchMoviesReducer from './features/fetchMovies/fetchMoviesSlice';
import loginUserReducer from './features/userLogin/loginUserSlice'

export default configureStore({
  reducer: {
    fetchMovies: fetchMoviesReducer,
    login: loginUserReducer,
  }
})