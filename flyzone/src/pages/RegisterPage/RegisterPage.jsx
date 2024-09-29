import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Button from '../../components/Generic/Button/Button'
import Input from '../../components/Generic/Input/Input'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { registerDefaultValidState } from '../../constants/FormDeaults' 
import { validateEmail, validateMinMax, validatePassword, confirmPassword } from '../../validators/validators'
import './RegisterPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetErrors, resetToInitialState, setErrors, setRegisterForm, toggleShowPassword } from '../../store/slices/authSlice'

const RegisterPage = () => {
  const {registerForm, errors, showPassword} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const [isFormValid,setIsFormValid] = useState(registerDefaultValidState)
  const [isFormDisabled, setIsFormDisabled] = useState(true)


  const handleChange = (name,value) => {
    dispatch(setRegisterForm({name,value}))
  }

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
  },[isFormValid])

  useEffect(()=>{dispatch(resetToInitialState())},[])

  const handleSubmitForm = () => {
    dispatch(resetErrors())
    let isValid = true

    for (const key in registerForm){
      if(key === "firstName" || key === "lastName"){
        isValid = validateMinMax(key, 3, 20,registerForm[key])

        if(!isValid){
          dispatch(setErrors(`${key} does not meet the requirements of minimum 3 letters or max 20 letters`))
        }
      }
        if(key === "password"){
          isValid = validatePassword(registerForm[key])
          if(!isValid){
            dispatch(setErrors(`${key} does not meet the requirements of one uppercase, one lowercase`))
          }
      }
      if(key === "confirmedPassword"){
        isValid = confirmPassword(registerForm["password"], registerForm[key])
        if(!isValid){
          dispatch(setErrors(`${key} does not meet the requirements of one uppercase, one lowercase`))
        }
    }
      if(key ==="email"){
        isValid = validateEmail(registerForm[key])
        console.log(isValid)
        if(!isValid){
          dispatch(setErrors('email is not Valid'))
        }
      }
    }
    if(!isValid){
      return
    }
    console.log(registerForm)
    //take an action
  }

  return (
    <div className='register_main'>
      <Header />
      <div className='register_frame'>
      <h3 className='register_headline'>Register:</h3>
        <form className="register_form">
          <div className='register_form_name'>
          <Input 
               name={"firstName"} 
               value={registerForm.firstName}
               placeholder="First Name"
               onBlur={(e) => handleChange(e.target.name, e.target.value)}
               checkErrorsFunc={validateMinMax}
               errorFuncParams={['firstName', 3, 20]}
               setIsFormValid={setIsFormValid}
            />
            <Input 
               name={"lastName"} 
               value={registerForm.lastName}
               placeholder="Last Name"
               onBlur={(e) => handleChange(e.target.name, e.target.value)}
               checkErrorsFunc={validateMinMax}
               errorFuncParams={['lastName', 3, 20]}
               setIsFormValid={setIsFormValid}
            />
               <Input 
               name={"email"} 
               value={registerForm.email}
               placeholder="email"
               onBlur={(e) => handleChange(e.target.name, e.target.value)}
               checkErrorsFunc={validateEmail}
               setIsFormValid={setIsFormValid}
            />
            <div className='wrapIconAndInput'>
              <Input 
                name={"password"} 
                value={registerForm.password}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onBlur={(e) => handleChange(e.target.name, e.target.value)}
                checkErrorsFunc={validatePassword}
                setIsFormValid={setIsFormValid}
              />
               {showPassword ? <AiFillEye className="eyeIcon" onClick={() =>dispatch(toggleShowPassword())}/> : <AiFillEyeInvisible className="eyeCanceldIcon" onClick={() =>dispatch(toggleShowPassword())}/>}
            </div>
            <div className='wrapIconAndInput'>
              <Input 
                name={"confirmedPassword"} 
                value={registerForm.confirmedPassword}
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
                onBlur={(e) => handleChange(e.target.name, e.target.value)}
                checkErrorsFunc={confirmPassword}
                errorFuncParams={[registerForm.password]}
                setIsFormValid={setIsFormValid}
              />
              {showPassword ? <AiFillEye className="eyeIcon" onClick={() =>dispatch(toggleShowPassword())}/> : <AiFillEyeInvisible className="eyeCanceldIcon" onClick={() =>dispatch(toggleShowPassword())}/>}
            </div>
          </div>
        </form>
        <div className='registerButton'>
          <Button 
            text={"Submit"}
            isDisabled={isFormDisabled}
            onClick={handleSubmitForm}
            isLightStyle
          />
        </div>
       </div>
    {/*  <div className='loginError_div'>
            {errors.length > 0 && errors.map(error => <p className='login_error'>{error}</p>)}
          </div>  DONT FORGET TO DO THIS ONE IN THE REGISTER!*/}

    </div>
  )
}

export default RegisterPage