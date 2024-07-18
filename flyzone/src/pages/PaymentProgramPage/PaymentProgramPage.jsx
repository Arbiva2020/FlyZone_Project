import Input from '../../components/Generic/Input/Input'
import React from 'react'
import './PaymentProgramPage.css'
import { HiCheck } from "react-icons/hi"
import AuthHeader from '../../components/AuthHeader/AuthHeader'
import Button from '../../components/Generic/Button/Button'
import PaymentForm from './PaymentForm'
import Sidebar from "../../components/SideBar/SideBar"


const PaymentProgramPage = () => {
  return (
    <div className='payment_main'>
      <AuthHeader />
      <div className='payment_all'>
        <div className='payment_left'>
          <div className='payment_form'>
            <PaymentForm />
          </div>
        </div>
        <div className='payment_right'>
          <div className='payment_box'>
            <div className='program_headline'><h3>Basic Program</h3></div>
              <div className='detail_icon_text'>
                <HiCheck />
                <p className='detail_text'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, <br/>quis nostrud exercitation ullamco 
                  laboris nisi ut aliquip.
                </p>
              </div>
              <div className='detail_icon_text'>
                <HiCheck />
                <p className='detail_text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, <br/>quis nostrud exercitation ullamco 
                  laboris nisi ut aliquip.
                </p>
              </div>
          </div>

          {/* <div className='payment_box'>
            <div className='program_headline'><h3>Premium Program</h3></div>
              <div className='detail_icon_text'>
                <HiCheck />
                <p className='detail_text'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, <br/>quis nostrud exercitation ullamco 
                  laboris nisi ut aliquip.
                </p>
              </div>
              <div className='detail_icon_text'>
                <HiCheck />
                <p className='detail_text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, <br/>quis nostrud exercitation ullamco 
                  laboris nisi ut aliquip.
                </p>
              </div>
          </div> */}

        </div>
      </div>
        {/* <div className='leftSideElements'>
          <div className='personalDetails'>
            <h2 className='card_headline'>Personal information</h2>
            <div className='details_fullName'>
              <Input 
                name={"fullName"} 
                // value={loginObject.password}
                placeholder="Full Name"
                // setIsFormValid={setIsFormValid}
                // onBlur={(e) => handleChange(e.target.name, e.target.value)}
                // type={showPassword ? "text" : "password"}
                // onChange={(e) => handleChange(e.target.name, e.target.value)}
                // checkErrorsFunc={validateMinMax}
                // errorFuncParams={['Password', 6, 20]}
              />
            </div>
            <div className='details_mailAndPhone'>
              <Input />
              <Input />
            </div>
            <div className='details_adress'>
              <Input />
            </div>
          </div>
          <div className='cardDetails'>
            <h2 className='card_headline'>Card information</h2>
              <div className='details_cardNo'>
                <Input />
              </div>
              <div className='details_cvv_expire'>
                <Input />
                <Input />
              </div>
              <div className='details_secondAdress'>
                <Input />
              </div>
            </div>
          <Button 
            text={"Done"}
            isLightStyle
            // onClick={}
            // isDisabled={}
            to="/"
          />
        </div>
        <div className='rightSideElements'>
          <div className='detail_box'>
            <div className='program_headline'>Basic Program</div>
            <div className='detail_icon_text'>
              <HiCheck />
              <p className='detail_text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do eiusmod 
                tempor incididunt ut labore<br/> et dolore magna aliqua. 
                Ut enim ad minim veniam, <br/>quis nostrud exercitation ullamco 
                laboris nisi ut aliquip<br/> ex ea commodo consequat.
              </p>
            </div>
            <div className='detail_icon_text'>
              <HiCheck />
              <p className='detail_text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do eiusmod 
                tempor incididunt ut labore<br/> et dolore magna aliqua. 
                Ut enim ad minim veniam, <br/>quis nostrud exercitation ullamco 
                laboris nisi ut aliquip<br/> ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div> */}
    </div>
  )
}

export default PaymentProgramPage