import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { OutlinedInput } from '@mui/material';
import './Select.css'

const CustomSelect = ({onChange, name, value='', title, options=[], label="default", disabled=false}) => {
  return (
    <div className='select_main'>
        <FormControl className="select_main_form" 
          variant="filled" 
          sx ={{marginBottom:"25px", marginTop:"15px", backgroundColor:"rgba(27, 27, 27, 0.5)", color:"white"}}
          // sx={{m: 1, minWidth: 120, backgroundColor: '#464545', borderStyle:"solid", borderColor:"rgb(136, 138, 136)", borderWidth:"1px", height:"50px"}}
        >
          <InputLabel id="demo-simple-select-filled-label">{title}</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={value}
              disabled={disabled}
              onChange={(e) => onChange(name, e.target.value)}
              label={label}
              style={{color:"white"}}
              inputProps={{
                MenuProps: {
                    MenuListProps: {
                        sx: {
                            backgroundColor: 'rgb(45, 43, 43)',
                            color: "white",
                        },
                    }
                }
            }}
            >
            {options.map(option => <MenuItem key={option.name} value={option.name}>{option.name}</MenuItem>)}
            </Select>
        </FormControl>
    </div>
  )
}

export default CustomSelect