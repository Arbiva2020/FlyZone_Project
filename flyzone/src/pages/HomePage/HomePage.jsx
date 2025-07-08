import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./HomePage.css"
import "../../components/Generic/Button/Button.css"
import Header from '../../components/Header/Header'
import Button from '../../components/Generic/Button/Button'
import Drone1 from '../../assets/Drone1-removebg-preview.png'
import drone13 from '../../assets/drone13.png'
import futuristic from '../../assets/futuristic.jpg'
import { icons } from './HomePageIcons'
import { IoEarthOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";





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
                <p className='mainContent'>
                  Current solutions in the field of drone certification are generic<br /> 
                  and do not provide the pilot with custom-tailored and fie-tuned <br /> 
                  training that is unique and fits the pilot's specific weak points.  <br /> 
                </p>
                <div className='buttons'>
                  <Button 
                    customStyles={{marginRight: "50px"}}
                    text={"Login"}
                    isLightStyle
                    onClick={navigateToLoginPage}
                  />
                  <Button
                      customStyles={{marginLeft: "50px"}} 
                      text={"Register"}
                      onClick={navigateToRegisterPage}
                  />
                </div>
          </div>
          </div>
      </div>
      <div className='middleSection'>
        <h1 className='middleSectionHeadline'>The problem</h1>
        <div style={{backgroundColor:"white", width:"2px", height:"60%", marginLeft:"20px"}}></div>
        <div className='theProblemText'>
          <p className='theProblemTextContent'>
            Current solutions in the field of drone certification are generic
            and do not provide <br />the pilot with custom-tailored and fie-tuned 
            training that is unique and fits the pilot's specific weak points.  <br /> 
          </p>
        </div>
      </div>
      <div className='middleSection'>
        <h1 className='middleSectionHeadline'>Our solution</h1>
        <div style={{backgroundColor:"white", width:"2px", height:"60%", marginLeft:"20px"}}></div>

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
        <h1 className='buttomSectionHeadline'>What do we <br />offer?</h1>
        <div style={{backgroundColor:"white", width:"2px", height:"120%", marginLeft:"20px"}}></div>
        <div className='homeIcons'>
            <div className='homeUpperIcons'>              
              {icons.map((icon, index) => (
                <div className='homeIcon' key={index}>
                  <div style={{fontSize:"50px"}}>
                  {icon.icon}
                  </div>
                  <p style={{textAlign: "-webkit-center"}}>{icon.name}</p>
                </div>
              )).slice(0, 3)}
            </div>
            <div className='homeButtoIcons'>
              {icons.map((icon, index) => (
                <div className='homeIcon' key={index}>
                  <div style={{fontSize:"50px"}}>
                  {icon.icon}
                  </div>
                  <p style={{textAlign: "-webkit-center"}}>{icon.name}</p>
                </div>
              )).slice(3)}
            </div>
        </div>
      </div>
      <div className='buttomSection'>
        <h1 className='middleSectionHeadline'>Why FlyZone</h1>
        <div style={{backgroundColor:"white", width:"20px", height:"20px"}}></div>

        <div className='theProblemText'>
          <p className='theProblemTextContent'>
          In light of the rising popularity of drones in various industries 
          and under complex mission scenarios, <br /> well-trained pilots are of the
          essence.  FlyZone is the only tool that enables the user to train with <br />
          confidence in multiple environments and suited conditions thanks to <br />
          our novel algorithm that provides tailored assessment for maximizing performance.
          </p>
        </div>
        <div className='iconsContainer'>
          <div className='iconContainer'>
            <IoEarthOutline style={{fontSize:"50px"}}/>
            <p>Custom environments/drone types</p>
          </div>
          <div className='iconContainer'>
            <IoGameControllerOutline style={{fontSize:"50px"}}/>
            <p>Personalized and gradual training </p>
          </div>
          <div className='iconContainer'>
            <LiaChalkboardTeacherSolid style={{fontSize:"50px"}}/>
            <p>Novel assessment algorithm</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;