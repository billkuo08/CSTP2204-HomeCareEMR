import { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'

export default function Spo() {
  const [spo, setSpo] = useState('')
  
  return (
    <>
      <Box>
        <Typography variant="h5">SpO2</Typography>
        <TextField value={spo} onChange={(event)=> setSpo(event.target.value)} id="spo" placeholder = "Enter SpO2" label="SpO2" variant="outlined" />
      </Box>
    </>
  )
}
