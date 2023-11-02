/* eslint-disable react/prop-types */
import { Typography, Box, Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@mui/material'
import '../CSS/AnticoagulantInjection.css';
import { useContext, useState, forwardRef, useImperativeHandle} from 'react'
import { PatientsContext } from '../context/PatientsContext'
import VaccinesTwoToneIcon from '@mui/icons-material/VaccinesTwoTone';
import MedicationLiquidTwoToneIcon from '@mui/icons-material/MedicationLiquidTwoTone';
import EqualizerTwoToneIcon from '@mui/icons-material/EqualizerTwoTone';

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
          <br></br>
            <Box className="insu-box">
            <br></br>
              <Typography variant="h5"><b><VaccinesTwoToneIcon></VaccinesTwoToneIcon> Anticoagulant Injection <VaccinesTwoToneIcon></VaccinesTwoToneIcon></b></Typography>
              <br></br>
              <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
                
                <Typography variant="h6"> <MedicationLiquidTwoToneIcon></MedicationLiquidTwoToneIcon> Drug Name: {patient.anticoagulantName}</Typography>
                <Typography variant="h6">Dose: {patient.anticoagulantDose} mg <EqualizerTwoToneIcon></EqualizerTwoToneIcon></Typography>
                <br></br>
              </Stack>
              <br></br>
              <FormControl >
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
              <br></br>
              <br></br>
            </Box>
            <br></br>
          </>
        )
      }
    }

  )
  )
})

export default AnticoagulantInjection;
