import React from 'react'
import './UserSideData.css'
import Profile from '../../assets/Profile.png'


const UserSideData = (props) => {
  return (
    <div className='userSideData_profile '>
            <img src={Profile} className="userSideData_pic"/>
            <div className='userSideData_list'>
              <p>Name: {props.userName}</p>
              <p>Level: {props.level}</p>
              <p>Score: {props.score} </p>
            </div>
        </div>
  )
}

export default UserSideData