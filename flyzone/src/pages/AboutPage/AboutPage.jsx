import React  from 'react'
import "./AboutPage.css"
import Header from '../../components/Header/Header'
import Drone1 from '../../assets/Drone1.png';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
        <Header />
            <div className='about_main'>
              <div className='about_text'>
                <h1 className="about_headline">About FlyZone</h1>
                    <p className="about_content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam velit vero officia quasi facere 
                        eveniet facilis, voluptatem laboriosam vel, perferendis est, deleniti natus quas consequuntur libero 
                        officiis ratione tenetur sed!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab provident blanditiis temporibus 
                        tempore corrupti! Harum rerum tempora, eveniet alias consequatur illo repudiandae, quo facilis esse, 
                        magni rem totam fugiat delectus?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga possimus, corporis magni accusantium
                        sapiente quisquam quae consequuntur eveniet assumenda nam? Laudantium voluptate voluptas sapiente 
                        numquam animi. Perferendis minus quod officiis.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias facere dolorem sit. Consequuntur
                        harum voluptatum facilis doloribus, quibusdam commodi sit quam tempore adipisci repudiandae, architecto
                        illum illo deserunt quia inventore?
                        </p>
                        <Link className='demo_link' to="/demo">For demo, click here</Link>
              </div>
                
                        <div className='about_graphics'>
                          <div className='about_circle'></div>
                          <img className='about_img' src={Drone1}/>
                        </div>
                        
                </div>
    </div>
   
  )
}

export default AboutPage