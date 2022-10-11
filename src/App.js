import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterForm from './redux/features/userLogin/RegisterForm';
import './App.css';
import { useEffect } from 'react';
import { auth, onAuthStateChanged } from './firebase';
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/features/userLogin/loginUserSlice'
import Dashboard from './pages/Dashboard';
import MovieInfo from './components/layout/MovieInfo/MovieInfo';
import Navbar from './components/layout/Navbar/Navbar';

function App() {
  

  const dispatch = useDispatch();

  useEffect(()=> {
    function detectColorScheme(){
      if(!window.matchMedia) {
        return false;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.add("dark-mode");
      }

    }

    detectColorScheme();
  },[])


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
    <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/movie/:movieID' element={<MovieInfo />} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;
