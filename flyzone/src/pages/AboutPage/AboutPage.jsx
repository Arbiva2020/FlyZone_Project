import React  from 'react'
import "./AboutPage.css"
import Header from '../../components/Header/Header'
import drone13 from '../../assets/drone13.png';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
        <Header />
            <div className='about_main'>
              <div className='about_text'>
                <h1 className="about_headline">About FlyZone</h1>
                    <p className="about_content">
                      FlyZone by Tech-19 is an AI-based platform for scaling up drone operators' training process in unique and diverse environments. <br />
                      FlyZone was developed and designed to establish new standards in the process of drone training, as it provides the user with a unique experience and the supervisor with a detailed and comprehensive analysis. <br />
                      At FlyZone, we value the power of data and use it to introduce our users to precise and scaled training that will bring drone operators <br /> to the next level in the shortest, smartest, 
                      and most engaging way possible. <br />
                      In light of the rising popularity of drones in various industries and under complex mission scenarios, well-trained pilots are of the essence. <br />
                      FlyZone is the only tool that enables the user to train with confidence in multiple environments and suited conditions thanks to our novel algorithm <br />
                      that provides tailored assessment for maximizing performance. 
                        </p>
                        <Link className='demo_link' to="/demo">For demo, click here</Link>
              </div>
                
                        <div className='about_graphics'>
                          <div className='about_circle'></div>
                          <img className='about_img' src={drone13}/>
                        </div>
                        
                </div>
    </div>
   
  )
}

export default AboutPage