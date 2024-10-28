import React from 'react'
import './UserSideData.css'
import Profile from '../../assets/Profile.png'


const UserSideData = (props) => {
  return (
    <div className='userSideData_profile '>
            <img src={Profile} className="userSideData_pic"/>
            <div className='userSideData_list'>
              <p>Name: Netta Glory</p>
              <p>Scenario: Checkpoints</p>
              <p>Level: D</p>
              <p>Score: 75% </p>
            </div>
        </div>
  )
}

export default UserSideData