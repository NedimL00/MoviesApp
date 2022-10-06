import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../../../redux/features/fetchMovies/fetchMoviesSlice';
import styles from './Search.module.css'

function Search() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function handleSearch(e) {
    if(text.trim() === '') {
      e.preventDefault()
      return window.alert('Please enter a movie title')
    } else {
        e.preventDefault();
        dispatch(fetchMovies(text))
        setText('')
    }

  }

  return (
    <div className={styles.searchBox}>
      <form id='searchForm' className={styles.searchForm} onSubmit={(e)=>handleSearch(e)}>
        <input value={text} type='text' placeholder='Enter movie title to search' onChange={(e)=>setText(e.target.value)} />
        <button>Search</button>
      </form>      
    </div>

  )
}

export default Search