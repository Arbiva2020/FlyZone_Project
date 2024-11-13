import React, { useState, useEffect, useMemo } from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { droneData } from "./droneData";
import InfoPopup from "../../components/InfoPopup/InfoPopup.jsx";
import "./DroneTypePage.css";
import { setTestForm } from "../../store/slices/testSlice.js";
import { useNavigate } from "react-router-dom";
import DroneSlider from "../../components/Sliders/DroneSlider.jsx";

function DroneTypePage() {
  const { chosenUser } = useSelector((state) => state.users);
  const [openDroneInfo, setOpenDroneInfo] = useState(false);
  const [droneInfo, setDroneInfo] = useState({ specialFeatures: "", name: "" });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleChooseDrone = () => {
    dispatch(setTestForm({ name: "drone", value: droneInfo.name }));
    navigate(-1);
  };

  const droneDataTypes = useMemo(() => {
    return [...new Set(droneData.map((drone) => drone.type))];
  }, [droneData]);

  useEffect(() => {
    if (droneInfo.name || droneInfo.specialFeatures) {
      setOpenDroneInfo(!openDroneInfo);
    }
  }, [droneInfo]);

  const droneInfoPopup = (header, moreData) => {
    const newObj = { name: header, specialFeatures: moreData };
    setDroneInfo(newObj);
  };

  return (
    <div className="drone_main">
      <AuthHeader />
      <div className="drone_mainContent">
        <div className="drone_sideContent">
          <SideBar currentUserId={chosenUser?.id} />
        </div>
        <div className="drone_content">
          <div className="drone_headline">Choose mission drone type</div>
          <div className="drone_search"></div>
          <div className="drone_gallery">
            {droneDataTypes?.map((type) => (
              <DroneSlider
                droneInfoPopup={droneInfoPopup}
                droneData={droneData.filter((drone) => drone.type === type)}
                id={type}
              />
            ))}
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
                  <ul>
                    {droneInfo.specialFeatures?.map((feature) => (
                      <li>{feature}</li>
                    ))}
                  </ul>
                </InfoPopup>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DroneTypePage;
