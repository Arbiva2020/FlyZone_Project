import { createSlice } from '@reduxjs/toolkit'

// the redux logic for the user charts feature
const initialState = {

}
//if no use is chosen - the charts will show nothing
const userStatisticChartsSlice = createSlice({
  name: 'userStatisticCharts',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      console.log(action)
      state.userData[action.payload.name] = action.payload.value;
    },
    setUserLineChart: (state, action) => {
      console.log(action)
      state.userData[action.payload.name] = action.payload.value;
    },
    setUserBarChart: (state, action) => {
      console.log(action)
      state.userData[action.payload.name] = action.payload.value;
    },
    setUserSecondBarChart: (state, action) => {
      console.log(action)
      state.userData[action.payload.name] = action.payload.value;
    },
  }
});

export const {
  setSelectedUser, 
  setUserLineChart, 
  setUserBarChart, 
  setUserSecondBar
} = userStatisticChartsSlice.actions

export default userStatisticChartsSlice.reducer