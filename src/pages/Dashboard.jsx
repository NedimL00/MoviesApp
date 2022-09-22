import React from 'react'
import Navbar from '../components/layout/Navbar/Navbar'
import Footer from '../components/layout/Footer/Footer'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/features/userLogin/loginUserSlice'
import styles from './Dashboard.module.css'
import { useEffect } from 'react'
import { auth } from '../firebase'

function Dashboard() {


  const user = useSelector(selectUser);
  console.log(user);

  useEffect(()=>{
    if(user) {
      document.title = `${user.displayName}'s Profile`;
    } else {
      document.title = 'Loading';
    }
  }, [user])

  if(user !== null) {
    return (
      <>
        <Navbar />
          <div className='container'>
            <div className={styles.profilePage}>
                <img src='https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'/>
                <h2>{user.displayName}</h2>
            </div>
          </div>
        <Footer />
      </>
  
    )
  } else{
    return <h1>Loading</h1>
  }

}

export default Dashboard