import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import AuthHeader from '../../components/AuthHeader/AuthHeader'
import SideBar from '../../components/SideBar/SideBar'
// import Profile from '../../assets/Profile.png'
import './UserFullStats.css'
import BarChart from '../../components/BarChart/BarChart'
import PieChart from '../../components/PieChart/PieChart'
import LineChart from '../../components/LineChart/LineChart'
import HorizontalBarChart from '../../components/HorizontalBarChart/HorizontalBarChart'
import UserSideData from '../../components/UserSideData/UserSideData'
import Button from '../../components/Generic/Button/Button'
import { lineData, pieData, datafake, horizontalBarData } from '../../dataFake'
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart';
import { Chart as ChartJS, Colors } from 'chart.js/auto'
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import fakeData from "../../fakeData.json";

ChartJS.register(
  Colors
  ); 

function UserFullStats(props) {
  const {id, firstName} = useParams()
  console.log(id)
  console.log(firstName)


  console.log((fakeData.map((data) => data.testsFinal)))
  function longe(){
    let longish=0;
    for(let i=0; i>=fakeData.length; i++){
        if(fakeData.length[i]>fakeData.length[i+1]){
            longish===fakeData.length[i]
        }else longish === fakeData.length[i+1]
    }
    return
  }
console.log(longe())

  const [userAllTests, setUserAllTests] = useState({
    labels: fakeData.map((data) => (data.testsFinal).index+1),
    datasets: [
      {
        // label: "Tests",
        data: fakeData.map((data) => data.testsFinal), 
        borderColor: "pink",
        backgroundColor: "pink"
      }
    ] 
})

  const [singleuserData, setSingleuserData] = useState({
    labels: datafake.map((data) => data.id), 
    datasets: [
      {
        label: "Collisions", 
        data: datafake.map((data) => data.collisions),
        backgroundColor: "aqua", 
        borderColor: "white"
      },
      {
        label: "Avg. Score", 
        data: datafake.map((data) => data.avgScore),
        backgroundColor: "blue", 
        borderColor: "white"
      },
      {
        label: "Battary", 
        data: datafake.map((data) => data.battary),
        backgroundColor: "white", 
        borderColor: "white"
      },
      {
        label: "Points", 
        data: datafake.map((data) => data.points),
        backgroundColor: "pink", 
        borderColor: "white"
      }
    ]
  })

  const userName = props.userName
  const [singleuserPieData, setSingleuserPieData] = useState({
    labels: Object.keys(pieData), 
    datasets: [
      {
        data: Object.values(pieData), 
        borderColor: [
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
        ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
        borderWidth:1
      },
    ]
  })



  const [singleuserHorizontalData, setSingleuserHorizontalData] = useState({
    labels: Object.keys(horizontalBarData[0]), 
    datasets: [
      {
        axis:"y",
        data: Object.values(horizontalBarData[0]), 
        borderColor: [
          'rgb(0, 0, 0)'
        ],
        backgroundColor: [
          'rgb(255, 99, 132)'
        ],
        borderWidth:1,
        label:"User avg"
      },
      {
        axis:"y",
        data: Object.values(horizontalBarData[1]), 
        borderColor: [
          'rgb(0, 0, 0)'
        ],
        backgroundColor: [
          'rgb(255, 159, 64)'
        ],
        borderWidth:1,
        label:"Total avg"
      },
    ]
  })
  console.log(Object.values(horizontalBarData[0]))
  console.log(Object.values(horizontalBarData[1]))

  const [singleuserLineData, setSingleuserLineData] = useState({
    labels: Object.keys(lineData),
    datasets: [
      {
        label: "Test scores",
        data: Object.values(lineData),
        borderColor: "pink",
        backgroundColor: "pink"
      }
    ] 
})


const [singleuserDoughnutData, setSingleuserDoughnutData] = useState({
  labels: Object.keys(pieData), 
  datasets: [
    {
      data: Object.values(pieData), 
      borderColor: [
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
      ],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
      ],
      borderWidth:1
    },
  ]
})


const navigate = useNavigate()

const handleNavigateToUserPage = (id)=>{
  navigate(`/map/${props.id}`)
  console.log(`/:${[props.id]}/map`)
}
const handleNavigateToReportPage = (id)=>{
  navigate(`/report/${props.id}`)
  console.log(`/:${[props.id]}/report`)
}
const handleNavigateToTestPage = (id)=>{
  navigate(`/generate/${props.id}`)
  console.log(`/:${[props.id]}/generate`)
}

// const handleNavigateToUserMap = (id) => {
//   let dynamicPath
//   // if(data.path.includes('[:id]')){
//       dynamicPath = data.path.replace('[:id]', currentUserId)
//       console.log(dynamicPath)
//     // }
// }


  return (
    <div className='userFullStats_main'>
      <AuthHeader />
      <div className='userFullStats_content'>
        <div className='userFullStats_sideContent'>
          <SideBar currentUserId={id}/>
        </div>
        <div className='userFullStats_charts'>
          <div className='userFullStats_headline'>Users' Complete Statistics</div>
          <p className='userFullStats_text'>Presented here is the full data for user *userName*. For additional information regarding the </p>
          <p className='userFullStats_text'> tests generated<Link>Click here</Link></p>
          <div className='userFullStats_upper_chart_section'>
            <div className='userFullStats_mainView_line_left'><LineChart chartData={userAllTests} /></div>
            <div className='userFullStats_mainView_line_right'><LineChart chartData={userAllTests} /></div>
          </div>
          <div className='userFullStats_middle_chart_section'>
            <div className='userFullStats_bar_left'>
              <BarChart chartData={singleuserData} />
            </div>
            <div className='userFullStats_bar_right'>
              {/* <LineChart chartData={singleuserLineData} /> */}
              <BarChart chartData={singleuserHorizontalData} />
            </div>
          </div>
        </div>
        <div className='userFullStats_sideData'>
          <UserSideData userName={id}/>
          <div className='userFullStats_sideButtons'>
            <Button 
              text="view map data"
              customStyles={{fontSize: "10px", height: "30px  ", alignSelf:"center", marginTop:"20px", width:"maxContent", padding:"0px 10px 0px 10px"}}
              onClick={handleNavigateToUserPage}
            />
            <Button 
              text="Generate report"
              customStyles={{fontSize: "10px", height: "30px", alignSelf:"center", marginTop:"20px", width:"maxContent", padding:"0px 10px 0px 10px"}}
              onClick={handleNavigateToReportPage}
            />
            <Button 
              text="Generate test"
              customStyles={{fontSize: "10px", height: "30px", alignSelf:"center", marginTop:"20px", width:"maxContent", padding:"0px 10px 0px 10px"}}
              onClick={handleNavigateToTestPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserFullStats