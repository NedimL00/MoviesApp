import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './loginUserSlice';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '../../../firebase';


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
          displayName: userAuth.user.displayName
        }))
      }) .catch ((err)=>{
        const errorCode = err.code;
        const errorMessage=err.message;
        const email = err.customData?.email;
        const credential = googleProvider.credentialFromError(err);
      })
  }

  const routeChange = () => {
    navigate('/register');
  }


  return (
    <div className='container'>
      <div className={styles.loginFormWrapper}>
        <form className={styles.loginForm} onSubmit={(e)=>handleLogin(e)}>
          <input type='text' placeholder='e-mail' onChange={(e)=>setEmail(e.target.value)} />
          <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
          <button type='submit' className={styles.loginButton} >Log In To Movies App</button>
          <button type='button' className={styles.loginButton} onClick={handleGoogleLogin} >Or sign in with google</button>
          <hr/>
          <button type='button' className={styles.registerButton} onClick={routeChange} >Register Here</button>
        </form>
      </div>
    </div>

  )
}

export default LoginForm