import React from 'react';
import Movies from '../redux/features/fetchMovies/Movies';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import { useSelector } from 'react-redux';
import { getLoggedInInfo } from '../redux/features/userLogin/loginUserSlice';

function Home() {

  const loggedIn = useSelector(getLoggedInInfo)
  console.log(loggedIn)
  if(loggedIn) {
    return (
      <>
      <Navbar />
        <Movies/>
      <Footer/>
      </>
    )
  } else {
    return (
      <>
      <Navbar />
      <div>Please Log in to search movie database</div>
      <Footer/>
      </>
    )
  }

}

export default Home