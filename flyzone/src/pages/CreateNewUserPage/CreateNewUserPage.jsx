// import React, { useState } from 'react';
// import AuthHeader from '../../components/AuthHeader/AuthHeader';
// import Input from '../../components/Generic/Input/Input';
// import Button from '../../components/Generic/Button/Button';
// import Checkbox from "../../components/Generic/Checkbox/Checkbox";
// import SideBar from '../../components/SideBar/SideBar';
// import api from "../../api";
// import "./CreateNewUserPage.css";

// function CreateNewUserPage() {
//     const [submitStatus, setSubmitStatus] = useState("")
//     const [userData, setUserData] = useState({
//         security_level: 1,  // Default value, adjust as needed
//         username: "",
//         first_name: "",
//         last_name: "",
//         password: "",
//         email: "",
//         level: 0,
//         next_level: 0,
//         mmr: 0,
//         badges: 0,
//         total_assessments: 0,
//         number_of_failurs: 0,
//         straight_failurs: 0,
//         assessment_overdue: false,
//         total_score: 0,
//         company_id: 0,
//         group_id: 0,
//         profileImguser: ""
//     });

//     const handleInputChange = (event) => {
//         const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
//         setUserData({
//             ...userData,
//             [event.target.name]: value,
//         });
//     };

//     const handleUserSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await api.post('/users/', userData);
//             if (response?.isSuccess) {
//                 setSubmitStatus("User added successfully!")
//             } else {
//                 throw new Error("Failed to add user")
//             }
//             // setUserData
//         } catch (error) {
//             setSubmitStatus(error.message)
//         }
//     };

//     return (
//         <div className='createUser_main'>
//             <AuthHeader />
//             <div className='createUser_page'>
//                 <SideBar />
//                 <div className='createUser_all'>
//                     <div className='createUser_form'>
//                         <div className='createUser_headline'>
//                             Create new user
//                         </div>
//                         <div className='createUser_content'>
//                             <div className='createUser_formLeft'>
//                                 <Input
//                                     name={"first_name"}
//                                     value={userData.first_name}
//                                     placeholder="First name"
//                                     onChange={handleInputChange}
//                                     customStyles={{marginBottom:"15px"}}
//                                 />
//                                 <Input
//                                     name={"last_name"}
//                                     value={userData.last_name}
//                                     placeholder="Last Name"
//                                     onChange={handleInputChange}
//                                     customStyles={{marginBottom:"15px"}}
//                                 />
//                                 <Input
//                                     name={"username"}
//                                     value={userData.username}
//                                     placeholder="Username"
//                                     onChange={handleInputChange}
//                                     customStyles={{marginBottom:"15px"}}
//                                 />
//                                 <Input
//                                     name={"password"}
//                                     value={userData.password}
//                                     placeholder="Password"
//                                     type="password"
//                                     onChange={handleInputChange}
//                                     customStyles={{marginBottom:"15px"}}
//                                 />
//                                 <Input
//                                     name={"email"}
//                                     value={userData.email}
//                                     placeholder="Email"
//                                     onChange={handleInputChange}
//                                     customStyles={{marginBottom:"15px"}}
//                                 />
//                             </div>
//                             <div className='createUser_formRight'>
//                                 <Input
//                                     name={"company_id"}
//                                     value={userData.company_id}
//                                     placeholder="Company ID"
//                                     onChange={handleInputChange}
//                                     customStyles={{marginBottom:"15px"}}
//                                 />
//                                 <Input
//                                     name={"group_id"}
//                                     value={userData.group_id}
//                                     placeholder="Group ID"
//                                     onChange={handleInputChange}
//                                     customStyles={{marginBottom:"15px"}}
//                                 />
//                                 <Input
//                                     name={"profileImguser"}
//                                     value={userData.profileImguser}
//                                     placeholder="Profile Image URL"
//                                     onChange={handleInputChange}
//                                     customStyles={{marginBottom:"15px"}}
//                                 />
//                                 <div className='createUser_checkbox'>
//                                     <Checkbox
//                                         name="assessment_overdue"
//                                         onChange={handleInputChange}
//                                         value={userData.assessment_overdue}
//                                     />
//                                     Assessment Overdue
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='createUser_alert'>
                            
//                             <p>
//                                 {submitStatus && submit}
//                             </p>
//                         </div>
//                     </div>
//                     <div className='createUser_buttomSubmit'>
//                         <Button
//                             text={"Create user"}
//                             isLightStyle
//                             type="submit"
//                             onClick={handleUserSubmit}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CreateNewUserPage;

import React, { useState, useEffect } from 'react';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import Input from '../../components/Generic/Input/Input';
import Button from '../../components/Generic/Button/Button';
import Checkbox from "../../components/Generic/Checkbox/Checkbox";
import SideBar from '../../components/SideBar/SideBar';
import api from "../../api";
import "./CreateNewUserPage.css";
import { registerDefaultValidState } from '../../constants/FormDeaults'; 
import { validateEmail, validateMinMax, validatePassword, confirmPassword } from '../../validators/validators';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrors, resetToInitialState, setErrors, setUserData, toggleShowPassword } from '../../store/slices/authSlice';
import handleScenarioData from "../../App"

function CreateNewUserPage() {
    const {userData, errors, showPassword} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const [isFormValid,setIsFormValid] = useState(registerDefaultValidState)
    const [isFormDisabled, setIsFormDisabled] = useState(true)
  
  
    const handleChange = (name,value) => {
      dispatch(setUserData({name,value}))
    }


    useEffect(()=>{
        for (const key in isFormValid){
          if(isFormValid[key] === false){
            if(!isFormDisabled){
              setIsFormDisabled(true)
            }
          } else {
            if(isFormDisabled){
              setIsFormDisabled(false)
            }
          }
        }
      },[isFormValid])
    
      useEffect(()=>{dispatch(resetToInitialState())},[])



    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        handleChange(event.target.name, value)
        setUserData({
            ...userData,
            [event.target.name]: value,
        });
    };

    const handleUserSubmit = async (event) => {
        event.preventDefault();
        dispatch(resetErrors())
        let isValid = true



        for (const key in userData){
            if(key === "first_name" || key === "last_name"){
              isValid = validateMinMax(key, 3, 20,userData[key])
      
              if(!isValid){
                dispatch(setErrors(`${key} does not meet the requirements of minimum 3 letters or max 20 letters`))
              }
            }
              if(key === "password"){
                isValid = validatePassword(userData[key])
                if(!isValid){
                  dispatch(setErrors(`${key} does not meet the requirements of one uppercase, one lowercase`))
                }
            }
            if(key ==="email"){
              isValid = validateEmail(userData[key])
              console.log(isValid)
              if(!isValid){
                dispatch(setErrors('email is not Valid'))
              }
            }
          }
          if(!isValid){
            return
          }
          console.log(userData)



        event.preventDefault();
        try {
            await api.post('/users/', userData);
            // Add any additional success handling here, e.g., fetching users, showing a success message
        } catch (error) {
            console.error('Failed to create user:', error);
            // Add any error handling here, e.g., showing an error message
        }
    };

    return (
        <div className='createUser_main'>
            <AuthHeader />  
            <div className='createUser_page'>
                <SideBar />
                <div className='createUser_all'>
                    <div className='createUser_form'>
                        <div className='createUser_headline'>
                            Create new user
                        </div>
                        <div className='createUser_content'>
                            <div className='createUser_formLeft'>
                                <Input
                                    name={"first_name"}
                                    value={userData.first_name}
                                    placeholder="First name"
                                    onChange={handleScenarioData}
                                    // onChange={handleInputChange}
                                    onBlur={(e) => handleChange(e.target.name, e.target.value)}
                                    checkErrorsFunc={validateMinMax}
                                    errorFuncParams={['first_name', 3, 20]}
                                    setIsFormValid={setIsFormValid}
                                />
                                <Input
                                    name={"last_name"}
                                    value={userData.last_name}
                                    placeholder="Last Name"
                                    onChange={handleScenarioData}
                                    // onChange={handleInputChange}
                                    onBlur={(e) => handleChange(e.target.name, e.target.value)}
                                    checkErrorsFunc={validateMinMax}
                                    errorFuncParams={['last_name', 3, 20]}
                                    setIsFormValid={setIsFormValid}
                                />
                                <Input
                                    name={"username"}
                                    value={userData.username}
                                    placeholder="Username"
                                    onChange={handleScenarioData}
                                    // onChange={handleInputChange}
                                />
                                <Input
                                    name={"password"}
                                    value={userData.password}
                                    placeholder="Password"
                                    type="password"
                                    onChange={handleScenarioData}
                                    // onChange={handleInputChange}
                                />
                                <Input
                                    name={"email"}
                                    value={userData.email}
                                    placeholder="Email"
                                    onChange={handleScenarioData}
                                    // onChange={handleInputChange}
                                />
                            </div>
                            <div className='createUser_formRight'>
                                <Input
                                    name={"company_id"}
                                    value={userData.company_id}
                                    placeholder="Company ID"
                                    onChange={handleScenarioData}
                                    // onChange={handleInputChange}
                                />
                                <Input
                                    name={"group_id"}
                                    value={userData.group_id}
                                    placeholder="Group ID"
                                    onChange={handleScenarioData}
                                    // onChange={handleInputChange}
                                />
                                <Input
                                    name={"profileImguser"}
                                    value={userData.profileImguser}
                                    placeholder="Profile Image URL"
                                    onChange={handleScenarioData}
                                    // onChange={handleInputChange}
                                />
                                <div className='createUser_checkbox'>
                                    <Checkbox
                                        name="assessment_overdue"
                                        onChange={handleScenarioData}
                                        // onChange={handleInputChange}
                                        value={userData.assessment_overdue}
                                    />
                                    Assessment Overdue
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='createUser_buttomSubmit'>
                        <Button
                            text={"Create user"}
                            isLightStyle
                            type="submit"
                            onClick={handleUserSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateNewUserPage;
