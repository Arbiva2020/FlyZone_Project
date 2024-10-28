import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import AuthHeader from '../../components/AuthHeader/AuthHeader'
import SideBar from '../../components/SideBar/SideBar'
import './SingleUserStatistics.css'
import BarChart from '../../components/BarChart/BarChart'
import PieChart from '../../components/PieChart/PieChart'
import GaugeChart from '../../components/GaugeChart/GaugeChart'
import LineChart from '../../components/LineChart/LineChart'
import HorizontalBarChart from '../../components/HorizontalBarChart/HorizontalBarChart'
import UserSideData from '../../components/UserSideData/UserSideData'
import Button from '../../components/Generic/Button/Button'
import { lineData, pieData, datafake, horizontalBarData, gaugeData, pieDataA, pieDataB, pieDataC } from '../../dataFake'
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart';
import { Chart as ChartJS, Colors } from 'chart.js/auto'
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

ChartJS.register(
  Colors
  ); 

function SingleUserStatistics() {
  const {chosenUser} = useSelector(state => state.users)
  const [singleuserData, setSingleuserData] = useState({
    labels: datafake.map((data) => data.id), 
    datasets: [
      {
        label: "Collisions", 
        data: datafake.map((data) => data.collisions),
        backgroundColor: 'rgb(192, 226, 233, 0.8)', 
        borderColor: "white", 
        borderWidth: 0.5 
      },
      {
        label: "Avg. Score", 
        data: datafake.map((data) => data.avgScore),
        backgroundColor: "rgba(94, 114, 250, 0.8)", 
        borderColor: "white", 
        borderWidth: 0.5
      },
      {
        label: "Battary", 
        data: datafake.map((data) => data.battary),
        backgroundColor: 'rgb(54, 162, 235, 0.8)', 
        borderColor: "white", 
        borderWidth: 0.5
      },
      {
        label: "Points", 
        data: datafake.map((data) => data.points),
        backgroundColor: 'rgb(110, 119, 180, 0.8)', 
        borderColor: "white",
        borderWidth: 0.5
      }
    ], 
  })

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
          'rgb(110, 119, 180, 0.8)',
          'rgb(54, 162, 235, 0.8)',
          'rgb(142, 110, 180, 0.8)',
          'rgb(110, 113, 180, 0.8)',
          'rgb(110, 148, 180, 0.8)',
          'rgb(192, 226, 233, 0.8)',
        ],
        borderColor: [
          'rgb(250, 250, 254)'
        ],
        borderWidth:0.5, 
      },
    ]
  })


  const [singleuserPieDataA, setSingleuserPieDataA] = useState({
    labels: Object.keys(pieDataA), 
    datasets: [
      {
        data: Object.values(pieDataA), 
        borderColor: [
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
        ],
        backgroundColor: [
          'rgb(110, 119, 180, 0.8)',
          'rgb(54, 162, 235, 0.8)',
          'rgb(142, 110, 180, 0.8)',
          'rgb(110, 113, 180, 0.8)',
          'rgb(110, 148, 180, 0.8)',
          'rgb(192, 226, 233, 0.8)',
        ],
        borderColor: [
          'rgb(250, 250, 254)'
        ],
        borderWidth:0.5, 
      },
    ]
  })


  
  const [singleuserPieDataB, setSingleuserPieDataB] = useState({
    labels: Object.keys(pieDataB), 
    datasets: [
      {
        data: Object.values(pieDataB), 
        borderColor: [
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
        ],
        backgroundColor: [
          'rgb(110, 119, 180, 0.8)',
          'rgb(54, 162, 235, 0.8)',
          'rgb(142, 110, 180, 0.8)',
          'rgb(110, 113, 180, 0.8)',
          'rgb(110, 148, 180, 0.8)',
          'rgb(192, 226, 233, 0.8)',
        ],
        borderColor: [
          'rgb(250, 250, 254)'
        ],
        borderWidth:0.5, 
      },
    ]
  })


  const [singleuserPieDataC, setSingleuserPieDataC] = useState({
    labels: Object.keys(pieDataC), 
    datasets: [
      {
        data: Object.values(pieDataC), 
        borderColor: [
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
        ],
        backgroundColor: [
          'rgb(110, 119, 180, 0.8)',
          'rgb(54, 162, 235, 0.8)',
          'rgb(142, 110, 180, 0.8)',
          'rgb(110, 113, 180, 0.8)',
          'rgb(110, 148, 180, 0.8)',
          'rgb(192, 226, 233, 0.8)',
        ],
        borderColor: [
          'rgb(250, 250, 254)'
        ],
        borderWidth:0.5, 
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
          'rgb(250, 250, 254)'
        ],
        backgroundColor: [
          'rgb(192, 226, 233, 0.8)'
        ],
        borderWidth:0.5,
        label:"User avg"
      },
      {
        axis:"y",
        data: Object.values(horizontalBarData[1]), 
        borderColor: [
          'rgb(250, 250, 254)'
        ],
        backgroundColor: [
          'rgb(110, 148, 180, 0.8)'
        ],
        borderWidth:0.5,
        label:"Total avg"
      },
    ]
  })


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


const [singleuserGaugeData, setSingleuserGaugeData] = useState({
  labels: Object.keys(gaugeData), 
  datasets: [
    {
      data: Object.values(gaugeData), 
      borderColor: [
        'rgb(250, 250, 254)',
        'rgb(250, 250, 254)',
      ],
      backgroundColor: [
        'rgb(192, 226, 233, 0.8)',
        'rgb(110, 148, 180, 0.8)',
      ],
      borderWidth:1,
      cutout: '80%', 
      circumference: 180, 
      rotation: 270,
    },
  ]
})

const gaugeScore = singleuserData.datasets[0].data[0]
let rating = "No data";
switch(rating) {
  case gaugeScore < 50:
    {rating: "Low"}
    break
  case gaugeScore >= 50 && gaugeScore <=80:
    {rating:"Fair"}
    break
  case gaugeScore >80:
    {rating:"Good"}
    break
}
if(gaugeScore < 50){
  rating === 'Low'
}

const navigate = useNavigate()

const handleNavigateToMapPage = (mapId)=>{
  navigate(`/map/${mapId}`)
}
const handleNavigateToReportPage = (userId)=>{
  navigate(`/report/${userId}`)
}
const handleNavigateToTestPage = (userId)=>{
  navigate(`/generate/${userId}`)
}

  return (
    <div className='singleUser_main'>
      <AuthHeader />
      <div className='singleUser_content'>
        <div className='singleUser_sideContent'>
          <SideBar currentUserId={chosenUser?.id}/>
        </div>
        <div className='singleUser_charts'>
          <div className='singleUser_mainHeadline'>
            <div className='singleUser_headline'>Statistics and data - users' summary:</div>
            <p className='singelUser_text'>* The data presented here is of the last 4 tests. For full data <Link to="/fullStats" style={{color:"lightslategray"}}>{""}Click here</Link></p>
          </div>
          <div className='singleUser_upper_chart_section'>
            <div className='singleUser_num_left'>
              <div className='singleUser_num_numLeft'>
                <GaugeChart chartData={singleuserGaugeData} gaugeScore={gaugeScore} />
              </div>
              {/* <p className='singleUser_num_textLeft'>My name is Inigo Montoya</p> */}
            </div>
            <div className='singleUser_info'>
              <div className='singleUser_SubInfo'>
                <h4>Balancing</h4>
                <h2 style={{color:"lightblue", fontSize:"300%"}}>35%</h2>
                <div className='singleUserTrend'>
                  <p style={{fontSize:"80%"}}>Increase</p>
                  {/* if grade now is higher that previous grade: 
                    {higher ? <p><IoMdArrowDropupCircle style={{color:"green", marginLeft:"5px"}}/></p> <p>Increase</p> : <IoMdArrowDropdownCircle style={{color:"red", marginLeft:"5px"}}/></p> <p>Decrease</p>}
                  */}

                  
                  {(<p>Decrease</p> ? <IoMdArrowDropupCircle style={{color:"lightgreen", marginLeft:"5px"}}/> : <IoMdArrowDropdownCircle style={{color:"red", marginLeft:"5px"}}/>)}
                </div>
              </div>
              <div className='singleUser_SubInfo'>
                <h4>Success rate</h4>
                <h2 style={{color:"lightcoral", fontSize:"300%"}}>90%</h2>
                <div className='singleUserTrend'>
                  <p style={{fontSize:"80%"}}>Decrease</p>
                  {(<p>Decrease</p> ? <IoMdArrowDropdownCircle style={{color:"red", marginLeft:"5px"}}/> : <IoMdArrowDropupCircle style={{color:"green", marginLeft:"5px"}}/>)}
                </div>
              </div>
              <div className='singleUser_SubInfo'>
                <h4>Battery usage</h4>
                <h2 style={{color:"pink", fontSize:"300%"}}>72%</h2>
                <div className='singleUserTrend'>
                  <p style={{fontSize:"80%"}}>Decrease</p>
                  {(<p>Decrease</p> ? <IoMdArrowDropdownCircle style={{color:"red", marginLeft:"5px"}}/> : <IoMdArrowDropupCircle style={{color:"green", marginLeft:"5px"}}/>)}
                </div>
              </div>
            </div>
          </div>
          <div className='singleUser_middle_chart_section'>
            <div className='singleUser_bar_left'>
              <BarChart chartData={singleuserData} />
            </div>
            <div className='singleUser_bar_right'>
              {/* <LineChart chartData={singleuserLineData} /> */}
              <BarChart chartData={singleuserHorizontalData} />
            </div>
          </div>
          <div className='singleUser_pie_section'>
            <div className='singleUser_pie_pie'><h6>Level A 12.3.23 11:13</h6><PieChart chartData={singleuserPieData} /></div>
            <div className='singleUser_pie_pie'><h6>Level B 14.3.23 15:16</h6><PieChart chartData={singleuserPieDataA} /></div>
            <div className='singleUser_pie_pie'><h6>Level C 17.4.23 11:54</h6><PieChart chartData={singleuserPieDataB} /></div>
            <div className='singleUser_pie_pie'><h6>Level D 22.4.23 11:23</h6><PieChart chartData={singleuserPieDataC} /></div>
          </div>
        </div>
        <div className='singleUser_sideData'>
          <UserSideData userName={chosenUser.id}/>
          <div className='singleUser_sideButtons'>
            <Button 
              text="view map data"
              customStyles={{fontSize: "10px", height: "30px  ", alignSelf:"center", marginTop:"20px", width:"maxContent", padding:"0px 10px 0px 10px"}}
              onClick={handleNavigateToMapPage}
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

export default SingleUserStatistics