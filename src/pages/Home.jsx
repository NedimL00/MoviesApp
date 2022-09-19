import React, { useEffect } from 'react';
import Movies from '../redux/features/fetchMovies/Movies';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import { Link } from 'react-router-dom';
import Search from '../components/layout/Search/Search';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/userLogin/loginUserSlice'

function Home() {

  const user = useSelector(selectUser);
  console.log(user)

  useEffect(()=>{
    document.title = 'Home'
  },[])

  if(user) {
    return (
      <>
      <Navbar />
      <div className='container'>
        <Search/>
        <Movies/>
      </div>
      <Footer/>
      </>
    )
  } else {
    return (
      <>
      <Navbar />
      <div className='notLoggedIn'>
        <p>Please <span><Link className='loginLinkHome' to="/login">Log in</Link></span> to search movie database</p>
      </div>
      <Footer/>
      </>
    )
  }

}

export default Home