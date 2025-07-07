import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./HomePage.css"
import "../../components/Generic/Button/Button.css"
import Header from '../../components/Header/Header'
import Button from '../../components/Generic/Button/Button'
import Drone1 from '../../assets/Drone1-removebg-preview.png'
import drone13 from '../../assets/drone13.png'
import futuristic from '../../assets/futuristic.jpg'


const HomePage = () => {

  const navigate = useNavigate();

  const navigateToLoginPage = () => {
    navigate('/login');
  };
  const navigateToRegisterPage = () => {
    navigate('/register');
  };


  return (
    <div className='main'>
      <div className='scrollWatcher'></div>
      <div className='topBackground'>
        <div className='circle1'></div>
        <Header />
        <div className='content'>
          <div className='headlines'>
                <h1 className='main_headline'>FlyZone</h1>
                <h4 className='slogen'>Innovative Drone Technology</h4>
                <div className='buttons'>
                  <Button 
                    customStyles={{marginRight: "5px"}}
                    text={"Login"}
                    isLightStyle
                    onClick={navigateToLoginPage}
                  />
                  <Button 
                      text={"Register"}
                      onClick={navigateToRegisterPage}
                  />
                </div>
          </div>
          </div>
      </div>
      <div className='middleSection'>
        <h1 className='middleSectionHeadline'>The problem</h1>
        <div className='theProblemText'>
          <p className='theProblemTextContent'>
            Current solutions in the field of drone certification are generic<br /> 
            and do not provide the pilot with custom-tailored and fie-tuned <br /> 
            training that is unique and fits the pilot's specific weak points.  <br /> 
          </p>
        </div>
      </div>
      <div className='middleSection'>
        <h1 className='middleSectionHeadline'>Our solution</h1>
        <div className='theProblemText'>
          <p className='theProblemTextContent'>
            Personalized AI-based platform for applying best practices in <br />
            tailored drone training in flexible, diverse, and monitored <br />
            environments.
          </p>
        </div>
        <div className='drone1'>
          <img src={drone13}/>
        </div>
        <div className='circle2'></div>
      </div>
      <div className='middleSection'>
        <h1 className='middleSectionHeadline'>What do we <br />offer?</h1>
        <div className='theProblemText'>
          <div className='iconText'>
            <div className='homeIcon'></div>
            <div className='homeText'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;