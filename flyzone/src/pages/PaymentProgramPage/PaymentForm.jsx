import React from 'react'
import "./PaymentForm.css"
import Button from '../../components/Generic/Button/Button'

const PaymentForm = () => {
  return (
    <div className='paymentForm_main'>
      <div className='paymentForm_up'>
        <div className='paymentForm_headline'>Personal information</div>
        <div className='paymentForm_form'></div>
      </div>
      <div className='paymentForm_bottom'>
        <div className='paymentForm_headline'>Card information</div>
        <div className='paymentForm_form'></div>
      </div>
      <div className='paymentForm_buttons'>
        <Button customStyles={{backgroundColor:"white", color:"black", width:"200px"}}
          text={"Finish Purchase"}
          isLightStyle
          // onClick={}
          // isDisabled={}
          to="/"
        />
      </div>
    </div>
  )
}

export default PaymentForm