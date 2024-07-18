import { createSlice } from '@reduxjs/toolkit'

const initialState = {
testForm:{}, 
sliderForm:{}
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
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

export const {setTestForm, setSliderform} = testSlice.actions

export default testSlice.reducer