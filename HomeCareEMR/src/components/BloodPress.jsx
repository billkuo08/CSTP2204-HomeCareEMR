/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'

const BloodPress= forwardRef((props, _ref)=> {
    const [sbp, setSbp] = useState('')
    const [dbp, setDbp] = useState('')

    useImperativeHandle(_ref, () => ({
        getChildState() {
          return {
            sbp,
            dbp
          }
        }
      }))
      
  return (
    <>
  
    <Box>
      <Typography variant="h5">Blood Pressure</Typography>
      <TextField value={sbp} onChange={(event)=> setSbp(event.target.value)} id="sbp" placeholder = "Enter Systolic Blood Pressure" label="SBP" variant="outlined" />
      <TextField value={dbp} onChange={(event)=> setDbp(event.target.value)} id="dbp" placeholder = "Enter Diastolic Blood Pressure" label="DBP" variant="outlined" />
        
    </Box>

    </>


  );
});

export default BloodPress;
