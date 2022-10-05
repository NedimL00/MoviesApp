import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { SiThemoviedatabase } from 'react-icons/si';
import { IoMdArrowDropleft, IoMdArrowDropdown } from 'react-icons/io';
import { BiSun, BiMoon } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../../redux/features/userLogin/loginUserSlice';
import { auth } from '../../../firebase';
import { useEffect } from 'react';

function Navbar() {

  const [clicked, setClicked] = useState(true);
  const [dark, setDark] = useState(false);


  const dispatch = useDispatch();
  const user = useSelector(selectUser);


  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
  }
  
  useEffect(()=>{
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark(true);
    }
  },[])





  const handleTheme = ()=>{
    document.body.classList.toggle("dark-mode");
    setDark(!dark);
  } 


  if (user) {
    return (
      <header className={styles.navbar}>
        <div className={styles.navbarLogo}><Link to='/'><SiThemoviedatabase className={styles.navbarLogoIcon}/></Link></div>
        <ul className={styles.navbarLinks} >

          <li>{dark ? <BiSun className={styles.themeIcon} onClick={handleTheme} /> : <BiMoon className={styles.themeIcon} onClick={handleTheme} />}</li>
          <Link to="/" ><li>Home</li></Link>
          <Link to="/" ><li>About</li></Link>
          <li onClick={()=>setClicked(!clicked)}>
            {user.displayName}
            {clicked ? <IoMdArrowDropleft/> : <IoMdArrowDropdown/> }
          </li>
          <ul className={!clicked ? styles.accountNameDropdown : styles.accountNameDropdownHidden } >
              <Link to='/dashboard'><li>Dashboard</li></Link>
              <li onClick={handleLogout}>Logout</li>
          </ul>

        </ul>
      </header>
    )
  } else {
    return (
      <header className={styles.navbar}>
        <div className={styles.navbarLogo}><Link to='/'><SiThemoviedatabase className={styles.navbarLogoIcon}/></Link></div>
        <ul className={styles.navbarLinks} >
          <Link to="/" ><li>Home</li></Link>
          <Link to="/" ><li>About</li></Link>
          <Link to="/login" ><li>Login</li></Link>
        </ul>
      </header>
    )
  }

}

export default Navbar