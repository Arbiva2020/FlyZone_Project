import React from 'react'
import "./InfoPopup.css"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { Icon } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

const InfoPopup = ({onCancel, isOpen, headline, children}) => {

return (
    <div className={isOpen ? 'infopopup_main shown' : 'infopopup_main hidden'} >
        <div className='infopopup_generic'>
            <h3 className='infopopup_headline'>{headline}</h3>
            <div className='infopopup_content'>
                 {children}
            </div>
            <button className='infopopup_close' onClick={onCancel}>CLOSE</button>
        </div>
    </div>
  )
}

export default InfoPopup