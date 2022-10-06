import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Movie.module.css'

function Movie({movie}) {


  return (
    <Link to={`/movie/${movie.imdbID}`} className={styles.movieLink}>
      <div className={styles.movieBox}>
        <img src={movie.Poster} />
        <div className={styles.movieInfo}>
          <h3 className={styles.movieTitle} title={movie.Title}>{movie.Title}</h3>
          <span></span>
        </div>
      </div>
    </Link>

  )
}

export default Movie