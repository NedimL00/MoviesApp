import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../redux/features/userLogin/loginUserSlice'
import styles from './Dashboard.module.css'
import {FaHome} from 'react-icons/fa'
import {GrGroup, GrUserSettings} from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import Spinner from '../components/assets/Spinner'

function Dashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(selectUser);
  console.log(user);

  useEffect(()=>{
    if(user) {
      document.title = `${user.displayName.split(' ')[0]}'s Profile`;
    } else {
      document.title = 'Loading';
    }
  }, [user])

  const handleLogout = ()=> {
    dispatch(logout());
    auth.signOut()
    navigate('/');
  }

  if(user !== null) {
    return (
      <>
          <div className='container'>
            <div className={styles.dashboard}>
              <div className={styles.leftSide}>
                <h3>My Profile</h3>
                  <div className={styles.leftProfile}>
                    <img src={user?.photoUrl} />
                    <span>{user?.displayName}</span>
                  </div>
                  <div className={styles.leftSideLinks}>
                  <ul>
                    <li><FaHome className={`${styles.dashboardIcons} ${styles.listIcons}`}/>Dashboard</li>
                    <li><GrGroup className={`${styles.dashboardIcons} ${styles.listIcons}`} />Friends</li>
                    <li><GrUserSettings className={`${styles.dashboardIcons} ${styles.listIcons}`} />Settings</li>
                  </ul>
                  </div>
                  <span className={styles.logout} onClick={handleLogout}>Logout</span>
                </div>


              <div className={styles.rightSide}>

                  <div className={styles.likedMovies}>
                    <h3>LIKED MOVIES</h3>
                    <div className={styles.likedMoviesFrame}>
                      <div className={styles.likedMovieCard}>
                        <h5>Harry Potter</h5>
                        <span>Rating: 8.5/10</span>
                      </div>
                      <div className={styles.likedMovieCard}></div>
                      <div className={styles.likedMovieCard}></div>
                      <div className={styles.likedMovieCard}></div>
                      <div className={styles.likedMovieCard}></div>
                      <div className={styles.likedMovieCard}></div>
                      <div className={styles.likedMovieCard}></div>
                      <div className={styles.likedMovieCard}></div>
                      <div className={styles.likedMovieCard}></div>
                      <div className={styles.likedMovieCard}></div>
                    </div>

                    
                  </div>

                  <div className={styles.watchLater}>
                    <h3>MOVIES TO WATCH LATER</h3>

                  </div>


                  <div className={styles.engagementCard}>
                    <h3>PROFILE ACTIVITY</h3>

                  </div>

              </div>
            </div>
          </div>
      </>
  
    )
  } else{
      return <Spinner />

}
}

export default Dashboard