import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { FaRegSun } from "react-icons/fa"
import Logo1 from '../../assets/Logo1.png'

const Header = () => {
  return (
    <div className='header'>
      <div className='logo_div'>
        <Link to="/ "><img src={Logo1} className="header_logo" alt="logo" /></Link>
      </div>
      <div className='menu'>
        <Link className='header_link' to="/about">About</Link>
        <Link className='header_link' to="/subscribe">Pricing</Link>
        <Link className='header_link' to="/contact">Contact</Link>
        <Link className='header_link' to="/demo">Demo</Link>
        <Link className='header_link'>Help</Link>
        <Link className='header_link' to="/ "><FaRegSun /></Link>
      </div>
      
    </div>
  )
}

export default Header