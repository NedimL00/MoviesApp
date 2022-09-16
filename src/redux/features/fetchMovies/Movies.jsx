import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Movie from '../../../components/layout/Movie/Movie';
import { fetchMovies } from './fetchMoviesSlice'; 

function Movies() {

  const status = useSelector((state)=>state.fetchMovies.status);
  const movies = useSelector((state)=>state.fetchMovies.movies);
  const dispatch = useDispatch();


  useEffect(()=> {
    dispatch(fetchMovies('Harry'));
  }, [])


    console.log(movies.Search);

 if(status === 'succeeded') {
return (
  <div>
    {movies.Search.map((movie) => 
      <Movie movie={movie} />
    )}
  </div>
)

}
 else {
  return (
  <div>
    noMovies
  </div>
  )
 }

}

export default Movies