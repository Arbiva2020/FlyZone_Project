import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsersPrimary: [],
  allUsersPrimaryStatisticsPageData:[],
  allUsersStatisticsPageData: [],
  totalScoreSum: 0,
  avgMmr: 0,
  chosenUser: {},
  companies: [], 
  groups: []
  //chosenUserPieData:[]
};

const getAllScoresSumHelper = (totalScoreSumArr) => {
  totalScoreSumArr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload
    },
    setCompaniesDB: (state, action) => {
      state.companies = action.payload
    },
    setAllusers: (state, action) => {
      state.allUsersPrimary = action.payload;
      const dataForStatisticsPageTable = action.payload.map((user) => {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          group_id: user.group_id,
          MMR: user.MMR,
          currentLevel: user.currentLevel,
          badges: user.badges,
          totalScore: user.totalScore,
        };
        
      });
      state.allUsersPrimaryStatisticsPageData = dataForStatisticsPageTable;
      state.allUsersStatisticsPageData = dataForStatisticsPageTable
      state.totalScoreSum = getAllScoresSumHelper(
        action.payload.map((user) => user.totalScore)
      );
      state.avgMmr =
        getAllScoresSumHelper(action.payload.map((user) => user.MMR)) /
        action.payload.length;
    },
    setChosenUser: (state, action) => {
      const chosenUser = state.allUsersPrimary.find(
        (user) => user.id === action.payload
      );
      state.chosenUser = chosenUser;
      state.chosenUserPieData = chosenUser.pieData;
    },
    setSelectGroup: (state, action) => {
      state.allUsers = state.allUsers.filter((row) => {
        for (const key in row)
          if (row[key].includes(action.payload.target.value)) return true;
      });
    },
    setFilterUsers: (state, action) => {
      state.allUsersStatisticsPageData = state.allUsersPrimaryStatisticsPageData.filter((row) => {
        for (const key in row) {
          console.log(typeof row[key]);
          if (typeof row[key] === "object") {
            continue;
          } else {
            if (
              row[key]
                .toString()
                .toLowerCase()
                .includes(action.payload.toLowerCase())
            ) {
              return true;
            }
          }
        }
      });
    },
  },
});

export const { setAllusers, setChosenUser, setSelectGroup, setFilterUsers, setCompaniesDB, setGroups } =
  usersSlice.actions;

export default usersSlice.reducer;
