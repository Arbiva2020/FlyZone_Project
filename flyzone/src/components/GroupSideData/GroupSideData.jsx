import React from 'react'
import Button from '../Generic/Button/Button'
import './GroupSideData.css'


const GroupSideData = () => {

  const handleGroupFocus = (id) =>{
    //  navigate(`/user/${id}`)
    console.log(`test assigned to /allStats/${id}`)
  }

  return (
    <div className='groupSideData_profile '>
            <div className='groupSideData_list'>
              <p>id from BD</p>
              <p>Avg. level from BD</p>
              <p>Avg. score from BD</p>
              <p>no. of participants from BD</p>
              <p>Avg. score from BD</p>
            </div>
            {/* <div className='groupSideData_button'>
              <Button 
                customStyles={{marginTop: "10px", marginBottom:"10px"}}
                text="watch group"
                to="/allStats"
                onClick = {handleGroupFocus}  
              />
            </div> */}
        </div>
  )
}

export default GroupSideData