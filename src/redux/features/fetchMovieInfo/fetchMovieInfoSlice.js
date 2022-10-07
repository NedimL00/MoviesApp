import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  movie: {},
  status: 'idle',
  error: null
}

export const fetchMovieInfo = createAsyncThunk('movies/fetchMovieInfo', async(id)=>{

    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: 'dd117956',
        i: id,
        plot: 'full',
      }
    })
    .catch((err)=>err.message)

    return response.data

})


export const movieInfoSlice = createSlice({
  name: 'fetchMovieInfo',
  initialState,
  extraReducers(builder) {
    builder 
      .addCase(fetchMovieInfo.pending, (state) => {
      state.status = 'loading';
      })
      .addCase(fetchMovieInfo.fulfilled, (state, action) => {
        if(action.payload.Response === 'False') {
          state.status = 'failed'
          state.error = action.payload.Error;
        } else {
          state.status = 'succeeded';
          state.movie = action.payload;
        }

      })
      .addCase(fetchMovieInfo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const {clearMovieState} = movieInfoSlice.actions;
export const selectMovieByID = (state) => state.fetchMovieInfo.movie;
export const getMovieStatus = (state) => state.fetchMovieInfo.status
export default movieInfoSlice.reducer;