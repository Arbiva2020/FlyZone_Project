import React, { useState, useEffect } from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "../../components/Generic/Input/Input";
import "../MapAndMissionPage/MapAndMissionPage.css";
import { FaSearch } from "react-icons/fa";
import { maps } from "../../dataFake";
import { setTestForm } from "../../store/slices/testSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfoPopup from "../../components/InfoPopup/InfoPopup.jsx";

function MapAndMissionPage() {
  const [filterMaps, setFilterMaps] = React.useState(maps);
  const [openMap, setOpenMap] = React.useState(false);
  const [mapInfo, setMapInfo] = useState({ headline: "", additionalData: "", name: ""});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleChooseMap = () => {
    dispatch(setTestForm({ name: "map", value: mapInfo.name }));
    navigate(-1);
    console.log("click")
  };

  const handleInputChange = (val) =>
    setFilterMaps(
      maps.filter((map) => map.characteristics.join(", ").includes(val))
    );

  const setMapInfoHandler = (header, moreData) => {
    const newObj = { name: header, additionalData: moreData };
    setMapInfo(newObj);
  };

  useEffect(() => {
    if (mapInfo.name || mapInfo.additionalData) {
        console.log('gothere 2', openMap)
      setOpenMap(!openMap);
    }
  }, [mapInfo]);

  return (
    <div className="mapAndMission_main">
      <AuthHeader />
      <div className="mapAndMission_content">
        <SideBar />
        <div className="mapAndMission_body">
          <div className="mapAndMission_hedline">
            Map Types and Characteristics
          </div>
          <div className="mapAndMission_operations">
            <Input
              autoComplete={"off"}
              placeholder="Search"
              onChange={(e) => handleInputChange(e.target.value)}
              customStyles={{ width: "300px" }}
            />
            <i className="users_icon">
              <FaSearch />
            </i>
          </div>
          <div className="mapAndMission_cards">
            {filterMaps.map((mapa, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: 300,
                  backgroundColor: "gray",
                  borderStyle: "solid",
                  borderColor: "white",
                  borderWidth: "1px",
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <CardMedia>
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={mapa.name}
                      height="140"
                      image={mapa.map}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    ></CardMedia>
                    <Typography gutterBottom variant="h5" component="div">
                      {mapa.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {mapa.description}
                    </Typography>
                    <CardActions>
                      <Button
                        size="small"
                        style={{
                          color: "white",
                          borderStyle: "solid",
                          borderColor: "white",
                          borderWidth: "1px",
                          borderRadius: "10px",
                          marginTop: "10px",
                        }}
                        onClick={() =>
                          setMapInfoHandler(mapa.name, mapa.additionalData)
                        }
                      >
                        Learn More
                      </Button>
                      <Button
                        size="small"
                        style={{
                        color: "white",
                        borderStyle: "solid",
                        borderColor: "white",
                        borderWidth: "1px",
                        borderRadius: "10px",
                        marginTop: "10px",
                        }}
                        onClick={handleChooseMap}
                      >
                        Select Map
                      </Button>
                    </CardActions>
                  </CardContent>
                </CardMedia>
              </Card>
            ))}
            {openMap && (
              <InfoPopup
                isOpen={openMap}
                headline={mapInfo.name}
                onCancel={() => setOpenMap(false)}
                onClick={handleChooseMap}
              >
                <p>{mapInfo.additionalData}</p>
              </InfoPopup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapAndMissionPage;
