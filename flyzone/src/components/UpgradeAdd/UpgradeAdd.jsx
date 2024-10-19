import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io"
import './UpgradeAdd.css'

const UpgradeAdd = () => {
  
  const navigate = useNavigate();
  const navigateToPaymentPage = () => {
    navigate('/paymentProgram');
  };

  return (
    <div className='add' 
         onClick={navigateToPaymentPage}>
        <h5 style={{marginBottom:"5px", marginTop:"5px", fontSize:"100%", color:"black"}}>Upgrade To</h5>
        <h3 style={{color:"white", fontWeight:"900", marginBottom:"5px", marginTop:"5px", fontSize: "200%"}}>PREMIUM</h3>
        <h6 style={{marginBottom:"10px", fontSize:"100%", color:"black"}}>And get</h6>
        <div className='arrow_bounce' style={{color:"black"}}><IoIosArrowDown /></div>  
        <h5 style={{marginBottom:"10px", fontSize:"150%", color:"white"}}>30% OFF</h5>
    </div>
  )
}

export default UpgradeAdd