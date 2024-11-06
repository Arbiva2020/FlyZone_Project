import React, {useState, useEffect} from 'react';
import './CopyOfGenerateTestPage.css';
import SideBar from '../../components/SideBar/SideBar';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import Slider from '@mui/material/Slider';
import Button from '../../components/Generic/Button/Button';
import {testGeneratingConditions, testGeneratingElements} from '../GenerateTest/GenerateTestData'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import CustomSelect from "../../components/Generic/Select/Select";
import UserSideData from '../../components/UserSideData/UserSideData';
import { useDispatch, useSelector } from 'react-redux';
import InfoPopup from '../../components/InfoPopup/InfoPopup';
import { setGroupOptions, setPilotOptions, setTestForm, setTestGenerationFormData, setDroneOptions } from '../../store/slices/testSlice';
import { droneData } from '../DroneTypePage/droneData';
import map1 from "../../assets/map1.png"
import { maps } from "../../dataFake"


const CopyOfGenerateTestPage = () => {
const {id} = useParams
const dispatch = useDispatch();
const {companies:companiesDb, allUsersPrimary:users} = useSelector(state => state.users)
const {missions, scenarios, maps, windSpeed, fogDensity, testForm, groupsOptions, pilotOptions, sliderForm, droneOptions} = useSelector(state => state.testFlight)
const [hover, setHover] = useState(false);
const [openPopup, setOpenPopup] = useState(false)
const [popupInfo, setPopupInfo] = useState({content:""})




const handleTestForm = (name, value) => {
  dispatch(setTestForm({name,value}))
}

const handleCompanySelected = (name,value) => {
  handleTestForm(name,value)
  const chosenCompany = companiesDb.find(cmp => cmp.name === value)
  const chosenCompanyGroups = chosenCompany.groups
  dispatch(setGroupOptions(chosenCompanyGroups))
}

const handleGroupSelected = (name,value) => {
  handleTestForm(name,value)
  const designatedPilots = users.filter(user => user.group_name === value && user.company_name === testForm.company)
  console.log(designatedPilots)
  const tweakedPilotInfoForSelect = designatedPilots.map(pilot => ({
    name: `${pilot.firstName} ${pilot.lastName}`, // Use space between names
    id: pilot.id
  }));
  dispatch(setPilotOptions(tweakedPilotInfoForSelect))
}



useEffect(() => {
  dispatch(setTestGenerationFormData())
},[])


const setPopupInfoHandler = (moreData) => {
    const newObj = { content: moreData };
    setPopupInfo(newObj);
  };

useEffect(() => {
    if (popupInfo.content) {
        console.log('gothere 2', openPopup)
      setOpenPopup(!openPopup);
    }
  }, [popupInfo]);



function valuetext(value) {
  return `Level ${value}`;
}

const handleAssignTestToUser = () =>{
  console.log(`test assigned to /generate/${id}`)
    // navigate(`/user/${id}`)
}


let sizeOptions = companiesDb?.map(a=> a.size)


      return (
    <div className='generateTest_main'>
        <AuthHeader />
        <div>
            <div className='generateTest_content'>
                <div>
                    <SideBar currentUserId={id}/>
                </div>
                <div className='generateTest_generate'>
                    <div className='generateTest_headline'>
                        New level generation by admin
                    </div>
                    <div className='generate_infoText' style={{display:"flex", alignSelf:"baseline", marginBottom:"5px"}}>{`Generation of a new test as a bypass to the aoutomated test`}</div>
                    {openPopup && (
                        <InfoPopup
                            isOpen={openPopup}
                            onCancel={() => setOpenPopup(false)}
                        >
                        {/* <p>{popupInfo.content}</p> */}
                        <div style={{}}>
                            <p>By clicking APPLY the next level will be generated</p>
                            <p>according to the admin level generation data</p>
                        </div>
                            
                        </InfoPopup>
                    )}
                  <div className='generatetest_centerGeneration'>
                    {/* <div className='generatetest_select'>
                        <FormControl style={{display:"flex", flexDirection:"row"}}>
                          <CustomSelect name="company" title="Company" onChange={handleCompanySelected} value={testForm.company} options={companiesDb} />
                          <CustomSelect name="groups" title="Groups" disabled={groupsOptions?.length === 0} onChange={handleGroupSelected} value={testForm.groups} options={groupsOptions || []} />
                          <CustomSelect name="pilot" title="Pilot" onChange={handleTestForm} value={testForm.pilot} options={pilotOptions} />
                        </FormControl>
                      </div> */}
                    <div className='generate_frames'>
                      <div className="genertateTest_scaling">
                        <div className='geberateTest_up'>
                          <div className='scaling_left'>
                            <div className='left_headline'>Mission main parameters:</div>
                                    <div className='generate_environment'>
                                      <FormControl style={{display:"flex", flexDirection:"column"}}>
                                      <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Scenario:</Link></div>
                                        <CustomSelect 
                                          label="Choose scenario" 
                                          name="scenario"
                                          title="Checkpoints"
                                          onChange={handleTestForm}
                                          value={testForm.scenario}
                                          options={scenarios}
                                        />
                                      <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Mission Type:</Link></div>
                                      <CustomSelect
                                          labelId="select-mission-change"
                                          id="select-mission-change"
                                          name="mission"
                                          title="Shortest route"
                                          value={testForm.mission}
                                          label="Assessment type"
                                          onChange={handleTestForm}
                                          options={missions}
                                        />
                                      <div className='generate_environment_text'><Link to="/mapAndMission" style={{color:"white", textDecoration:"none"}}>Map:</Link></div>
                                      <CustomSelect 
                                          label="Choose map" 
                                          id="select-map-change"
                                          title="Industrial area"
                                          name="map"
                                          value={testForm.map}
                                          onChange={handleTestForm}
                                          options={maps}
                                        />
                                        <div className='generate_environment_text'><Link to="/chooseDrone" style={{color:"white", textDecoration:"none"}}>Drone type:</Link></div>
                                      <CustomSelect 
                                          label="Choose drone" 
                                          id="select-drone-change"
                                          title="M300"
                                          name="drone"
                                          value={testForm.drone}
                                          onChange={handleTestForm}
                                          options={droneData}
                                        />
                                      </FormControl>
                                    </div>   
                              </div>
                          <div className='scaling_right'>
                              <div className='right_headline'>Mission scope parameters:</div>
                                <div className='generate_parameters'>{testGeneratingConditions.map((data) => 
                                  <div className='generate_parameter'>
                                    <div className='generate_text'>
                                      {data.title}
                                    </div>
                                    <Slider 
                                      defaultValue={1}
                                      getAriaValueText={valuetext}
                                      step={data.step}
                                      min={data.min}
                                      max={data.max}
                                      marks={true}
                                      disabled={false}
                                      name="timeToFinish"
                                      valueLabelDisplay="auto"
                                      aria-label="small steps"
                                      style={{color: "#7c6d94"}}
                                      onChange={(e) => handleTestForm(e.target.name, e.target.value)}
                                    />
                                  </div>
                                    )}
                                </div>
                              </div>
                            </div>
                      </div>
                      <div className="genertateTest_scaling">
                        <div className='geberateTest_up'>
                          <div className='scaling_left'>
                            <div className='left_headline'>Environment parameters:</div>
                                  <div className='generate_selectGroup'>
                                    <div className='generate_environment'>
                                    <FormControl style={{display:"flex", flexDirection:"column"}}>
                                    <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Wind speed (m/h):</Link></div>
                                      <CustomSelect name="wind" title="Wind" onChange={handleTestForm} value={testForm.wind} options={windSpeed} />
                                      <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Fog density (mg/m^3):</Link></div>
                                      <CustomSelect name="fog_density" title="Fog density" onChange={handleTestForm} value={testForm.fog_density} options={fogDensity} />
                                      <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Wind direction (deg.):</Link></div>
                                      <CustomSelect name="wind_direction" title="Wind Direction" onChange={handleTestForm} value={testForm.wind_direction} options={windSpeed} />
                                    </FormControl>
                                    </div>
                                  </div>
                            </div>
                          <div className='scaling_right'>
                            <div className='right_headline'>Other variables:</div>
                              <div className='generate_parameters'>{testGeneratingElements.map((data) => 
                                <div className='generate_parameter'>
                                  <div className='generate_text'>
                                    {data.title}
                                  </div>
                                    <Slider 
                                      defaultValue={1}
                                      getAriaValueText={valuetext}
                                      step={data.step}
                                      min={data.min}
                                      max={data.max}
                                      marks={true}
                                      disabled={false}
                                      valueLabelDisplay="auto"
                                      aria-label="small steps"
                                      name="wind"
                                      style={{color: "#7c6d94"}}
                                      onChange={(e) => handleTestForm(e.target.name, e.target.value)}
                                    />
                                </div>
                                  )}
                              </div>
                          </div>
                        </div>
                        <div className='scaling_bottom'>
                          <div className='left_headline'>Info headline</div>
                          <div className='generate_infoText'>{`Hello, Almog. This is a test generated by the admin. Hence, the information gatherd will not be saved to DB.`}</div>
                        </div>
                    </div>
                    <div className='copyGenerate_map'>
                        <div className='copyGenerate_mapHolder'>
                            <img src={map1} style={{width:"100%"}}></img>
                            <p style={{width:"100%", fontWeight:"550", lineHeight:"30px"}}>{maps.name}</p>
                            <p style={{width:"100%", fontWeight:"200", lineHeight:"30px"}}>{maps.description}</p>

                        </div>
                    </div>
                  </div>
                    <div className='generateTest_button'>
                      <Button 
                        text="Generate"
                        onClick={setPopupInfoHandler}
                      />
                    </div>
                    <div className='generateTest_down'> 
                      {/* <switch></switch> */}
                      {/* {handleAssignTestToUser ? <progress className='genertateTest_progress'></progress> : <Button customStyles={{}} onClick={handleAssignTestToUser}/>}  */}
                    </div> 
                  </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default CopyOfGenerateTestPage