/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import BloodtypeTwoToneIcon from '@mui/icons-material/BloodtypeTwoTone';

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
      <Typography variant="h5"><b><BloodtypeTwoToneIcon></BloodtypeTwoToneIcon> Blood Pressure <BloodtypeTwoToneIcon></BloodtypeTwoToneIcon></b></Typography>
      <br></br>
      <TextField value={sbp} onChange={(event)=> setSbp(event.target.value)} id="sbp"
       placeholder = "Enter Systolic Blood Pressure" label="SBP" variant="outlined" />
      
      <TextField value={dbp} onChange={(event)=> setDbp(event.target.value)} id="dbp" placeholder = "Enter Diastolic Blood Pressure" label="DBP" variant="outlined" />
        
    </Box>

    </>


  );
});

export default BloodPress;
