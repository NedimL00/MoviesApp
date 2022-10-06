import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { clearMovieState, fetchMovieInfo, selectMovieByID } from '../../../redux/features/fetchMovieInfo/fetchMovieInfoSlice';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import styles from './MovieInfo.module.css';

function MovieInfo() {

  const {movieID} = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(selectMovieByID);

  useEffect(()=>{
    dispatch(clearMovieState())
    window.scrollTo(0, 0);
    dispatch(fetchMovieInfo(movieID));
  },[movieID])

  return (
    <>
    <Navbar/>
    <div className={'container'}>
      { movie && (
        <div className={styles.moviePage}>
            <div className={styles.info}>
              <img className={styles.moviePoster} src={movie?.Poster} />
                <div className={styles.rightSide}>
                  <div className={styles.heading}>
                    <h1>{movie.Title}</h1>
                    <h2>Released: {movie.Released}</h2>
                    <h2>Actors: {movie.Actors}</h2>
                    <p>Runtime: {movie.Runtime}</p>
                  </div>
                  <div className={styles.plot} >
                    <p>Plot: {movie.Plot}</p> 
                  </div>
                  <div className={styles.other}>
                    <h2 className={styles.grossIncome}>Gross income: {movie.BoxOffice}</h2>
                    <p>Genre: {movie.Genre}</p>  
                  </div>
                
                 
                  <div className={styles.Ratings}>
                    {movie.Ratings?.map((rating, count)=>{
                      count++;
                      return <h1 key={count}>{rating.Value}</h1>
                    })}
                  </div>                
              </div>
              
            </div>
          
        </div>
      
)}
</div>
      <Footer/>
    </>

  )
}



export default MovieInfo