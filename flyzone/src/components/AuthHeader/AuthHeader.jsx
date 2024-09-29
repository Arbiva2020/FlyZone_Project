import React, { useContext } from 'react'
import "./AuthHeader.css"
import { Link } from 'react-router-dom'
import { FaRegSun } from "react-icons/fa"
import Logo1 from '../../assets/Logo1.png'
import Profile from '../../assets/Profile.png'
import { useSelector } from 'react-redux'
import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import Input from "../../components/Generic/Input/Input";

const AuthHeader = () => {
  const loggedUser = useSelector(state=>state.auth.loggedUser)
  return (
    <div className='auth_header'>
      <div className='auth_logo_div'>
        <Link to="/ ">
          <img src={Logo1} className="authHeader_logo" alt="logo"/>
        </Link>
        <h3 className='authHeader_title'>Hello {loggedUser.userName ? loggedUser.userName : 'Anonymous' }</h3>
      </div>
      <div className='authHeader_menu'>
        <div className="authHeader_searchInput">
          <Input
            style={{color: "white"}}
            name="Search"
            // value={filterInput}
            placeholder="Search"
            // onChange={handleFilterChange}
            customStyles={{ width: "300px", backgroundColor: "transparent", borderStyle:"solid", borderWidth:"1px" }}
          />
            <i 
              className="authHeader_icon" 
              // onClick={handleFilterChange}
            >
            <FaSearch 
              style={{color:"white"}}
            />
            </i>
        </div>
        <Link className='authHeader_link' >Logout</Link>
        <Link className='authHeader_link'>Help</Link>
        <Link className='authHeader_link' style={{marginTop:"4px"}} to="/ " ><FaRegBell /></Link>
        <Link className='authHeader_link' style={{marginTop:"4px"}} to="/ " ><FaRegSun /></Link>
        <Link className='authHeader_link' to="/createProfile">
            <img src={Profile} className="authHeader_userImage" alt="logo"/>
        </Link>
      </div>
      
    </div>
  )
}

export default AuthHeader