import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  movies: {},
  status: 'idle',
  error: null
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async(text)=>{

  try {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 'dd117956',
        s: text.toLowerCase().split(' ').join('+'),
        type: 'movie',
      }
    })

    return response.data;

  } catch (err) {
    return err.message
  }
  
})


export const moviesSlice = createSlice({
  name: 'fetchMovies',
  initialState,
  extraReducers(builder) {
    builder 
      .addCase(fetchMovies.pending, (state, action) => {
      state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if(action.payload.Response === 'False') {
          state.status = 'failed'
          state.error = action.payload.Error;
        } else {
          state.status = 'succeeded';
          state.movies = action.payload;
        }

      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectMovies = (state) => state.fetchMovies.movies.Search;
export const getMoviesStatus = (state) => state.fetchMovies.status;
export const getError = (state) => state.fetchMovies.error;
export default moviesSlice.reducer