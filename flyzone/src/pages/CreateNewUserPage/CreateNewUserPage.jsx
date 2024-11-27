// import React, { useState, useEffect } from 'react';
// import AuthHeader from '../../components/AuthHeader/AuthHeader';
// import Input from '../../components/Generic/Input/Input';
// import Button from '../../components/Generic/Button/Button';
// import Checkbox from "../../components/Generic/Checkbox/Checkbox";
// import SideBar from '../../components/SideBar/SideBar';
// //import api from "../../api";
// import "./CreateNewUserPage.css";
// import { registerDefaultValidState } from '../../constants/FormDeaults'; 
// import { validateEmail, validateMinMax, validatePassword, confirmPassword } from '../../validators/validators';
// import { useDispatch, useSelector } from 'react-redux';
// import { resetErrors, resetToInitialState, setErrors, setUserData, toggleShowPassword, setCreateNewUserForm } from '../../store/slices/authSlice';
// import handleScenarioData from "../../App";
// import { setTestForm } from '../../store/slices/testSlice';
// import axios from 'axios';

// function CreateNewUserPage() {
//     const {userData, errors, showPassword} = useSelector(state=>state.auth);
//     const dispatch = useDispatch();
//     const [isFormValid,setIsFormValid] = useState(registerDefaultValidState)
//     const [isFormDisabled, setIsFormDisabled] = useState(true)
//     const [scenarioFormData, setScenarioFormData] = useState({})
//     const [users, setUsers] = useState({
//       id: "",
//       // security_level: "",
//       username: "",
//       first_name: "",
//       last_name: "",
//       password: "",
//       email: "",
//       // level: "",
//       // next_level: "",
//       // mmr: "",
//       // badges: "",
//       // total_assessments: "",
//       // number_of_failures: "",
//       // straight_failures: "",
//       // assessment_overdue: "",
//       // total_score: "",
//       company_id: "",
//       group_id: "",
//       profileImguser: "",
//     });
//     // const fetchUsers = async() => {
//     //   const response = await api.get("/users");
//     //   setUsers(response.data)
//     // };
  
//     // useEffect(() => {
//     //   fetchUsers();
//     // }, [])
  
//     //submitting data for a new test(instead of algorithmic):
//     // const handleScenarioFormData = async(event) => {
//     //   event.preventDefault();
//     //   await api.post('/users', scenarioFormData);
//     //   fetchUsers();
//     //   setScenarioFormData({
//     //     map:"",
//     //     scenario:"",
//     //     missionType:"", 
//     //     startTime:"", 
//     //     endTime:"",
//     //     wind:"", 
//     //     fog:"", 
//     //     brightness:"", 
//     //   })
//     // }


//     const createUser = async (userData) => {
//       try {
//           const response = await axios.post("http://localhost:8000/register", userData);
//           console.log("User created:", response.data);
//       } catch (error) {
//           console.error("Error creating user:", error.response.data);
//       }
//   };

//     const handleChange = (name,value) => {
//       dispatch(setUserData({name,value}))
//     }


//     useEffect(()=>{
//         for (const key in isFormValid){
//           if(isFormValid[key] === false){
//             if(!isFormDisabled){
//               setIsFormDisabled(true)
//             }
//           } else {
//             if(isFormDisabled){
//               setIsFormDisabled(false)
//             }
//           }
//         }
//       },[isFormValid])
    
//       useEffect(()=>{dispatch(resetToInitialState())},[])


      
//       const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setUserData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };


//     const validateFields = () => {
//       const { username, first_name, last_name, password, email, company_id, group_id } = userData;
  
//       if (!username || username.length < 3) return "Username must be at least 3 characters.";
//       if (!first_name || first_name.length < 1) return "First name is required.";
//       if (!last_name || last_name.length < 1) return "Last name is required.";
//       if (!password || password.length < 8) return "Password must be at least 8 characters.";
//       if (!email || !email.includes("@")) return "Email is invalid.";
//       if (!company_id || isNaN(Number(company_id))) return "Company ID must be a valid number.";
//       if (!group_id || isNaN(Number(group_id))) return "Group ID must be a valid number.";
  
//       return null; // No errors
//   };
  
//   const handleUserSubmit = async (event) => {
//       event.preventDefault();
//       const error = validateFields();
//       if (error) {
//           console.error("Validation error:", error);
//           return;
//       }
//       try {
//           const userPayload = {
//               username: userData.username,
//               first_name: userData.first_name,
//               last_name: userData.last_name,
//               password: userData.password,
//               email: userData.email,
//               company_id: parseInt(userData.company_id),
//               group_id: parseInt(userData.group_id),
//               profileImguser: userData.profileImguser,
//           };
//           console.log("Payload being sent to backend:", userPayload);
//           await createUser(userPayload);
//       } catch (error) {
//           console.error("Failed to create user:", error);
//       }
//   };

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
//                                     onBlur={(e) => handleChange(e.target.name, e.target.value)}
//                                     checkErrorsFunc={validateMinMax}
//                                     errorFuncParams={['first_name', 3, 20]}
//                                     setIsFormValid={setIsFormValid}
//                                 />
//                                 <Input
//                                     name={"last_name"}
//                                     value={userData.last_name}
//                                     placeholder="Last Name"
//                                     onChange={handleInputChange}
//                                     onBlur={(e) => handleChange(e.target.name, e.target.value)}
//                                     checkErrorsFunc={validateMinMax}
//                                     errorFuncParams={['last_name', 3, 20]}
//                                     setIsFormValid={setIsFormValid}
//                                 />
//                                 <Input
//                                     name={"username"}
//                                     value={userData.username}
//                                     placeholder="Username"
//                                     onChange={handleInputChange}
//                                     errorFuncParams={['username', 3, 20]}
//                                     onBlur={(e) => handleChange(e.target.name, e.target.value)}
//                                     setIsFormValid={setIsFormValid}
//                                     checkErrorsFunc={validateMinMax}
//                                 />
//                                 <Input
//                                     name={"password"}
//                                     value={userData.password}
//                                     placeholder="Password"
//                                     type="password"
//                                     onBlur={(e) => handleChange(e.target.name, e.target.value)}
//                                     onChange={handleInputChange}
//                                     setIsFormValid={setIsFormValid}
//                                     checkErrorsFunc={validatePassword}
//                                 />
//                                 <Input
//                                     name={"email"}
//                                     value={userData.email}
//                                     placeholder="Email"
//                                     onChange={handleInputChange}
//                                     setIsFormValid={setIsFormValid}
//                                     checkErrorsFunc={validateEmail}
//                                     onBlur={(e) => handleChange(e.target.name, e.target.value)}
//                                 />
//                             </div>
//                             <div className='createUser_formRight'>
//                                 <Input
//                                     name={"company_id"}
//                                     value={userData.company_id}
//                                     placeholder="Company ID"
//                                     onChange={handleInputChange}
//                                 />
//                                 <Input
//                                     name={"group_id"}
//                                     value={userData.group_id}
//                                     placeholder="Group ID"
//                                     onChange={handleInputChange}
//                                 />
//                                 <Input
//                                     name={"profileImguser"}
//                                     value={userData.profileImguser}
//                                     placeholder="Profile Image URL"
//                                     onChange={handleInputChange}
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
import { postToServer } from "../../api";
import "./CreateNewUserPage.css";
import { registerDefaultValidState } from '../../constants/FormDeaults'; 
import { validateEmail, validateMinMax, validatePassword, confirmPassword } from '../../validators/validators';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrors, resetToInitialState, setErrors, setUserData, toggleShowPassword } from '../../store/slices/authSlice';
import handleScenarioData from "../../App"
import { setTestForm } from '../../store/slices/testSlice';

function CreateNewUserPage() {
    const {userData, errors, showPassword} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const [isFormValid,setIsFormValid] = useState(registerDefaultValidState)
    const [isFormDisabled, setIsFormDisabled] = useState(true)


    const [scenarioFormData, setScenarioFormData] = useState({})
    const [users, setUsers] = useState({
      id: "",
      security_level: "",
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      level: "",
      next_level: "",
      mmr: "",
      badges: "",
      total_assessments: "",
      number_of_failures: "",
      straight_failures: "",
      assessment_overdue: "",
      total_score: "",
      company_id: "",
      group_id: "",
      profileImguser: "",
    });
    const fetchUsers = async() => {
      //const response = await api.get("/users");
      //setUsers(response.data)
    };
  
    useEffect(() => {
      fetchUsers();
    }, [])
  
    //submitting data for a new test(instead of algorithmic):
    const handleScenarioFormData = async(event) => {
      event.preventDefault();
      //await api.post('/users', scenarioFormData);
      fetchUsers();
      setScenarioFormData({
        map:"",
        scenario:"",
        missionType:"", 
        startTime:"", 
        endTime:"",
        wind:"", 
        fog:"", 
        brightness:"", 
      })
    }




  
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
              if(!isValid){
                dispatch(setErrors('email is not Valid'))
              }
            }
          }
          if(!isValid){
            return
          }

          const digestedData = {...userData, number_of_failures:0, straight_failures:0}

         try {
              await postToServer('/users/', digestedData)
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
