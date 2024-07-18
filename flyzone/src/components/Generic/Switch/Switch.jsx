import React from 'react'
import classNames from 'classnames'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './Switch.css'

const Switch = ({isDisabled, customStyles={}}) => {
  return (
    <div className='switch_main'>
        <div className='switch_box'>
        <Box sx={{ width: 200 }}>
                            <Slider
                                aria-label="small steps"
                                valueLabelDisplay="auto"
                                // defaultValue={defaultValue}
                                // getAriaValueText={valuetext}
                                // step={step}
                                // min={min}
                                // max={max}
                                // marks={marks}
                                // disabeld={isDisabled}
                                // style={customStyles}
                            />
                        </Box>
        </div>
    </div>
  )
}

export default Switch