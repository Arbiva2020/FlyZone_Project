import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import usersReducer from './slices/usersSlice.js'
import userStatisticChartsReducer from "./slices/userStatisticChartsSlice.js";
import testReducer from './slices/testSlice.js'

export const store = configureStore({
  reducer: {
    users:usersReducer,
    auth: authReducer,
    testFlight:testReducer,
    userStatisticCharts: userStatisticChartsReducer,
  },
});
