import React from 'react'
import Input from '../../components/Generic/Input/Input'
import { redirect, Navigate, useNavigate } from 'react-router-dom'
import Button from '../../components/Generic/Button/Button'
import Header from '../../components/Header/Header'
import './SubscriptionPage.css'

const SubscriptionPage = ({title}) => {
  const navigate = useNavigate();
const onNavigation = async() => {
   navigate("/paymentProgram")
}

  return (
    <div className='subscription_main'>
      <Header />
      <h1 className='main_subscription_headline'>Subscriptions & Pricing</h1>
      <div className='subscription_plans'>
        <div className='basic_plan'>
          <div className='basic_frame'>
            <h2 className='headline'>BASIC</h2>
            <div className='details_container'>
              <h5 className='details_item'>3 Scenarios</h5>
              <h5 className='details_item'>2 levels</h5>
              <h5 className='details_item'>Automated repord</h5>
              <h5 className='details_item'>detailed statistics:</h5>
              <h5 className='details_item'></h5>
              <h6 className='details_item'>Per user</h6>
              <h6 className='details_item'>Per class</h6>
            </div>
            <h2 className='price'>ONLY 50$</h2>
          </div>
          <Button 
            // customStyles={{width:"200%"}}
            text={"Subscribe"}
            isLightStyle
            onClick={onNavigation}
            title= "basicButton"
          />
        </div>
        <div className='premium_plan'>
          <div className='premium_frame'>
          <h2 className='headline'>PREMIUM</h2>
          <div className='details_container'>
            <h5 className='details_item'>Access to all scenarios</h5>
            <h5 className='details_item'>Access to all levels</h5>
            <h5 className='details_item'>Automated repord</h5>
            <h5 className='details_item'>Full dashboard</h5>
            <h5 className='details_item'>detailed statistics:</h5>
            <h6 className='details_item'>Per user</h6>
            <h6 className='details_item'>Per class</h6>
            <h2 className='price'>ONLY 100$</h2>
            </div>
          </div>
          <Button 
            text={"Subscribe"}
            isLightStyle
            onClick={''}
            title= "premiumButton"
          />
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage