import React,{useState, useEffect} from 'react'
import Header from '../../components/Header/Header'
import './ContactPage.css'
import Button from '../../components/Generic/Button/Button'
import Input from '../../components/Generic/Input/Input'
import { contactDefaultState, contactDefaultValidState } from '../../constants/FormDeaults'
import { validateEmail, validateMinMax } from '../../validators/validators'

const ContactPage = () => {
  const [contactObject, setContactObject] = useState(contactDefaultState)
  const [isFormValid,setIsFormValid] = useState(contactDefaultValidState)
  const [isFormDisabled, setIsFormDisabled] = useState(true)

  const handleChange = (name,value) => {
    setContactObject({...contactObject, [name]:value})
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
    console.log(isFormValid, isFormDisabled)
  },[isFormValid])

  const handleSubmitForm = () => {
   
    console.log('take an action')
  }

  const handleClearForm = () => {
    setContactObject(contactDefaultState)
  }

  return (
    <div className='contact_main'>
      <Header />
      <div className='contact_frame'>
        <h3 className='contact_headline'>Contact us:</h3>
        <form className="contact_form">
          <div className='form_name'>
          <Input
               name={"firstName"}
               placeholder='First Name' 
               value={contactObject.firstName}
               onBlur={(e) => handleChange(e.target.name, e.target.value)}
               checkErrorsFunc={validateMinMax}
               errorFuncParams={['firstName', 3, 20]}
               setIsFormValid={setIsFormValid}
            />
            <Input 
               name={"lastName"} 
               placeholder='Last Name' 
               value={contactObject.lastName}
               onBlur={(e) => handleChange(e.target.name, e.target.value)}
               checkErrorsFunc={validateMinMax}
               errorFuncParams={['lastName', 3, 20]}
               setIsFormValid={setIsFormValid}
            />
          </div>
          <div className='mail_extra'>
            <Input
               name={"email"}
               placeholder='email' 
               type={"email"}
               value={contactObject.email}
               onBlur={(e) => handleChange(e.target.name, e.target.value)}
               checkErrorsFunc={validateEmail}
               setIsFormValid={setIsFormValid}
              customStyles={{width:"400px"}}
            />   
            <textarea className='form_extra' placeholder='Message' name="content" value={contactObject.content} rows="8" cols="50" onChange={(e) => handleChange(e.target.name, e.target.value)}></textarea>  
          </div>     
        </form>
        <div className='contactButtons'>
        <Button 
            text={"Submit"}
            isDisabled={isFormDisabled}
            isLightStyle
            onClick={handleSubmitForm}
          />
           <Button 
            text={"Clear"}
            onClick={handleClearForm}
          />
        </div>
        <p className='flyzone_adress'>Burnstein blvd.1 Yeruham, Israel. POB: 8055401</p>
      </div>
    </div>
  )
}

export default ContactPage