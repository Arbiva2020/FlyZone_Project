import React,  {useEffect, useState} from 'react'
import AuthHeader from '../../components/AuthHeader/AuthHeader'
import SideBar from '../../components/SideBar/SideBar'
import { mainViewDatafake, mainViewLineData, maps } from '../../dataFake'
import BarChart from '../../components/BarChart/BarChart'
import LineChart from '../../components/LineChart/LineChart'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomSelect from "../../components/Generic/Select/Select";
import GroupSideData from '../../components/GroupSideData/GroupSideData'
import UpgradeAdd from '../../components/UpgradeAdd/UpgradeAdd'
import './MainViewPage.css'
import Button from '../../components/Generic/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCompaniesDB } from '../../store/slices/usersSlice'
import { companiesDb } from '../../dataFake'

const MainViewPage = (props) => {
const dispatch = useDispatch()
  const [selectValue, setSelectValue] = React.useState('');
  const [users, setUsers] = React.useState([])

  useEffect(() => {
    const verifyToken = async() => {
      const token = localStorage.getItem('token');
        console.log(token)
      try {
        const response = await fetch('http://localhost:8000/verify-token/${token}');
        if(!response.ok) {
          throw new Error('Token verification failed');
        }
      } catch(error) {
        localStorage.removeItem('token');
        navigate('/login')
      }
    }
  })

  const fetchUsers = async() => {
    //const response = await api.get('/users/');
    //setUsers(response.data)
  }

  const fetchCompanies = async () => {
    //const response = await api.get('/companies/')
    dispatch(setCompaniesDB(companiesDb))
  }

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, [])

  const handleChange = (event) => {
    setSelectValue(event.target.value);
    console.log(event.target.value)
  };

  const [mainViewData, setMainViewData] = useState({
    labels: mainViewDatafake.map((data) => data.id), 
    datasets: [
      {
        label: "Collisions", 
        data: mainViewDatafake.map((data) => data.collisions),
        backgroundColor: 'rgba(94, 114, 250, 0.8)', 
        borderColor: "white"
      },
      {
        label: "Avg. Score", 
        data: mainViewDatafake.map((data) => data.avgScore),
        backgroundColor: 'rgb(54, 162, 235, 0.8)', 
        borderColor: "white"
      },
      {
        label: "Avg. Score", 
        data: mainViewDatafake.map((data) => data.battary),
        backgroundColor:  'rgba(94, 114, 250, 0.8)', 
        borderColor: "white"
      },
      {
        label: "Avg. Score", 
        data: mainViewDatafake.map((data) => data.points),
        backgroundColor: 'rgb(192, 226, 233, 0.8)', 
        borderColor: "white"
      }
    ]
  })

  const [mainLineData, setMainLineData] = useState({
    labels: Object.keys(mainViewLineData),
    datasets: [
      {
        label: mainViewLineData.headline,
        data: Object.values(mainViewLineData), 
        borderColor: "white",
        backgroundColor: "white", 
      }
    ] 
})

// console.log(maps[1].total)

const [mainViewMap, setMainViewMap] = useState({
  labels: maps.map((data) => data.name), 
  //label: "Type of map",
  datasets: [{
    label: "Types of map",
    data:[
    maps[0].total, 
    maps[1].total,
    maps[2].total,
    maps[3].total,
    maps[4].total
    ],
    backgroundColor: [
      'rgb(192, 226, 233, 0.8)',
      'rgba(94, 114, 250, 0.8)',
      'rgb(54, 162, 235, 0.8)',
      'rgba(12, 141, 178, 1)',
      'rgb(110, 119, 180, 0.8)'
    ],
    borderColor: [
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ]
  }]
})

const navigate = useNavigate();

const navigateToAllStatsPage = () => {
  navigate('/allStats');
};

  return (
    <div className='mainView_main'>
      <AuthHeader />
      <div className='mainView_content'>
         <SideBar />
         <div className='mainView_center'>
          <div className='mainView_hedline'>Main View</div>
          <div className='mainView_table'>
          <p className='mainView_prev'>Main view page presents the assessment results devided by organic groups.  
                                    To view results, please pick a group in the dropdown. <br/> The difault state show 
                                    the first group in the alphabetical/numerical order. 
          </p>
            <div className='mainView_formControl'>
              <FormControl sx={{m: 1, minWidth: 120}}>
                  <InputLabel id="select-main-view-label">Select group</InputLabel>
                  <Select
                    labelId="select-main-view-label"
                    id="select-main-view-id"
                    value={selectValue}
                    label="Assessment type"
                    onChange={handleChange}
                    inputProps={{
                      MenuProps: {
                          MenuListProps: {
                              sx: {
                                  color: "gray",
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
                <div className="mainView_goToStatsPage">
                <Button customStyles={{borderColor:"black"}}
                    text={"Go to stats"}
                    // isLightStyle
                    // onClick={handleSubmitForm}
                    // isDisabled={isFormDisabled}
                    onClick={navigateToAllStatsPage}
                />
            </div>
              </div>
            <div className='mainView_charts'>
              <div className='mainView_line'><LineChart chartData={mainLineData} /></div>
              <div className='mainView_bar'><BarChart chartData={mainViewData} /></div>
            </div>
            <div className='mainViewButtom'>
              <div className='mainView_hedline' style={{marginTop:"0px"}}><h6>Additional data</h6></div>
              <div className='mainView_charts_bottom'>
                <div className='mainView_line'><BarChart chartData={mainViewMap} /></div>
                <div className='mainView_bar'><BarChart chartData={mainViewMap} /></div>
              </div>
            </div>
          </div>
         
         </div>
         <div className='mainView_right'>
            <GroupSideData />
            <UpgradeAdd />
         </div>
      </div>
    </div>
  )
}

export default MainViewPage