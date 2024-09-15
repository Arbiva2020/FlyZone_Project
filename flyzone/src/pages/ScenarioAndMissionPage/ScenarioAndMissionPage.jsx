import React, { useState, useEffect } from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import Input from "../../components/Generic/Input/Input";
import { FaSearch } from "react-icons/fa";
import { scenarios } from "../../dataFake";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../ScenarioAndMissionPage/ScenarioAndMissionPage.css";
import { setTestForm } from "../../store/slices/testSlice";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";


function ScenarioAndMissionPage() {
    const [filterScenarios, setFilterScenarios] = React.useState(scenarios);
    const [openMap, setOpenMap] = React.useState(false);
const dispatch = useDispatch();
const navigate = useNavigate()

    const handleTestForm = (name, value) => {
      dispatch(setTestForm({name,value}))
      console.log(value)
    }
    
    const handleInputChange = (val) =>
        setFilterScenarios(
            scenarios.filter((scenario) => scenario.key_words.join(", ").includes(val))
        );

    // const [mapInfo, setMapInfo] = useState({ headline: "", additionalData: "", name: ""});
  return (
    <div className="scenarioAndMission_main">
      <AuthHeader />
      <div className="scenarioAndMission_content">
        <SideBar />
        <div className="scenarioAndMission_body">
          <div className="scenarioAndMission_hedline">
            Mission scenarios 
          </div>
          <div className="scenarioAndMission_operations">
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
          <div className="scenarioAndMission_cards">
            {filterScenarios.map((scenario, index) => (
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
                    {/* <CardMedia
                      component="img"
                      alt={scenario.name}
                      height="140"
                      image={scenario.map}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    ></CardMedia> */}
                    <Typography gutterBottom variant="h5" component="div">
                      {scenario.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {scenario.description}
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
                         onClick={() => {
                          handleTestForm("scenario", scenario.name)
                          navigate(-1)
                         }}
                      >
                        Apply scenario
                      </Button>
                    </CardActions>
                  </CardContent>
                </CardMedia>
              </Card>
            ))}
            {openMap && (
              <InfoPopup
                // isOpen={openMap}
                // headline={mapInfo.name}
                // onCancel={() => setOpenMap(false)}
              >
                <p></p>
                dsaldsaklasjdsakljasdkla
              </InfoPopup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScenarioAndMissionPage
