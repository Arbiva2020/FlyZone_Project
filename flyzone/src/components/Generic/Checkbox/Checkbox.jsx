import React from 'react'
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const GeneralCheckbox = () => {

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div>
        <Checkbox
        {...label}
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }}
      />
    </div>
  )
}

export default GeneralCheckbox