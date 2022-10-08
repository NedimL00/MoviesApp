import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { SiThemoviedatabase } from 'react-icons/si';
import { BiSun, BiMoon } from 'react-icons/bi';
import { FaBars, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../../redux/features/userLogin/loginUserSlice';
import { auth } from '../../../firebase';
import { useEffect } from 'react';

function Navbar() {

  const [clicked, setClicked] = useState(false);
  const [dark, setDark] = useState(false);
  const [style, setStyle] = useState();
  const [sidebarStyle, setSidebarStyle] = useState();


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

  useEffect(()=>{
    if(!clicked) {
      setSidebarStyle({display:"none"});
      document.body.style.overflow = 'unset';
    }
    else {
      setSidebarStyle();
      document.body.style.overflow = 'hidden';
    }
  },[clicked])




  if (user) {
    return (
      <header style={style} className={`${styles.navbar}`}>
        <div className={styles.navbarLogo}><Link to='/'><SiThemoviedatabase className={styles.navbarLogoIcon}/></Link></div>
          
          <div className={styles.iconsHolder}>
            <span className={`${styles.mainIcon}`}>{dark ? <BiSun className={styles.themeIcon} onClick={handleTheme} /> : <BiMoon className={styles.themeIcon} onClick={handleTheme} />}</span>
            <span className={`${styles.mainIcon}`} onClick={()=>setClicked(!clicked)}><FaBars/></span>
          </div>


        <div style={sidebarStyle} className={styles.linksSidebar}>
          <FaWindowClose onClick={()=>setClicked(!clicked)} className={styles.closeSidebarIcon} />
          <span onClick={()=>setClicked(!clicked)} className={styles.linkItem}><Link to="/" >Home</Link></span>
          <span onClick={()=>setClicked(!clicked)}  className={styles.linkItem}><Link to="/about" >About</Link></span>
          <span onClick={()=>setClicked(!clicked)} className={styles.linkItem}><Link to="/dashboard">My Profile</Link></span>
          <span onClick={()=>{setClicked(!clicked); handleLogout()}} className={styles.linkItem}><Link to="/dashboard">Sign Out</Link></span>
        </div>

      </header>
    )
  } else {
    return (
      <header className={styles.navbar}>
        <div className={styles.navbarLogo}><Link to='/'><SiThemoviedatabase className={styles.navbarLogoIcon}/></Link></div>

        <div className={styles.iconsHolder}>
            <span className={`${styles.mainIcon}`}>{dark ? <BiSun className={styles.themeIcon} onClick={handleTheme} /> : <BiMoon className={styles.themeIcon} onClick={handleTheme} />}</span>
            <span className={`${styles.mainIcon}`} onClick={()=>setClicked(!clicked)}><FaBars/></span>
          </div>

        <div style={sidebarStyle} className={styles.linksSidebar}>
          <span onClick={()=>setClicked(!clicked)} className={styles.linkItem}><Link to="/" >Home</Link></span>
          <span onClick={()=>setClicked(!clicked)} className={styles.linkItem}><Link to="/about" >About</Link></span>
          <span onClick={()=>setClicked(!clicked)} className={styles.linkItem}><Link to="/login" >Sign In</Link></span>
        </div>
      </header>
    )
  }

}

export default Navbar