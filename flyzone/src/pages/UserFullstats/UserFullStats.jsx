import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import SideBar from '../../components/SideBar/SideBar';
import './UserFullStats.css'
import { useSelector, useDispatch } from "react-redux";
import BarChart from '../../components/BarChart/BarChart'
import PieChart from '../../components/PieChart/PieChart'
import LineChart from '../../components/LineChart/LineChart';
import HorizontalBarChart from '../../components/HorizontalBarChart/HorizontalBarChart'
import UserSideData from '../../components/UserSideData/UserSideData';
import Button from '../../components/Generic/Button/Button';
import { lineData, pieData, datafake, horizontalBarData, allUsers, level } from '../../dataFake';
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart';
import { Chart as ChartJS, Colors } from 'chart.js/auto';
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useFilters, useSortBy, useTable } from "react-table";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
// import { setSelectGroup, setFilterUsers } from "../../store/slices/userStatisticChartsSlice";



ChartJS.register(
  Colors
  ); 

function UserFullStats(props) {
  const {id, firstName} = useParams()

  const [userAllTests, setUserAllTests] = useState({
    labels: allUsers.map((data) => (data.testsFinal).index+1),
    datasets: [
      {
        // label: "Tests",
        data: allUsers.map((data) => data.testsFinal), 
        borderColor: "pink",
        backgroundColor: "pink"
      }
    ] 
  })


  const columns = React.useMemo(
    () => [
      {
        Header: "Level",
        accessor: "queueOfLevel",
      },
      {
        Header: "Created at",
        accessor: "createdAt",
      },
      {
        Header: "Finished at",
        accessor: "finishedAt",
      },
      {
        Header: "Pass",
        accessor: "pass",
      },
      {
        Header: "Time for Mission",
        accessor: "timeForMission",
      },
      {
        Header: "Connection loss",
        accessor: "lossOfConnection",
      },
      {
        Header: "Total Score",
        accessor: "totalScore",
      },
    ],
    []
  );

  const {totalScoreSum, allUsersStatisticsPageData, avgMmr} = useSelector(state => state.users)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({ columns, data:allUsersStatisticsPageData }, useFilters, useSortBy);


  const [singleuserData, setSingleuserData] = useState({
    labels: allUsers.map((data) => data.id), 
    datasets: [
      {
        label: "Collisions", 
        data: allUsers.map((data) => data.collisions),
        backgroundColor: "aqua", 
        borderColor: "white"
      },
      {
        label: "Avg. Score", 
        data: allUsers.map((data) => data.avgScore),
        backgroundColor: "blue", 
        borderColor: "white"
      },
      {
        label: "Battary", 
        data: allUsers.map((data) => data.battary),
        backgroundColor: "white", 
        borderColor: "white"
      },
      {
        label: "Points", 
        data: allUsers.map((data) => data.points),
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
  // console.log(Object.values(horizontalBarData[0]))
  // console.log(Object.values(horizontalBarData[1]))

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
          <p className='userFullStats_text'>Presented here is the full data for user *userName*. For additional information regarding the tests generated<Link style={{color:"lightslategray"}}>{" "}Click here</Link></p>
          <div className='userFullStats_upper_chart_section'>
            <div className='userFullStats_mainView_line_left'><LineChart chartData={userAllTests} /></div>
            <div className='userFullStats_mainView_line_right'><LineChart chartData={userAllTests} /></div>
          </div>
          <div className='userFullStats_middle_chart_section'>
          <div className="users_chart">
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="usersStats_tr"
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="usersStats_th"
                        >
                          {column.render("Header")}
                          <span className="usersStats_span">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <FaSortAmountDown />
                              ) : (
                                <FaSortAmountDownAlt />
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td
                            // onClick={() =>
                            //   cell.column.Header === columns[0]["Header"]
                            //     ? handleNavigateToUserPage(allUsersStatisticsPageData[cell.row.id].id)
                            //     : console.log(cell)
                            // }
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* <div className='userFullStats_bar_left'>
              <BarChart chartData={singleuserData} />
            </div>
            <div className='userFullStats_bar_right'>
              <BarChart chartData={singleuserHorizontalData} />
            </div> */}
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