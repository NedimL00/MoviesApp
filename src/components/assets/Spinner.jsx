import React from 'react';
import spinner from './Spinner.svg'

function Spinner() {
  return (
    <div className='container spinnerContainer'>
      <img src={spinner} alt="Spinner" />
    </div>
  )
}

export default Spinner