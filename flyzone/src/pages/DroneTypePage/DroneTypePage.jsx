import React, {useState, useEffect} from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import { useDispatch, useSelector } from 'react-redux';
import { droneData } from "./droneData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import InfoPopup from "../../components/InfoPopup/InfoPopup.jsx";
import Button from "../../components/Generic/Button/Button.jsx"
import "./DroneTypePage.css";
import { setTestForm } from "../../store/slices/testSlice.js";
import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";

function DroneTypePage() {
    const {chosenUser} = useSelector(state => state.users)
    const [openDroneInfo, setOpenDroneInfo] = useState(false)
    const [droneInfo, setDroneInfo] = useState({ specialFeatures: "", name: ""});
    const navigate = useNavigate()

const dispatch = useDispatch()
    const handleChooseDrone = () => {
        dispatch(setTestForm({name:"drone", value:droneInfo.name}))
        navigate(-1)
    }


    const slideLeft = () => {
        let slider = document.getElementById("slider")
        slider.scrollLeft = slider.scrollLeft -= 500
    };

    const slideRight = () => {
        let slider = document.getElementById("slider")
        slider.scrollLeft = slider.scrollLeft += 500
    };

    useEffect(() => {
        if (droneInfo.name || droneInfo.specialFeatures) {
            // console.log('gothere 2', openDroneInfo)
          setOpenDroneInfo(!openDroneInfo);
        }
      }, [droneInfo]);

    const droneInfoPopup = (header, moreData) => {
        const newObj = { name: header, specialFeatures: moreData };
        setDroneInfo(newObj);
    }

    // const lis = droneData.map((item)=> Object.values(droneData.specialFeatures))
    // console.log(droneData[i].specialFeatures[i])

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
                <h3>Camera Drones</h3>
                    <div className="drone_horizontal">
                        <FaChevronLeft className="drone_chevron" style={{height:"80%", width:"20", cursor:"pointer"}} onClick={slideLeft}/>
                            <div id="slider" className="drone_slider">
                                {droneData.map((item)=> (
                                    <img className="drone_img"
                                        src={item.img} 
                                        alt="/droneimg"
                                        onClick={() =>
                                            droneInfoPopup(item.name, item.specialFeatures)
                                        } 
                                    />
                                ))}
                            </div>
                        <FaChevronRight className="drone_chevron" style={{height:"80%", width:"20"}} onClick={slideRight}/>
                    </div>
                    <h3>Security Drones</h3>
                    <div className="drone_horizontal">
                        <FaChevronLeft className="drone_chevron" style={{height:"80%", width:"20", cursor:"pointer"}} onClick={slideLeft}/>
                            <div id="slider" className="drone_slider">
                                {droneData.map((item)=> (
                                    <img className="drone_img"
                                        src={item.img} 
                                        alt="/droneimg"
                                        onClick={() =>
                                            droneInfoPopup(item.name, item.specialFeatures)
                                        } 
                                    />
                                ))}
                            </div>
                        <FaChevronRight className="drone_chevron" style={{height:"80%", width:"20"}} onClick={slideRight}/>
                    </div>
                </div>
                <div className="drone_info">
                    <div className="drone_infoBox">
                    {openDroneInfo && (
                        <InfoPopup
                        onClick={handleChooseDrone}
                            isOpen={openDroneInfo}
                            headline={droneInfo.name}
                            onCancel={() => setOpenDroneInfo(false)}
                         >
                        <p>{droneInfo.specialFeatures}</p>
                        </InfoPopup>
                    )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DroneTypePage
