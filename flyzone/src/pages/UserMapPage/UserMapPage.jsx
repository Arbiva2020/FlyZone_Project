import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AuthHeader from '../../components/AuthHeader/AuthHeader'
import SideBar from '../../components/SideBar/SideBar'
import Button from '../../components/Generic/Button/Button'
import UserSideData from '../../components/UserSideData/UserSideData'
import Map from '../../assets/map.png'
import { Link, useParams, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { mapData } from "./UserMapPageData"
import { setTestForm, setSliderform } from '../../store/slices/testSlice';
import CustomSelect from "../../components/Generic/Select/Select";
import './UserMapPage.css'

const UserMapPage = () => {

    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1)
    }
    const {id} = useParams
    console.log(id)

    useEffect(() => {
        setLocation(mapData);
    }, [])

    const handleData = (id) => {
        const dt = mapData.filter(x=> x.mapData.id === id);
        setTime(dt)
    }

    const testForm = useSelector(state => state.test.testForm);

    const handleTestForm = (name, value) => {
        dispatch(setTestForm({name,value}))
      }

    function updateSelection(e, name, value) {
        dispatch(setTestForm({name,value}))
        setTestForm(e.target.value);
        if (testForm !== undefined) {
            setTestForm(
               mapData.find((data) => data.id === e.target.value).name
            )
        }
    }

// console.log(testForm)
// console.log(mapData)

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
                                <CustomSelect name="id" title="id" onChange={handleTestForm} value={testForm.mapData} options={mapData} />
                            </FormControl> 
                            </div>
                            <div className='userMap_style'>
                                Name of map: {time && time != undefined ? <>{mapData.pass}</> : "no data"} 
                            </div>
                            <div className='userMap_style'>
                                Number of checkpoint: {""} 
                            </div>
                            <div className='userMap_style'>
                                Success: {""} 
                            </div>
                            <div className='userMap_style'>
                                Time from start: {""} 
                            </div>
                            <div className='userMap_selections'>
                            {/* <Button
                                text="Compare"
                                customStyles={{border:"none", backgroundColor:"none"}}
                            /> */}
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
        <div className='userMap_backButton'>
            <Link
                onClick={goBack}
            >
                Go back
            </Link>
        </div>
    </div>
  )
}

export default UserMapPage