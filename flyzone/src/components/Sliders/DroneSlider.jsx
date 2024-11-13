import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./DroneSlider.css"
import { camelCaseToWords } from "../../utils/fromCAmelCaseToWords";

const DroneSlider = ({droneData, droneInfoPopup ,id}) => {

  const slideLeft = () => {
    let slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    let slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft += 500;
  };

  return (
    <>
      <h3>{camelCaseToWords(id)}</h3>
      <div className="drone_horizontal">
        <FaChevronLeft
          className="drone_chevron"
          style={{ height: "80%", width: "20", cursor: "pointer" }}
          onClick={slideLeft}
        />
        <div id={id} className="drone_slider">
          {droneData.map((item) => (
            <img
              className="drone_img"
              src={item.img}
              alt="/droneimg"
              onClick={() => droneInfoPopup(item.name, item.specialFeatures)}
            />
          ))}
        </div>
        <FaChevronRight
          className="drone_chevron"
          style={{ height: "80%", width: "20" }}
          onClick={slideRight}
        />
      </div>
    </>
  );
};

export default DroneSlider;
