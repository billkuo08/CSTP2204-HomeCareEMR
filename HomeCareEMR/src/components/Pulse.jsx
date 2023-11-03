/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { Box, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { forwardRef, useImperativeHandle } from 'react'
import MonitorHeartTwoToneIcon from '@mui/icons-material/MonitorHeartTwoTone';

const Pulse = forwardRef((props, _ref) => {
    const [pulse, setPulse] = useState('')
    useImperativeHandle(_ref, () => ({
        getChildState() {
          return {
            pulse
          }
        }
      }))
  return (
        <>
    
    <Box>
    <br></br>
      <Typography variant="h5"><b><MonitorHeartTwoToneIcon></MonitorHeartTwoToneIcon> Pulse <MonitorHeartTwoToneIcon></MonitorHeartTwoToneIcon></b></Typography>
      <br></br>
        <TextField value={pulse} onChange={(event)=> setPulse(event.target.value)} id="pulse" placeholder = "Enter Pulse" label="pulse" variant="outlined" />
        
    </Box>   

    </>
  )
})

export default Pulse;
