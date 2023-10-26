/* eslint-disable react/prop-types */
import { Typography, Box, Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@mui/material'
import { useContext, useState, forwardRef, useImperativeHandle} from 'react'
import { PatientsContext } from '../context/PatientsContext'

// eslint-disable-next-line react/display-name
const AnticoagulantInjection = forwardRef(({id}, _ref) => {
  const [injectjionSite, setInjectionSite] = useState('');
  const patients = useContext(PatientsContext);
  console.log(id);

  const handleChange = (event) => {
    setInjectionSite(event.target.value);
  };

  useImperativeHandle(_ref, () => ({
    getChildState() {
      return {
        injectjionSite
      }
    }
  }))

  return (
    patients.map((patient) => {
      if(patient.id === id){
        return(
          <>
            <Box>
              <Typography variant="h5">Anticoagulant Injection</Typography>
              <Stack direction="row" spacing={5}>
                <Typography variant="h6">Drug Name: {patient.anticoagulantName}</Typography>
                <Typography variant="h6">Dose:{patient.anticoagulantDose} mg</Typography>
              </Stack>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Injection Site</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={injectjionSite}
                  onChange={handleChange}
                >
                  <FormControlLabel value="abdomen" control={<Radio />} label="Abdomen" />
                  <FormControlLabel value="rightArm" control={<Radio />} label="Right Arm" />
                  <FormControlLabel value="leftArm" control={<Radio />} label="Left Arm" />
                  <FormControlLabel value="rightLeg" control={<Radio />} label="Right Leg" />
                  <FormControlLabel value="leftLeg" control={<Radio />} label="Left Leg" />
                </RadioGroup>
              </FormControl>

              
            </Box>
            
          </>
        )
      }
    }

  )
  )
})

export default AnticoagulantInjection;
