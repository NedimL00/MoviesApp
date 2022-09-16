import React from 'react'
import LoginForm from '../redux/features/userLogin/LoginForm';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';

function Login() {
  return (
    <>
    <Navbar />
    <LoginForm/>
    <Footer/>
    </>
    )
}

export default Login