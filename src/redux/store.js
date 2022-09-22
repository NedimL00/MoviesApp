import { configureStore } from "@reduxjs/toolkit";
import fetchMoviesReducer from './features/fetchMovies/fetchMoviesSlice';
import fetchMovieInfoReducer from './features/fetchMovieInfo/fetchMovieInfoSlice';
import loginUserReducer from './features/userLogin/loginUserSlice'

export default configureStore({
  reducer: {
    fetchMovies: fetchMoviesReducer,
    fetchMovieInfo: fetchMovieInfoReducer,
    login: loginUserReducer,
  }
})