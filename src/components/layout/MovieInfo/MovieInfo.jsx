import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchMovieInfo } from '../../../redux/features/fetchMovieInfo/fetchMovieInfoSlice';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import styles from './MovieInfo.module.css'

function MovieInfo() {

  const {movieID} = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(selectMovieByID);
  console.log(movie)


  useEffect(()=>{
    window.scrollTo(0, 0);
    dispatch(fetchMovieInfo(movieID));
  },[movieID])

  return (
    <>
      <Navbar/>
      <div className='container'>
        <div className={styles.moviePage}>
            <div className={styles.info}>
              <img className={styles.moviePoster} src={movie.Poster} />
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
                {movie.Ratings.map((rating)=>{
                return (
                <h2>
                  {rating.Source}: {rating.Value}
                </h2>
                )
                })}
              </div>                
              </div>
              
            </div>
          
        </div>
      </div>
      <Footer/>
    </>

  )
}

export const selectMovieByID = (state) => state.fetchMovieInfo.movie;

export default MovieInfo