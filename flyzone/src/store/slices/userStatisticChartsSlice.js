import { createSlice } from '@reduxjs/toolkit'

// the redux logic for the user charts feature
const initialState = {
  allLevelsPrimary: [],
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
    // setAllLevelsTableForUser: (state, action) => {
    //   state.allLevelsPrimary = action.payload;
    //   const dataForUserPageTable = action.payload.map((level) => {
    //     return {
    //       queueOfLevel: level.queueOfLevel,
    //       scenario: level.scenario,
    //       checkpoints: level.checkpoints,
    //       fogScore: level.fogScore,
    //       windScore: level.windScore,
    //       brightnessScore: level.brightnessScore,
    //       timeForMission: level.timeForMission,
    //     };
        
    //   });
    //   state.allUsersPrimaryStatisticsTable = dataForUserPageTable;
    //   state.allUserLevelStatisticsPageData = dataForStatisticsPageTable
    //   state.totalMissionTimeSum = getAllTotalMissionTimeSumHelper(
    //     action.payload.map((level) => level.timeForMission)
    //   );
    //   state.avgConnection =
    //     getAllTotalMissionTimeSumHelper(action.payload.map((level) => level.lossOfConnection)) /
    //     action.payload.length;
    // },
  }
});

export const {
  setSelectedUser, 
  setUserLineChart, 
  setUserBarChart, 
  setUserSecondBar, 
  setUserLevelsTable
} = userStatisticChartsSlice.actions

export default userStatisticChartsSlice.reducer