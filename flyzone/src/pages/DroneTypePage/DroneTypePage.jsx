import React from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import { useSelector } from 'react-redux';
import { droneData } from "./droneData";
import "./DroneTypePage.css";

function DroneTypePage() {
    const {chosenUser} = useSelector(state => state.users)

  return (
    <div className="drone_main">
        <AuthHeader />
        <div className="drone_mainContent">
            <div className='drone_sideContent'>
            <SideBar currentUserId={chosenUser?.id}/>
            </div>
            <div className="drone_content">
                <div className="drone_headline">Choose mission drone type</div>
                <div className="drone_search"></div>
                <div className="drone_gallery">
                    <div className="drone_horizontal">
                        {droneData.map((item)=> (
                            <img className="drone_img"
                                src={item.img} 
                                alt="/droneimg" />
                        ))}
                    </div>
                </div>
                <div className="drone_info"></div>
            </div>
        </div>
    </div>
  )
}

export default DroneTypePage
