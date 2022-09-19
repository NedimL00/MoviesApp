import React from 'react'
import { useSelector } from 'react-redux';
import Movie from '../../../components/layout/Movie/Movie';
import styles from './Movies.module.css'

function Movies() {

  const status = useSelector((state)=>state.fetchMovies.status);
  const movies = useSelector((state)=>state.fetchMovies.movies);
  const error = useSelector((state)=>state.fetchMovies.error);


  console.log(movies);
  console.log(status);

 if(status === 'succeeded') {
  if(movies.Search?.length !== 0) {
    return (
      <div className={styles.movieContainer}>
        {movies.Search.map((movie) => 
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