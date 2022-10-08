import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './loginUserSlice';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '../../../firebase';
import {FcGoogle} from 'react-icons/fc'


function LoginForm() {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  useEffect(()=>{
    document.title = 'Login';
  },[])

  const googleProvider = new GoogleAuthProvider();


  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
          dispatch(login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName
          }))  
          navigate('/')
      })
      .catch((err)=>{
        alert(err)
      })
  }

  const handleGoogleLogin = ()=> {
    signInWithPopup(auth, googleProvider)
      .then((userAuth)=> {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          photoUrl: userAuth.user.photoURL,
        }))
        navigate('/')
      }) .catch ((err)=>{
        const errorCode = err.code;
        const errorMessage=err.message;
        const email = err.customData?.email;
        const credential = googleProvider.credentialFromError(err);
        console.log(errorCode, errorMessage, email, credential);
      })
  }

  const routeChange = () => {
    navigate('/register');
  }


  return (
    <div className='container'>
      <div className={styles.flexBox}>
        <div className={styles.loginFormWrapper}>
          <h2>Hello Again!</h2>
          <form className={styles.loginForm} onSubmit={(e)=>handleLogin(e)}>
            <input className={styles.input} type='email' onChange={(e)=>setEmail(e.target.value)} />
            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} type='password' onChange={(e)=>setPassword(e.target.value)} />
            <label className={styles.label} htmlFor="password">Password</label>
            <button type='submit' className={`${styles.button} ${styles.loginButton}`} >Log In To Movies App</button>
            <span className={styles.btnSpan}>or</span>
            <hr className={styles.decorationLine}/>
            <button type='button' className={`${styles.button} ${styles.loginButton}`} onClick={handleGoogleLogin} ><FcGoogle className={styles.icon}/> Sign in with Google</button>
            <span className={styles.btnSpan}>If you don't have an account</span>
            <hr className={styles.decorationLine}/>
            <button type='button' className={`${styles.button} ${styles.registerButton}`} onClick={routeChange} >Register Here</button>
          </form>
        </div>        
      

        <div className={styles.rightSideForm}>
          <img src="https://preview.redd.it/yg9wd8fj9yp41.jpg?auto=webp&s=865e4dc3c5ddc992b03963ace1fe261d9b22a96a"/>
        </div>
      </div>
    </div>

  )
}

export default LoginForm