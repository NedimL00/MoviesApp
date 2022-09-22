import React from 'react'
import { useSelector } from 'react-redux';
import Movie from '../../../components/layout/Movie/Movie';
import { getError, getMoviesStatus, selectMovies } from './fetchMoviesSlice';
import styles from './Movies.module.css'

function Movies() {

  const status = useSelector(getMoviesStatus);
  const movies = useSelector(selectMovies);
  const error = useSelector(getError);


 if(status === 'succeeded') {
  if(movies.length !== 0) {
    return (
      <div className={styles.movieContainer}>
        {movies.map((movie) => 
          <Movie key={movie.imdbID} movie={movie} />
        )}
      </div>
    )
  }
}  else if (status === 'failed') {
  return (window.alert(error))
}



}

export default Movies