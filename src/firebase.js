import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBG6sxV7no6FOs_TalMNl9pi1gUl8EKn9Y",
  authDomain: "movie-app-project-e0778.firebaseapp.com",
  projectId: "movie-app-project-e0778",
  storageBucket: "movie-app-project-e0778.appspot.com",
  messagingSenderId: "396624478685",
  appId: "1:396624478685:web:d67bb1e62dc08d5d607634",
  measurementId: "G-5FWB2KS899"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
  }