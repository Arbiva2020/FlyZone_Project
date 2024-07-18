import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = () => {
  return (
    <div>
      LoadingSpinner
      <Box sx={{ display: 'flex' }}>
        <CircularProgress style={{color: "#B943B4"}}/>
      </Box>
    </div>
  )
}

export default LoadingSpinner