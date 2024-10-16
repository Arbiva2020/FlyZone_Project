import React, {useState, useEffect} from 'react';
import './GenerateTest.css';
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
import { setGroupOptions, setPilotOptions, setTestForm, setTestGenerationFormData } from '../../store/slices/testSlice';


const GenerateTest = () => {
const {id} = useParams
const dispatch = useDispatch();
const {companies:companiesDb, allUsersPrimary:users} = useSelector(state => state.users)
const {missions, scenarios, maps, windSpeed, fogDensity, testForm, groupsOptions, pilotOptions, sliderForm} = useSelector(state => state.testFlight)
const [hover, setHover] = useState(false);




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
                        Generate Test
                    </div>
                  <div className='generatetest_centerGeneration'>
                    <div className='generatetest_select'>
                        <FormControl style={{display:"flex", flexDirection:"row"}}>
                          <CustomSelect name="company" title="Company" onChange={handleCompanySelected} value={testForm.company} options={companiesDb} />
                          <CustomSelect name="groups" title="Groups" disabled={groupsOptions?.length === 0} onChange={handleGroupSelected} value={testForm.groups} options={groupsOptions || []} />
                          <CustomSelect name="pilot" title="Pilot" onChange={handleTestForm} value={testForm.pilot} options={pilotOptions} />
                        </FormControl>
                      </div>
                    <div className='generate_frames'>
                      <div className="genertateTest_scaling">
                        <div className='geberateTest_up'>
                          <div className='scaling_left'>
                            <div className='left_headline'>Environment parameters:</div>
                                    <div className='generate_environment'>
                                      <FormControl style={{display:"flex", flexDirection:"column"}}>
                                      <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Scenario:</Link></div>
                                        <CustomSelect 
                                          label="Choose scenario" 
                                          name="scenario"
                                          title="Choose scenario"
                                          onChange={handleTestForm}
                                          value={testForm.scenario}
                                          options={scenarios}
                                        />
                                      <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Mission Type:</Link></div>
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
                                      <div className='generate_environment_text'><Link to="/mapAndMission" style={{color:"white", textDecoration:"none"}}>Map:</Link></div>
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
                                    <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Wind speed:</Link></div>
                                      <CustomSelect name="wind" title="Wind" onChange={handleTestForm} value={testForm.wind} options={windSpeed} />
                                      <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Fog density:</Link></div>
                                      <CustomSelect name="fog_density" title="Fog density" onChange={handleTestForm} value={testForm.fog_density} options={fogDensity} />
                                      <div className='generate_environment_text'><Link to="/scenarioAndMission" style={{color:"white", textDecoration:"none"}}>Wind direction:</Link></div>
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

export default GenerateTest