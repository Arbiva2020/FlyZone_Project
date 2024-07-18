import React, { useEffect } from 'react'
import './UserReport.css'
import AuthHeader from "../../components/AuthHeader/AuthHeader"; 
import SideBar from "../../components/SideBar/SideBar";
import UserSideData from "../../components/UserSideData/UserSideData"
import Button from "../../components/Generic/Button/Button"
import Input from "../../components/Generic/Input/Input"
import PieChart from "../../components/PieChart/PieChart"
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
import '../../fakeData.json'


const UserReport = () => {
  const [pros, setPros] = React.useState('');
  const [cons, setCons] = React.useState('');
  const [valueSelect, setValueSelect] = React.useState('');
  const [formContent, setFormContent] = React.useState();

  useEffect(() => {

  }, [])

  const handleChange = (event) => {
    setValueSelect(event.target.value);
    console.log(event.target.value)
  };

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
                <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="select-main-view-label">Select Company</InputLabel>
                  <Select
                      labelId="select-main-view-label"
                      id="select-main-view-id"
                      value={valueSelect}
                      label="Assessment type"
                      onChange={handleChange}
                      inputProps={{
                        MenuProps: {
                            MenuListProps: {
                                sx: {
                                    backgroundColor: 'rgb(45, 43, 43)',
                                    color: "white",
                                },
                            }
                        }
                    }}
                  >
                    <MenuItem value="/">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"a"}>Group 1 from db</MenuItem>
                    <MenuItem value={"b"}>Group 2 from db</MenuItem>
                    <MenuItem value={"c"}>Group 3 from db</MenuItem>
                    <MenuItem value={"d"}>Group 4 from db</MenuItem>
                  </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="select-main-view-label">Select Group</InputLabel>
                  <Select
                      labelId="select-main-view-label"
                      id="select-main-view-id"
                      // value={}
                      label="Assessment type"
                      // onChange={}
                      inputProps={{
                        MenuProps: {
                            MenuListProps: {
                                sx: {
                                    backgroundColor: 'rgb(45, 43, 43)',
                                    color: "white",
                                },
                            }
                        }
                    }}
                  >
                    <MenuItem value="/">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"a"}>Group 1 from db</MenuItem>
                    <MenuItem value={"b"}>Group 2 from db</MenuItem>
                    <MenuItem value={"c"}>Group 3 from db</MenuItem>
                    <MenuItem value={"d"}>Group 4 from db</MenuItem>
                  </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="select-main-view-label">Select Pilot</InputLabel>
                  <Select
                      labelId="select-main-view-label"
                      id="select-main-view-id"
                      // value={}
                      label="Assessment type"
                      // onChange={}
                      inputProps={{
                        MenuProps: {
                            MenuListProps: {
                                sx: {
                                    backgroundColor: 'rgb(45, 43, 43)',
                                    color: "white",
                                },
                            }
                        }
                    }}
                  >
                    <MenuItem value="/">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"a"}>Group 1 from db</MenuItem>
                    <MenuItem value={"b"}>Group 2 from db</MenuItem>
                    <MenuItem value={"c"}>Group 3 from db</MenuItem>
                    <MenuItem value={"d"}>Group 4 from db</MenuItem>
                  </Select>
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