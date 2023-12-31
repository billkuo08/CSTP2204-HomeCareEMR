/* eslint-disable react/display-name */
import { useState } from 'react'
import { Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';
import FastfoodTwoToneIcon from '@mui/icons-material/FastfoodTwoTone';
import NoMealsTwoToneIcon from '@mui/icons-material/NoMealsTwoTone';

const BloodGlucose = forwardRef((props, _ref) =>  {
    const [bloodGlucoseLevel, setBloodGlucoseLevel] = useState('')
    const [fasting, setfasting] = useState('')

    const handlefasting = (event) => {
        setfasting(event.target.value);
      };
    useImperativeHandle(_ref, () => ({
        getChildState() {
          return {
            bloodGlucoseLevel,
            fasting
          }
        }
      }))

  return (
    <>
  
    <Box className = "boxer">
    <br></br>
      <Typography variant="h5"><b><WaterDropTwoToneIcon></WaterDropTwoToneIcon> Blood Glucose <WaterDropTwoToneIcon></WaterDropTwoToneIcon> </b></Typography>
      <br></br>
      <TextField value={bloodGlucoseLevel} onChange={(event)=> setBloodGlucoseLevel(event.target.value)} id="pulse" placeholder = "Enter Pulse" label="pulse" variant="outlined" />
      <FormControl size="medium" sx={{width:"12%"}}>
        <InputLabel id="demo-simple-select-label"><FastfoodTwoToneIcon></FastfoodTwoToneIcon> Having a meal?</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={fasting}
        label="Route"
        onChange={handlefasting}
        >
        <MenuItem value={'fasting'}>Fasting <NoMealsTwoToneIcon></NoMealsTwoToneIcon></MenuItem>
        <MenuItem value={'after 0.5 hour'}>After 0.5 hour</MenuItem>
        <MenuItem value={'after 1 hour'}>After 1 hour</MenuItem>
        <MenuItem value={'after 2 hour'}>After 2 hour</MenuItem>
        <MenuItem value={'after 3 hour'}>After 3 hour</MenuItem>
        </Select>
    </FormControl>   
      
        
    </Box>

    </>


  )
})

export default BloodGlucose;
