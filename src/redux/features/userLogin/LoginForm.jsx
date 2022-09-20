import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './loginUserSlice';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { async } from '@firebase/util';


function LoginForm() {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  useEffect(()=>{
    document.title = 'Login';
  },[])


  const handleLogin = async(e) => {

    

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
          <hr/>
          <button type='button' className={styles.registerButton} onClick={routeChange} >Register Here</button>
        </form>
      </div>
    </div>

  )
}

export default LoginForm