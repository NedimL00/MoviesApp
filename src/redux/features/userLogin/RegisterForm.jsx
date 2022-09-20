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
      updateProfile(userAuth.user, {
        displayName: name,
      })
      .then (
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: name,
        }))) 
    })
    .catch((error) => {
      console.log('User not registered');
    })
  }
  
  useEffect(()=>{
    document.title = 'Register';
  },[])
  
  return (
      <>
        <Navbar />
        <div className='container'>
          <div className={styles.registerFormWrapper}>
            <form className={styles.registerForm} onSubmit={(e)=>handleSubmit(e)}>
              <input type='text' placeholder='name' onChange={(e)=>setName(e.target.value)} />
              <input type='text' placeholder='e-mail' onChange={(e)=>setEmail(e.target.value)} />
              <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
              <button className={styles.registerButton} type='submit' >Create an account</button>
            </form>
          </div>
        </div>
        <Footer />
      </>
  )
}

export default RegisterForm