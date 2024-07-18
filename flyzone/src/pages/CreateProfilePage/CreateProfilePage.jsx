import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import { createProfileDefaultState, registerDefaultState, registerDefaultValidState } from '../../constants/FormDeaults'
import { validatePassword, validateMinMax, validateEmail } from '../../validators/validators'
import Input from '../../components/Generic/Input/Input'
import Button from '../../components/Generic/Button/Button'
import './CreateProfilePage.css'
import Profile from '../../assets/Profile.png'

const CreateProfilePage = () => {
  const [createProfileObject, setCreateProfileObject] = useState(createProfileDefaultState)  //update the new profile
  const [errors,setErrors] = useState([])
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [updated, setUpdated] = useState(false)
  const [isFormValid,setIsFormValid] = useState(registerDefaultValidState)
  const [isFormDisabled, setIsFormDisabled] = useState(true)  
  
  const handleChange = (name,value, event) => {
    setCreateProfileObject({...createProfileObject, name: e.target.value});
    setIsFilePicked(true);
    console.log(event.target.files[0])
  }

  useEffect(() => {
    console.log(createProfileObject)
    console.log(updated)
  })

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

  const handleSubmitForm = () => {
    setErrors([])
    let isValid = true

    for (const key in createProfileObject){
      if(key ==="file"){
        isValid = validateFileType(createProfileObject[key])
        if(!isValid){
          setErrors(prev => ['File type doesnt match',...prev])
        }
      }

      if(key === "userName"){
        isValid = validateMinMax(createProfileObject[key], 3, 20)

        if(!isValid){
          setErrors(prev => [`${key} does not meet the requirements of minimum 3 letters or max 20 letters`,...prev])
        }
      }
      
      if(key ==="password"){
        isValid = validatePassword(createProfileObject[key])
        console.log(isValid)
        if(!isValid){
          setErrors(prev => ['Password doesnt match',...prev])
        }
      }
    }
    if(!isValid){
      return
    }
    console.log(createProfileObject)
    //take an action
  }
console.log(errors)

  return (
    <div className='createProfile_main'>
      <Header />
      <div className='createProfile_frame'>
        <h3 className='createProfile_headline'>Update your profile</h3>
        {isFilePicked ? <img className="profile_pic" src={null}/> : <img className="profile_pic" src={Profile}/>}
        {/* {isFilePicked ? <img className="profile_pic" src={Profile}/> : <img className="profile_pic" src={files[0]}/>} */}
        {/* <img className="profile_pic" src={Profile}/> */}
        <form className="createProfile_form">
          <div className='attach_file'>
            <Input 
              customStyles={{backgroundColor:"black", color:"white"}}
              name={"file"}
              type= "file" 
              value={createProfileObject.file}
              placeholder="Add File"
              onChange={(e) => {
                setIsFilePicked(true)
                setUpdated(true);
                setCreateProfileObject({...createProfileObject, file: e.target.value})
              }}
            /> 
            {isFilePicked ? (<div><p>File picked successfully!</p></div>) : <div><p style={{fontSize:"10px"}}>Please pick a file</p></div>}  
          </div> 
          <div className='createProfileForm_all_inputs'>     
            <div className='createProfileForm_name'>
                  <Input
                    name={"firstName"} 
                    value={createProfileObject.firstName}
                    placeholder="First Name"
                    checkErrorsFunc={validateMinMax}
                    errorFuncParams={['firstName', 3, 20]}
                    setIsFormValid={setIsFormValid}
                    onChange={(e) => {
                      setUpdated(true);
                      setCreateProfileObject({...createProfileObject, firstName: e.target.value})}}
                  />           
                  <Input
                    name={"lastName"} 
                    value={createProfileObject.lastName}
                    placeholder="Last Name"
                    checkErrorsFunc={validateMinMax}
                    errorFuncParams={['lasttName', 3, 20]}
                    setIsFormValid={setIsFormValid}
                    onChange={(e) => {
                      setUpdated(true);
                      setCreateProfileObject({...createProfileObject, lastName: e.target.value})}}
                />           
              </div>
              <div className='createProfileForm_name'>
                <Input 
                name={"userName"} 
                value={createProfileObject.userName}
                placeholder="User Name"
                checkErrorsFunc={validateMinMax}
                errorFuncParams={['userName', 3, 20]}
                setIsFormValid={setIsFormValid}
                onChange={(e) => {
                  setUpdated(true);
                  setCreateProfileObject({...createProfileObject, userName: e.target.value})}}
                />
                <Input 
                  name={"email"} 
                  value={createProfileObject.email}
                  placeholder="email"
                  checkErrorsFunc={validateEmail}
                  setIsFormValid={setIsFormValid}
                  onChange={(e) => {
                    setUpdated(true);
                    setCreateProfileObject({...createProfileObject, email: e.target.value})}}
                />
              </div> 
              <div className='createProfileForm_name'>      
                <Input 
                  name={"roll"} 
                  value={createProfileObject.roll}
                  placeholder="Roll"
                  onChange={(e) => {
                    setUpdated(true);
                    setCreateProfileObject({...createProfileObject, roll: e.target.value})}}
                />          
                <Input 
                  name={"organization"} 
                  value={createProfileObject.organization}
                  placeholder="Organization"
                  onChange={(e) => {
                    setUpdated(true);
                    setCreateProfileObject({...createProfileObject, organization: e.target.value})}}
                />
              </div> 
            </div> 
            <div className='create_button'> 
              {updated ? 
              <>
                <button className='create_cancle' onClick={(e) => {
                  setUpdated({...CreateProfilePage})
                }}>
                  Cancle
                </button>        
                <Button 
                  text={"Update Profile"}
                  isLightStyle
                  onClick={handleSubmitForm}
                /> 
                </> : null}
            </div>        
        </form>
      </div>
      <div className='createProfileError_div'>
            {errors.length > 0 && errors.map(error => <p className='createProfile_error'>{error}</p>)}
          </div> 
    </div>
  )
}

export default CreateProfilePage