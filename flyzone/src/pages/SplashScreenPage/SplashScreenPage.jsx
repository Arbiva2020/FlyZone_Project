import React, { useState } from 'react'
import './SplashScreenPage.css'
import HomePage from '../HomePage/HomePage';

const SplashScreenPage = () => {
  const [isLoading, setIsLoading] = useState(true);

const handleLoading = () => {
  setIsLoading(false)
}

useEffect(()=> {
  window.addEventListener("load", handleLoading);
  return () => window.removeEventListener("load", handleLoading);
}, [])

  return (
    isLoading ? <div className='splash_main'>
      {/* <div className='circle_1'></div> */}
      <div className='splash_div'>
        <h1 className='main_headline_splash'>FlyZone</h1>
        <h5 className='loading'>Loading...</h5>
      </div>
    </div> : <HomePage />
    
  )
}

export default SplashScreenPage