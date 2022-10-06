import React, { useEffect } from 'react';
import Movies from '../redux/features/fetchMovies/Movies';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import { Link } from 'react-router-dom';
import Search from '../components/layout/Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/features/userLogin/loginUserSlice'
import { fetchMovieInfo, selectMovieByID } from '../redux/features/fetchMovieInfo/fetchMovieInfoSlice';
import {AiFillPlayCircle} from 'react-icons/ai';
import {FaImdb} from 'react-icons/fa';

function Home() {

  const dispatch = useDispatch(fetchMovieInfo);
  const movie = useSelector(selectMovieByID);
  const user = useSelector(selectUser);
  const movieID = 'tt0816692'

  useEffect(()=>{
    document.title = 'Home';
    dispatch(fetchMovieInfo(movieID));
  },[])
  console.log(movie);

  

    return (
      <>
      <div className='container'>
        <div className='frontPageMoviePoster'>
          <div className='frontPageMovieData'>
            <p className='frontPageRating'>{movie.imdbRating}/10 <FaImdb className='ratingIcon'/></p>
            <h1 className='frontPageTitle'>{movie.Title}</h1>
            <p className='frontPageGenre'>{movie.Genre}</p>
            <a className='netflixBtn' target="_blank" href="https://www.netflix.com/ba/title/70305903"><AiFillPlayCircle className='playIcon' />Watch Now</a>
            <p className='frontPagePlot'>{movie.Plot}</p>
          </div>
        </div>
        {!user && 
          <div className='notLoggedIn'>
            <p>Please <span><Link className='loginLinkHome' to="/login">Log in</Link></span> to search movie database</p>
          </div>
        }

        {user && <Search/>}
        <Movies/>
      </div>
      <Footer/>
      </>
    ) 

}

export default Home