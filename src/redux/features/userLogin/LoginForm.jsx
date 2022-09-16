import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './loginUserSlice';
import styles from './LoginForm.module.css';


function LoginForm() {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({
      email: email,
      password: password,
      loggedIn: true,
    }))
  }


  return (
    <div className={styles.loginFormWrapper}>
      <form className={styles.loginForm} onSubmit={(e)=>handleSubmit(e)}>
        <input type='text' placeholder='e-mail' onChange={(e)=>setEmail(e.target.value)} />
        <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit' >Log In To Movies App</button>
      </form>
    </div>
  )
}

export default LoginForm