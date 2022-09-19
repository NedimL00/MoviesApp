import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import RegisterForm from './redux/features/userLogin/RegisterForm';
import './App.css';
import { useEffect } from 'react';
import { auth, onAuthStateChanged } from './firebase';
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/features/userLogin/loginUserSlice'

function App() {
  

  const dispatch = useDispatch();



  useEffect(()=> {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
        }))
      }
      else {
        dispatch(logout())
      }
    })
  }, [])


  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
