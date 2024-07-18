import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './SliderGeneric.css'

const SliderGeneric = ({valuetext, step, min, max, marks}) => {
  return (
    <div className='slider_main'>
        <Box sx={{ width: 200 }}>
            <div className='slider_slider'>
                <div className='slider_parameter'>{'dataTitle'}</div>
                    <Slider
                        aria-label="small steps"
                        defaultValue={1}
                        getAriaValueText={valuetext}
                        step={step}
                        min={min}
                        max={max}
                        valueLabelDisplay="auto"
                        marks={marks}
                        color="secondary"
                    />
                </div>
        </Box>
    </div>
  )
}

export default SliderGeneric