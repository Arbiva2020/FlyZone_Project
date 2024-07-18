import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allUsersPrimary:[],
    allUsers:[],
    totalScoreSum:0,
    avgMmr:0,
    chosenUser:{},
    //chosenUserPieData:[]
}

const getAllScoresSumHelper = (totalScoreSumArr) => {
    totalScoreSumArr.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        },0);
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllusers: (state,action) => {
        state.allUsersPrimary = action.payload
        state.allUsers = action.payload
        state.totalScoreSum = getAllScoresSumHelper(action.payload.map(user => user.totalScore))
        state.avgMmr = getAllScoresSumHelper(action.payload.map(user => user.MMR))/action.payload.length
    },
    setChosenUser:(state,action) => {
      const chosenUser = state.allUsers.find(user => user.id === action.payload)
        state.chosenUser = chosenUser
        state.chosenUserPieData = chosenUser.pieData
    },
    setSelectGroup:(state,action) => {
        state.allUsers = state.allUsers.filter((row) => {
            for(const key in row)
              if(row[key].includes(action.payload.target.value)) return true;
          })
        },
    setFilter:(state,action) =>{
        state.allUsers = state.allUsers.filter((row) => {
            for (const key in row) {
              if (row[key].toLowerCase().includes(action.payload.toLowerCase())) return true;
            }
          })
    }
  }
});

export const {setAllusers, setChosenUser, setSelectGroup, setFilter} = usersSlice.actions

export default usersSlice.reducer