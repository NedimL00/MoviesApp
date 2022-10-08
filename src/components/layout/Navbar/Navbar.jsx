import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { SiThemoviedatabase } from 'react-icons/si';
import { IoMdArrowDropleft, IoMdArrowDropdown } from 'react-icons/io';
import { BiSun, BiMoon } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../../redux/features/userLogin/loginUserSlice';
import { auth } from '../../../firebase';
import { useEffect } from 'react';

function Navbar() {

  const [dark, setDark] = useState(false);
  const [style, setStyle] = useState();


  const dispatch = useDispatch();
  const user = useSelector(selectUser);


  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
  }
  const handleScroll = () => {
    if(window.scrollY > 20) {
      setStyle({backgroundColor:"var(--bg-color)"});
    } else {
      setStyle()
    }
  }
  
  useEffect(()=>{
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark(true);
    }

    window.addEventListener('scroll', handleScroll);
    return ()=> {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  const handleTheme = ()=>{
    document.body.classList.toggle("dark-mode");
    setDark(!dark);
  } 

  const scrollToSearch = ()=>{
    document.getElementById("searchForm").scrollIntoView({block: "start", inline: "nearest"});
  }


  if (user) {
    return (
      <header style={style} className={`${styles.navbar}`}>
        <div className={styles.navbarLogo}><Link to='/'><SiThemoviedatabase className={styles.navbarLogoIcon}/></Link></div>
          
          <div className={styles.iconsHolder}>
            <span className={`${styles.mainIcon}`}>{dark ? <BiSun className={styles.themeIcon} onClick={handleTheme} /> : <BiMoon className={styles.themeIcon} onClick={handleTheme} />}</span>
            <span className={`${styles.mainIcon}`} ><FaBars/></span>
          </div>


        <div className={styles.linksSidebar}>
          <span className={styles.linkItem}><Link to="/" >Home</Link></span>
          <span className={styles.linkItem}><Link to="/about" >About</Link></span>
          <span className={styles.linkItem}><Link to="/dashboard">My Profile</Link></span>
          <span className={styles.linkItem} onClick={handleLogout}><Link to="/dashboard">Sign Out</Link></span>
        </div>

      </header>
    )
  } else {
    return (
      <header className={styles.navbar}>
        <div className={styles.navbarLogo}><Link to='/'><SiThemoviedatabase className={styles.navbarLogoIcon}/></Link></div>
        <div className={styles.linksSidebar}>
          <span className={styles.linkItem}><Link to="/" >Home</Link></span>
          <span className={styles.linkItem}><Link to="/about" >About</Link></span>
          <span className={styles.linkItem}><Link to="/login" >Sign In</Link></span>
        </div>
      </header>
    )
  }

}

export default Navbar