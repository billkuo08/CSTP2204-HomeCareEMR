import { Box, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function Pulse() {
    const [pulse, setPulse] = useState('')
  return (
        <>
    <Typography variant="h5">Blood Pressure</Typography>
    <Box display="flex" flexDirection="row" gap="20px">

        <TextField value={pulse} onChange={(event)=> setPulse(event.target.value)} id="pulse" placeholder = "Enter Pulse" label="pulse" variant="outlined" />
        
    </Box>

    </>
  )
}
