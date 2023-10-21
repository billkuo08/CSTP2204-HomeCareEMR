import { Box, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function Pulse() {
    const [pulse, setPulse] = useState('')
  return (
        <>
    
    <Box>
      <Typography variant="h5">Pulse</Typography>
        <TextField value={pulse} onChange={(event)=> setPulse(event.target.value)} id="pulse" placeholder = "Enter Pulse" label="pulse" variant="outlined" />
        
    </Box>   

    </>
  )
}
