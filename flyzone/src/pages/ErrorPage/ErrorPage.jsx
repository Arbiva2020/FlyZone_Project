import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className='errorPage'>
      <h2 className='error_headline'>Error</h2>
      <p className='error_text'>404 - Page not found</p>
      <Link className='redirecting' onClick={goBack}>Back</Link>
    </div>
  )
}

export default ErrorPage