import { createSlice } from '@reduxjs/toolkit'
import {fogDensity, maps, scenarios, windSpeed, missions} from '../../dataFake'
const initialState = {
testForm:{}, 
sliderForm:{},
missions:[],
scenarios:[],
maps: [],
windSpeed:[],
fogDensity:[],
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTestGenerationFormData: (state,action) => {
      //after you will have a good DB that brings all the info then uncomment this part
      // state.missions = action.payload.missions;
      // state.scenarios = action.payload.scenarios;
      // state.maps = action.payload.maps;
      // state.windSpeed = action.payload.windSpeed;
      // state.forDensity = action.payload.fogDensity;

       state.missions = missions;
      state.scenarios = scenarios;
      state.maps = maps;
      state.windSpeed = windSpeed;
      state.fogDensity = fogDensity;
    },
    setTestForm: (state, action) => {
      
      state.testForm[action.payload.name] = action.payload.value;
      console.log(action.payload)
      
      },  
    setSliderform: (state, action) => {
      state.sliderForm[action.payload] = action.payload;
      console.log(action.payload)
    }
  }
});

export const {setTestForm, setSliderform, setTestGenerationFormData} = testSlice.actions

export default testSlice.reducer