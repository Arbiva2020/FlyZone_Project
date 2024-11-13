import { createSlice } from '@reduxjs/toolkit'

// the redux logic for the user charts feature
const initialState = {
  allLevelsPrimary: [],
  allLevelStatisticsPerUser: [],
  allUsersPrimaryStatisticsTable:[],
  totalMissionTimeSum: 0,
}

const getAllTotalMissionTimeSumHelper = (totalTimeSumArr) => {
  totalTimeSumArr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};


//if no use is chosen - the charts will show nothing
const userStatisticChartsSlice = createSlice({
  name: 'userStatisticCharts',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.userData[action.payload.name] = action.payload.value;
    },
    setUserLineChart: (state, action) => {
      state.userData[action.payload.name] = action.payload.value;
    },
    setUserBarChart: (state, action) => {
      state.userData[action.payload.name] = action.payload.value;
    },
    setUserSecondBarChart: (state, action) => {
      state.userData[action.payload.name] = action.payload.value;
    },
    setUserLevelsTable: (state, action) => {
      state.userData[action.payload.name] = action.payload.value;
    },
    setAllLevelsDataForUser: (state, action) => {
      state.allLevelsPrimary = action.payload;
      const dataForUserPageTable = action.payload.map((level) => {
        return {
          currentLevel: level.queueOfLevel,
          createdAt: level.createdAt, 
          finishedAt: level.finishedAt, 
          pass: level.pass,
          timeForMission: level.timeForMission,
          lossOfConnection:level.lossOfconnection, 
          totalScore: level.score, 
        };
        
      });
      state.allLevelsPrimary = dataForUserPageTable;
      state.allLevelStatisticsPerUser = dataForUserPageTable;
      state.allUsersPrimaryStatisticsTable = dataForUserPageTable;
    },
  }
});

export const {
  setSelectedUser, 
  setUserLineChart, 
  setUserBarChart, 
  setUserSecondBar, 
  setUserLevelsTable, 
  setAllLevelsDataForUser,
} = userStatisticChartsSlice.actions

export default userStatisticChartsSlice.reducer