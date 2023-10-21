import { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'

export default function BloodPress() {
    const [sbp, setSbp] = useState('')
    const [dbp, setDbp] = useState('')
  return (
    <>
  
    <Box>
      <Typography variant="h5">Blood Pressure</Typography>
      <TextField value={sbp} onChange={(event)=> setSbp(event.target.value)} id="sbp" placeholder = "Enter Systolic Blood Pressure" label="SBP" variant="outlined" />
      <TextField value={dbp} onChange={(event)=> setDbp(event.target.value)} id="dbp" placeholder = "Enter Diastolic Blood Pressure" label="DBP" variant="outlined" />
        
    </Box>

    </>


  )
}
