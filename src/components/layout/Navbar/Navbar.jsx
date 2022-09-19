import React from 'react';
import styles from './Navbar.module.css';
import { SiThemoviedatabase } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../../redux/features/userLogin/loginUserSlice';

function Navbar() {

  const user = useSelector(selectUser);

  if (user) {
    return (
      <div className={styles.navbar}>
        <div className={styles.navbarLogo}><Link to='/'><SiThemoviedatabase className={styles.navbarLogoIcon}/></Link></div>
        <ul className={styles.navbarLinks} >
          <Link to="/" ><li>Home</li></Link>
          <Link to="/" ><li>About</li></Link>
          <li>
            <ul>
            <li>{user.displayName}</li>
            <li>Dashboard</li>
            <li>Logout</li>
            </ul>
          </li>
        </ul>
      </div>
    )
  } else {
    return (
      <div className={styles.navbar}>
        <div className={styles.navbarLogo}><Link to='/'><SiThemoviedatabase className={styles.navbarLogoIcon}/></Link></div>
        <ul className={styles.navbarLinks} >
          <Link to="/" ><li>Home</li></Link>
          <Link to="/" ><li>About</li></Link>
          <Link to="/login" ><li>Login</li></Link>
        </ul>
      </div>
    )
  }

}

export default Navbar