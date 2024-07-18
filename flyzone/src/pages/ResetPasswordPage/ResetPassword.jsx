import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Button from '../../components/Generic/Button/Button'
import Input from '../../components/Generic/Input/Input'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { resetDefaultState, resetDefaultValidState } from '../../constants/FormDeaults'
import { validatePassword, confirmPassword } from '../../validators/validators'
import './ResetPassword.css'

const ResetPasswordPage = () => {
  const [resetObject, setResetObject] = useState(resetDefaultState)
  const [errors,setErrors] = useState([]) 
  const [showPassword, setShowPassword] = useState(false)
  const [showEye, setShowEye] = useState(false)
  const [isFormValid,setIsFormValid] = useState(resetDefaultValidState)
  const [isFormDisabled, setIsFormDisabled] = useState(true)

  useEffect(()=>{
    for (const key in isFormValid){
      if(isFormValid[key] === false){
        if(!isFormDisabled){
          setIsFormDisabled(true)
        }
      } else{
        if(isFormDisabled){
          setIsFormDisabled(false)
        }
      }
    }
    console.log(isFormValid, isFormDisabled)
  },[isFormValid])


  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
    setShowEye(!showEye)
  }

  const handleChange = (name,value) => {
    setResetObject({...resetObject, [name]:value})
  }

  const handleSubmitForm = () => {
    setErrors([])
    let isValid = true

    for (const key in resetObject){
      console.log(key)
      if(key === "newPassword"){
        isValid = validatePassword(resetObject[key], 3, 20)

        if(!isValid){
          setErrors(prev => [`${key} does not meet the requirements of minimum 8 letters + numbers`,...prev])
        }
      }
      
      if(key ==="confirmNewPassword"){
        isValid = confirmPassword(resetObject[key])
        console.log(isValid)
        if(!isValid){
          setErrors(prev => ['Password doesnt match',...prev])
        }
      }
    }
    if(!isValid){
      return
    }
    console.log(resetObject)
    //take an action
  }
  

  return (
    <div className='ResetPassword_main'>
      <Header />
      <div className='ResetPassword_frame'>
      <h3 className='ResetPassword_headline'>Reset Password:</h3>
        <form className="ResetPassword_form">
          <div className='ResetPassword_form_name'>
            <Input 
               name={"newPassword"} 
               value={resetObject.userName}
               placeholder="New Password"
               setIsFormValid={setIsFormValid}
               onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <div className='ResetPassword_wrapInputAndIcon'>
              <Input 
                name={"confirmNewPassword"} 
                value={resetObject.password}
                placeholder="Confirm new password"
                setIsFormValid={setIsFormValid}
                onBlur={(e) => handleChange(e.target.name, e.target.value)}
                type={showPassword ? "text" : "password"}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                checkErrorsFunc={confirmPassword}
                errorFuncParams={['Password', 6, 20]}
              />
               {showEye ? <AiFillEye className="ResetPassword_eyeIcon" onClick={toggleShowPassword}/> : <AiFillEyeInvisible className="ResetPassword_eyeCanceldIcon" onClick={toggleShowPassword}/>}
            </div>
          </div>
        </form>
        <div className='ResetPassword_Button'>
          <Button 
              text={"Reset"}
              isLightStyle
              onClick={handleSubmitForm}
              isDisabled={isFormDisabled}
              to="/allStats"
            />
        </div>
      </div>
      <div className='ResetPasswordError_div'>
            {errors.length > 0 && errors.map(error => <p className='ResetPassword_error'>{error}</p>)}
          </div> 
    </div>
  )
}

export default ResetPasswordPage