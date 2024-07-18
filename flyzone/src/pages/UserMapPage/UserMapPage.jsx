import React from 'react'
import AuthHeader from '../../components/AuthHeader/AuthHeader'
import SideBar from '../../components/SideBar/SideBar'
import Button from '../../components/Generic/Button/Button'
import UserSideData from '../../components/UserSideData/UserSideData'
import Map from '../../assets/map.png'
import Select from '../../components/Generic/Select/Select'
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import './UserMapPage.css'

const UserMapPage = () => {
    const {id} = useParams
    console.log(id)

    const [mapview, setMapView] = React.useState("")
    const [assessmentProperties, setAssessmentProperties] = React.useState("")
    const [testNum, setTestNum] = React.useState("")
    const [mapType, setMapType] = React.useState("")

    const handleMapView = (event) => {
        setMapView(event.target.value);
    }

    const handleTestNum = (event) => {
        setTestNum(event.target.value);
    }

  return (
    <div className='userMap_main'>
        <AuthHeader />
        <div className='userMap_content'>
            <div className='userMap_sidebar'>
                <SideBar />
            </div>
            <div className='userMap_middle'>
                <div className='userMap_headline'>
                    Map routes and details
                </div>
                <div className='userMap_mapAndData'>
                    <div className='userMap_dataAndSelect'>
                        <div className='userMap_data'>
                            <div className='userMap_dataHeadline'>Assessment properties</div>
                            <div className='userMap_style'>
                            <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel id="select-main-view-label">Test number</InputLabel>
                                <Select
                                    labelId="select-map-label"
                                    id="select-map-id"
                                    value={testNum}
                                    label="Assessment type"
                                    onChange={handleTestNum}
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
                                    <MenuItem value={"1"}>1</MenuItem>
                                    <MenuItem value={"2"}>2</MenuItem>
                                    <MenuItem value={"3"}>3</MenuItem>
                                    <MenuItem value={"4"}>4</MenuItem>

                                </Select>
                            </FormControl> 
                            </div>
                            <div className='userMap_style'>
                                Type of map: {""} 
                            </div>
                            <div className='userMap_style'>
                                Type of map: {""} 
                            </div>
                            <div className='userMap_style'>
                                Type of map: {""} 
                            </div>
                            <div className='userMap_selections'>
                            <Button
                                text="Compare"
                                customStyles={{border:"none", backgroundColor:"none"}}
                            />
                        </div>
                        </div>
                    </div>
                    <div className='userMap_map'>
                        <img  className="userMap_img" src={Map}/>
                    </div>
                </div>
            </div>
            <div className='userMap_right'>
                <UserSideData />
            </div>
        </div>
        
    </div>
  )
}

export default UserMapPage