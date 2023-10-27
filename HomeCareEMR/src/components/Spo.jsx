/* eslint-disable react/display-name */
import { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'

const Spo = forwardRef((props, _ref) => {
  const [spo2, setSpo2] = useState('')

  useImperativeHandle(_ref, () => ({
    getChildState() {
      return {
        spo2
      }
    }
  }))
  
  return (
    <>
      <Box>
        <Typography variant="h5">SpO2</Typography>
        <TextField value={spo2} onChange={(event)=> setSpo2(event.target.value)} id="spo" placeholder = "Enter SpO2" label="SpO2" variant="outlined" />
      </Box>
    </>
  )
})

export default Spo;
