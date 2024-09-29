import React from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import "./UsersStatisticsPage.css";
import { Chart as ChartJS, Colors } from 'chart.js/auto'
import { useFilters, useSortBy, useTable } from "react-table";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Input from "../../components/Generic/Input/Input";
import SearchPopup from "../../components/SearchPopup/SearchPopup";
import Popup from "../../components/Popup/Popup";
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoughnutDataBadges } from '../../dataFake'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from "react-redux";
import { setSelectGroup, setFilterUsers } from "../../store/slices/usersSlice";



ChartJS.register(
  Colors
  ); 

const UsersStatisticsPage = (props) => {
  const [filterInput, setFilterInput] = React.useState("");
  const [selectedGroup, setSelectedGroup] = React.useState(false);
  const [popupVisibility, setPopupVisibility] = React.useState(false);
  const navigate = useNavigate()
  const {totalScoreSum, allUsersStatisticsPageData, avgMmr} = useSelector(state => state.users)
  const dispatch = useDispatch()
  
console.log(allUsersStatisticsPageData)
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Group",
        accessor: "group_id",
      },
      {
        Header: "Level",
        accessor: "currentLevel",
      },
      {
        Header: "MMR",
        accessor: "MMR",
      },
      {
        Header: "No. of Badges",
        accessor: "badges",
      },
      {
        Header: "Total Score",
        accessor: "totalScore",
      },
    ],
    []
  );


  const handleFilterChange = ({ target: { value } }) => {
    setFilterInput(value);
    dispatch(setFilterUsers(value))
  };

  const handleSelectGroupchange = (e) => {
    setSelectedGroup([]);
    dispatch(setSelectGroup(e))
  }

  const handleNavigateToUserPage = (id)=>{
    navigate(`/user/${id}`)
    dispatch(setChosenUser(id))
    console.log(`/user/${id}`)
  }
  
  const popupClosehandler = (e) => {
    setPopupVisibility(e);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({ columns, data:allUsersStatisticsPageData }, useFilters, useSortBy);

  const [userDoughnutData, setUserDoughnutData] = useState({
    labels: Object.keys(DoughnutDataBadges), 
    datasets: [
      {
        data: Object.values(DoughnutDataBadges), 
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

console.log(rows)
  return (
    <div>
      <div className="users_main">
        <AuthHeader />
        <SearchPopup
          onClose={popupClosehandler}
          show={popupVisibility}
          title=""
        />
        <Popup />
        <div className="users_content">
          <div className="users_sideContent">
            <SideBar />
          </div>
          <div className="users_data">
            <div className="users_headline">Users Stats</div>
            <div className="users_table_operations">
            <FormControl sx={{m: 1, minWidth: 120, backgroundColor: 'gray'}}>
                <InputLabel id="select-main-view-label">Select group</InputLabel>
                <Select
                  labelId="select-main-view-label"
                  id="select-main-view-id"
                  value=""
                  label="Assessment type"
                  onChange={handleSelectGroupchange}
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
                  {allUsersStatisticsPageData.map((group, index) => <MenuItem key={index}>{group.group_id}</MenuItem>)}
                </Select>
              </FormControl>
              <div className="users_searchInput">
                <Input
                  name="Search"
                  value={filterInput}
                  placeholder="Search"
                  onChange={handleFilterChange}
                  customStyles={{ width: "300px" }}
                />
                <i className="users_icon" onClick={handleFilterChange}>
                  <FaSearch />
                </i>
              </div>
            </div>
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
                            onClick={() =>
                              cell.column.Header === columns[0]["Header"]
                                ? handleNavigateToUserPage(allUsersStatisticsPageData[cell.row.id].id)
                                : console.log(cell)
                            }
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

            <div className="users_headline">Stats Summary</div>
            <div className="users_charts">
              <div className="users_leftChart">
                <div className="users_statHeadline">
                  3 straight Failures:
                </div>
                <div className="users_doughnut"><DoughnutChart chartData={userDoughnutData}/></div>
              </div>
              <div className="users_centerChart">
                <div className="users_statHeadline">
                  Top badges:
                </div>
                <div className="users_doughnut"><DoughnutChart chartData={userDoughnutData}/></div>
              </div>
              <div className="users_rightChart">
                <div className="users_statHeadline">
                  assessment overdue:
                </div>
                <div className="users_doughnut"><DoughnutChart
                        customStyles={{width:"50px"}} 
                        chartData={userDoughnutData}
                        options={{}}
                      />
                </div>
              </div>
            </div>
          </div>
          <div className="users_summary">
            <p className="users_summary_total">Total users: {rows.length}</p>
            <p className="users_summary_total">Score avg. : {totalScoreSum}</p>
            <p className="users_summary_total">MMR avg. : {avgMmr}</p>
            <p className="users_summary_total">Total drone losses: {}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersStatisticsPage;
