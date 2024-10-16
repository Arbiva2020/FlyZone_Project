import React, { useEffect } from 'react'
import './UserReport.css'
import AuthHeader from "../../components/AuthHeader/AuthHeader"; 
import SideBar from "../../components/SideBar/SideBar";
import UserSideData from "../../components/UserSideData/UserSideData"
import Button from "../../components/Generic/Button/Button"
import Input from "../../components/Generic/Input/Input"
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Select from "../../components/Generic/Select/Select";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FiPrinter } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import CustomSelect from '../../components/Generic/Select/Select';
import { setGroupOptions, setPilotOptions, setTestForm, setTestGenerationFormData } from '../../store/slices/testSlice';
import { companiesDb, allUsers } from '../../dataFake';
import { useDispatch, useSelector } from 'react-redux';




const UserReport = () => {
  const dispatch = useDispatch()
  const {companies:companiesDb, allUsersPrimary:users} = useSelector(state => state.users)
  const {missions, scenarios, maps, windSpeed, fogDensity, testForm, groupsOptions, pilotOptions, sliderForm} = useSelector(state => state.testFlight)
  const [pros, setPros] = React.useState('');
  const [cons, setCons] = React.useState('');
  const [valueSelect, setValueSelect] = React.useState('');
  const [formContent, setFormContent] = React.useState();

  useEffect(() => {

  }, [])

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
    const tweakedPilotInfoForSelect = designatedPilots.map(pilot => ({
      name: `${pilot.firstName} ${pilot.lastName}`, // Use space between names
      id: pilot.id
    }));
    dispatch(setPilotOptions(tweakedPilotInfoForSelect))
  }

  useEffect(() => {
    dispatch(setTestGenerationFormData())
  },[])

  const [checkedBox, setCheckedBox] = React.useState({
    Time: false,
    Conditions: false,
    Mission: false,
    Battary: false,
    Route: false,
    Connection: false
  });

  const handleCheckedBox = (event) => {
    setCheckedBox({
      ...checkedBox,
      [event.target.name]: event.target.checked,
    });
  };

  const { time, conditions, mission } = checkedBox;
  const { battary, route, connection } = checkedBox;
  const error = [time, conditions, mission].filter((v) => v).length !== 2;
  const secondError = [battary, route, connection].filter((v) => v).length !== 2;

    const handleProsChange = (event) =>{
      setPros(event.target.value);
    }

    const handleConsChange = (event) => {
      setCons(event.target.value);
    }


  return (
    <div className='userReport_main'>
        <AuthHeader />
        <div className='userReport_content'>
            <div className='userReport_sidecontent'>
                <SideBar />
            </div>
          <div className='userReport_page'>
            <div className='userReport_headline'>Manage Personal Report</div>
            <div className='userReport_rightside'>
              <div className='userReport_all'>
                <div className='userreport_select'>
                  <FormControl style={{display:"flex", flexDirection:"row"}}>
                    <CustomSelect 
                      name="company" 
                      title="Company" 
                      onChange={handleCompanySelected} 
                      value={testForm.company} 
                      options={companiesDb} 
                    />
                    <CustomSelect 
                      name="groups" 
                      title="Groups" 
                      disabled={groupsOptions?.length === 0} 
                      onChange={handleGroupSelected} 
                      value={testForm.groups} 
                      options={groupsOptions || []} 
                    />
                    <CustomSelect 
                      name="pilot" 
                      title="Pilot" 
                      onChange={handleTestForm} 
                      value={testForm.pilot} 
                      options={pilotOptions} 
                    />
                  </FormControl>
                </div>
                <div className='userReport_report'>
                  <div className='userReport_inputs'>
                    <Input customStyles={{marginRight:"10px"}}/>
                    <Input customStyles={{marginRight:"10px"}}/>
                  </div>
                  <div className='userReport_view'>
                    <Box sx={{ display: 'flex' }}>
                      <FormControl
                        required
                        error={error}
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                      >
                        <FormLabel component="legend">Pick two</FormLabel>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox sx={{ color: pink[800]}} checked={time} onChange={handleCheckedBox} name="time" />
                            }
                            label="Time managment"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox sx={{ color: pink[800]}} checked={conditions} onChange={handleCheckedBox} name="conditions" />
                            }
                            label="Environmental conditions"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox sx={{ color: pink[800]}} checked={mission} onChange={handleCheckedBox} name="mission" />
                            }
                            label="Mission achievment"
                          />
                        </FormGroup>
                        <FormHelperText>You can display an error</FormHelperText>
                      </FormControl>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                      <FormControl
                        required
                        error={secondError}
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                      >
                        <FormLabel component="legend">Pick two</FormLabel>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox sx={{ color: pink[800]}} checked={battary} onChange={handleCheckedBox} name="battary" />
                            }
                            label="Time managment"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox sx={{ color: pink[800]}} checked={route} onChange={handleCheckedBox} name="route" />
                            }
                            label="Environmental conditions"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox sx={{ color: pink[800]}} checked={connection} onChange={handleCheckedBox} name="connection" />
                            }
                            label="Mission achievment"
                          />
                        </FormGroup>
                        <FormHelperText>You can display an error</FormHelperText>
                      </FormControl>
                  </Box>
                  </div>
                  <textarea
                    rows = {10}    
                    cols = {130}    
                    // value ={}   
                    placeholder = "Add your text"  
                    // wrap = "soft"   
                    // readOnly = {false}   
                    name = "name"   
                    // disabled = {false}   
                    // minLength = {150}   
                    maxLength = {500}   
                    style={{backgroundColor: "darkgrey", marginBottom:"20px", borderColor:"white", borderWidth:"1px", borderStyle:"solid", borderRadius:"20px", padding:"10px"}}
                  />
                  <div className='userReport_button'>
                    <Button />
                    <div className='userreport_icons'>
                      <div className='userreport_icon'><FiPrinter /></div>
                      <div className='userreport_icon'><MdOutlineEmail /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='userReport_userData'>
                <UserSideData />
              </div>
            </div>
          </div> 
        </div>
    </div>
  )
}

export default UserReport