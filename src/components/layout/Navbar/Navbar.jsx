import React from 'react';
import styles from './Navbar.module.css';
import { SiThemoviedatabase } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInInfo, logout } from '../../../redux/features/userLogin/loginUserSlice';

function Navbar() {

  const loggedIn = useSelector(getLoggedInInfo);
  const dispatch = useDispatch();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}><SiThemoviedatabase className={styles.navbarLogoIcon}/></div>
      <ul className={styles.navbarLinks} >
        <Link to="/" ><li>Home</li></Link>
        <Link to="/about" ><li>About</li></Link>
        <Link to="/login" ><li>Login</li></Link>
      </ul>
    </div>
  )
}

export default Navbar