import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Movie.module.css'

function Movie({movie}) {
  
  return (
    <Link to={`/movie/${movie.imdbID}`} className={styles.movieLink}>
      <div className={styles.movieBox}>
        <img src={movie.Poster} />
        <div className={styles.movieInfo}>
          <p className={styles.movieTitle}>{movie.Title}</p>
        </div>
      </div>
    </Link>

  )
}

export default Movie