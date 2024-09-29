import React, {useState, useEffect} from 'react';
import './GenerateTest.css';
import SideBar from '../../components/SideBar/SideBar';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import Slider from '@mui/material/Slider';
import Button from '../../components/Generic/Button/Button';
import '../../fakeData.json';
import { companiesDb, missions, scenarios, maps, users, windSpeed, fogDensity } from '../../dataFake'
import {testGeneratingConditions} from '../GenerateTest/GenerateTestData'
import {FiInfo} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomSelect from "../../components/Generic/Select/Select";
import UserSideData from '../../components/UserSideData/UserSideData';
import { useDispatch, useSelector } from 'react-redux';
import { setTestForm, setSliderform } from '../../store/slices/testSlice';

const GenerateTest = () => {
const {id} = useParams
const dispatch = useDispatch();
const testForm = useSelector(state => state.test.testForm);
const sliderForm = useSelector(state => state.test.sliderForm);
const [hover, setHover] = useState(false);
const [selectScenario, setSelectScenario] = React.useState("");
const [selectMissionType, setSelectMissionType] = React.useState("");
const [selectMap, setSelectMap] = React.useState("");



console.log(testForm)

const handleTestForm = (name, value) => {
  dispatch(setTestForm({name,value}))
  console.log(value)
}

const handleGroupChange = (obj) => {
  setTestForm(obj);
};

// const onHover = () => {
//   setHover(true)
// }

// const onLeaveHover = () =>{
//   setHover(false)
// }


// const handleMapChange = (event) => {
//   setSelectMap(event.target.value);
//   console.log(event.target)
// }

function valuetext(value) {
  return `Level ${value}`;
}

const handleAssignTestToUser = () =>{
  console.log(`test assigned to /generate/${id}`)
    // navigate(`/user/${id}`)
}

let sizeOptions = companiesDb.map(a=> a.size)
// console.log(sizeOptions)
let needed = companiesDb.map(function(value){
  return value.name
})

console.log(companiesDb[2].groups)

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
                        Generate Test
                    </div>
                  <div className='generatetest_centerGeneration'>
                    <div className='generatetest_select'>
                        <FormControl style={{display:"flex", flexDirection:"row"}}>
                          <CustomSelect name="company" title="Company" onChange={handleTestForm} value={testForm.company} options={companiesDb} />
                          <CustomSelect name="group" title="Group" onChange={handleTestForm} value={testForm.pilot} options={companiesDb} />
                          <CustomSelect name="pilot" title="Pilot" onChange={handleTestForm} value={testForm.pilot} options={companiesDb} />
                        </FormControl>
                      </div>
                    <div className='generate_frames'>
                      <div className="genertateTest_scaling">
                        <div className='geberateTest_up'>
                          <div className='scaling_left'>
                            <div className='left_headline'>Environment parameters:</div>
                                    <div className='generate_environment'>
                                      <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Scenario:</Link>
                                        {/* <Link className='information_link' to="/scenarioAndMission" onMouseLeave={onLeaveHover}>
                                          <sup style={{color:"white"}}>
                                            {hover ? "scenarios" : 
                                              <FiInfo 
                                              style={{fontSize:"100%", color:"white"}}
                                              onMouseEnter={onHover}
                                            />
                                            }
                                          </sup>
                                        </Link>  */}
                                      </div>
                                      <div className='generate_environment_select'> 
                                      <FormControl sx={{m: 1, minWidth: 120}}>
                                        {/* <InputLabel id="select-generateTest-label">Select scenario</InputLabel> */}
                                        <CustomSelect 
                                          label="Choose scenario" 
                                          name="scenario"
                                          title="Choose scenario"
                                          onChange={handleTestForm}
                                          value={testForm.scenario}
                                          options={scenarios}
                                        />
                                      </FormControl>
                                      </div>
                                    </div>
                                    <div className='generate_environment'>
                                      <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Mission Type:</Link></div>
                                      <div className='generate_environment_select'>

                                      <FormControl sx={{m: 1, minWidth: 120}}>
                                        {/* <InputLabel id="select-generateTest-label">Select mission</InputLabel> */}
                                        <CustomSelect
                                          labelId="select-mission-change"
                                          id="select-mission-change"
                                          name="mission"
                                          title="Mission scenario"
                                          value={testForm.mission}
                                          label="Assessment type"
                                          onChange={handleTestForm}
                                          options={missions}
                                        />
                                      </FormControl>
                                      </div>
                                    </div>

                                    <div className='generate_environment'>
                                      <div className='generate_environment_text'><Link to="/mapAndMission" style={{color:"white", textDecoration:"none"}}>Map:</Link></div>
                                      <div className='generate_environment_select' style={{display:"flex", alignItems:"center"}}>
                                      <FormControl sx={{m: 1, minWidth: 120}}>
                                        {/* <InputLabel id="select-generateTest-label">Select map</InputLabel> */}
                                        <CustomSelect 
                                          label="Choose map" 
                                          id="select-map-change"
                                          title="Choose map"
                                          name="map"
                                          value={testForm.map}
                                          onChange={handleTestForm}
                                          options={maps}
                                        />
                                    
                                      </FormControl>
                                      {/* <Link className='information_link' to="/mapAndMission">
                                        <sup>
                                          <FiInfo 
                                            style={{fontSize:"100%", color:"white"}}
                                          />
                                        </sup>
                                      </Link>  */}
                                      </div>
                                    </div>
                          </div>
                          <div className='scaling_right'>
                              <div className='right_headline'>Mission scope parameters:</div>
                              <div>
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
                      </div>
                      <div className="genertateTest_scaling">
                        <div className='geberateTest_up'>
                          <div className='scaling_left'>
                            <div className='left_headline'>Environment parameters:</div>
                                  <div className='generate_selectGroup'>
                                    <div className='generate_environment'>
                                    <FormControl style={{display:"flex", flexDirection:"column"}}>
                                      <CustomSelect name="wind" title="Wind" onChange={handleTestForm} value={testForm.wind} options={windSpeed} />
                                      <CustomSelect name="fog_density" title="Fog density" onChange={handleTestForm} value={testForm.fog_density} options={fogDensity} />
                                      <CustomSelect name="wind_direction" title="Wind Direction" onChange={handleTestForm} value={testForm.wind_direction} options={windSpeed} />
                                    </FormControl>
                                    </div>
                                  </div>
                            </div>
                          <div className='scaling_right'>
                            <div className='right_headline'>Other variables:</div>
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
                          <div className='generate_infoText'>{`Hello, ${users.generateTest_userSideDataname}. This is a test generated by the admin. Hence, the information gatherd will not be saved to DB.`}</div>
                        </div>
                    </div>
                  </div>
                    <div className='generateTest_button'>
                      <Button 
                        text="Generate"
                        onClick={handleAssignTestToUser}
                      />
                    </div>
                    <div className='geberateTest_down'> 
                      {/* <switch></switch> */}
                      {handleAssignTestToUser ? <progress className='genertateTest_progress'></progress> : <Button customStyles={{}} onClick={handleAssignTestToUser}/>} 
                    </div> 
                  </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default GenerateTest