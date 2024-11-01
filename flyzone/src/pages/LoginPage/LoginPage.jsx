import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Button from '../../components/Generic/Button/Button';
import Input from '../../components/Generic/Input/Input';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { loginDefaultValidState } from '../../constants/FormDeaults';
import { validatePassword, validateMinMax } from '../../validators/validators';
import './LoginPage.css';
import { resetErrors, resetToInitialState, setErrors, setLoginForm, toggleShowPassword } from '../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from './apiHooks/login';
import { getFromServer } from "../../api"
import axios from 'axios';

const LoginPage = () => {
  const { loginForm, errors, showPassword } = useSelector(state => state.auth);
  const [isFormValid, setIsFormValid] = useState(loginDefaultValidState);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const loginMutation = useLoginMutation()

  useEffect(() => {
    for (const key in isFormValid) {
      if (isFormValid[key] === false) {
        if (!isFormDisabled) {
          setIsFormDisabled(true);
        }
      } else {
        if (isFormDisabled) {
          setIsFormDisabled(false);
        }
      }
    }
  }, [isFormValid]);

  useEffect(() => { dispatch(resetToInitialState()); }, [dispatch]);

  const handleChange = (name, value) => {
    dispatch(setLoginForm({ name, value }));
  };
 
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch(resetErrors());
    let isValid = true;

    for (const key in loginForm) {
        if (key === "userName") {
            isValid = validateMinMax('userName', 3, 20, loginForm[key]).isSuccess;
            if (!isValid) {
                dispatch(setErrors(`${key} does not meet the requirements of minimum 3 letters or max 20 letters`));
            }
        }
        if (key === "password") {
            isValid = validatePassword(loginForm[key]).isSuccess;
            if (!isValid) {
                dispatch(setErrors(`Password doesn't match`));
            }
        }
    }

    if (!isValid) {
        return;
    }

    try {
      const formData = {
        username: loginForm.userName, // This should match your FastAPI model
        password: loginForm.password,
    };

      await loginMutation.mutateAsync(formData)
      setLoading(false)
      if(loginMutation.isSuccess){
      } else{
      }


      
        const response = await axios.post('http://localhost:8000/token', {
          username: loginForm.userName, 
          password: loginForm.password
        }, {
            headers: {
               'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });


        if (response.status === 200) {
            const data = response.data;
            localStorage.setItem('token', data.access_token);
            navigate('/mainView');
        } else {
            dispatch(setErrors(response.data.detail || 'Authentication failed!'));
        }

    } catch (error) {
        setLoading(false);
        console.error("Login failed:", error.response.data);
        dispatch(setErrors('An error has occurred. Please try again later'));
    }
    setLoading(false);
};

  return (
    <div className='login_main'>
      <Header />
      <div className='login_frame'>
        <h3 className='login_headline'>Login:</h3>
        <form className="login_form">
          <div className='login_form_name'>
            <Input
              name={"userName"}
              value={loginForm.userName}
              placeholder="User Name"
              onBlur={(e) => handleChange(e.target.name, e.target.value)}
              setIsFormValid={setIsFormValid}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <div className='wrapInputAndIcon'>
              <Input
                name={"password"}
                value={loginForm.password}
                placeholder="Password"
                setIsFormValid={setIsFormValid}
                onBlur={(e) => handleChange(e.target.name, e.target.value)}
                type={showPassword ? "text" : "password"}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                checkErrorsFunc={validateMinMax}
                errorFuncParams={['Password', 6, 20]}
              />
              {!showPassword ? <AiFillEye className="eyeIcon" onClick={() => dispatch(toggleShowPassword())} /> : <AiFillEyeInvisible className="eyeCanceldIcon" onClick={() => dispatch(toggleShowPassword())} />}
            </div>
          </div>
        </form>
        <div className='loginButton'>
          <Button
                text={"Login"}
                isLightStyle
                onClick={(event) => {
                    handleSubmitForm(event);
                }}
                isDisabled={isFormDisabled}
          />
        </div>
        <Link className='forgotPass' to="/resetPassword">Forgot password?</Link>
      </div>
      <div className='loginError_div'>
        {errors.length > 0 && errors.map((error, index) => <p key={index} className='login_error'>{error}</p>)}
      </div>
    </div>
  );
};

export default LoginPage;
