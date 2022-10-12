import React, { useEffect } from 'react';
import Navbar from '../../../components/layout/Navbar/Navbar';
import Footer from '../../../components/layout/Footer/Footer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './loginUserSlice';
import styles from './RegisterForm.module.css'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';


function RegisterForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit =(e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userAuth) => {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: name,
        }))
    })
    .catch((error) => {
      console.log('User not registered', error);
    })
  }
  
  useEffect(()=>{
    document.title = 'Register';
  },[])
  
  return (
      <>
        <div className='container'>
          <div className={styles.loginFormWrapper}>
            <form className={styles.loginForm} onSubmit={(e)=>handleSubmit(e)}>
              <input className={styles.input} type='email' onChange={(e)=>setEmail(e.target.value)} />
              <label className={styles.label} htmlFor="email">Email</label>
              <input className={styles.input} type='password' onChange={(e)=>setPassword(e.target.value)} />
              <label className={styles.label} htmlFor="password">Password</label>
              <hr className={styles.decorationLine}/>
              <button type='button' className={`${styles.button} ${styles.loginButton}`} >Register Your Account</button>
            </form>
          </div>
        </div>
      </>
  )
}

export default RegisterForm