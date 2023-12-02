/* eslint-disable react/display-name */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { PatientsContext } from "../context/PatientsContext"
import { forwardRef, useContext, useState, useImperativeHandle } from "react";
import { Box, Checkbox, FormControlLabel,Stack,Typography, Avatar } from '@mui/material'
import edema from '../images/edema.jpeg'

const OtherTasks = forwardRef((props, _ref) => {
  const {id} = props;
  console.log(id)
  const patients = useContext(PatientsContext);
  const [reason, setReason] = useState('');
  const [edemaAssessResult, setEdemaAssessResult] = useState('');
  const [checked, setChecked] = useState({
    took: false,
    refused: false,
    edemaAssess: false,
  });
  
  const handleChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    })
  };

  const { took, refused, edemaAssess } = checked;

  useImperativeHandle(_ref, () => ({
    getChildState() {
      return {
        took,
        refused,
        edemaAssess,
        reason,
        edemaAssessResult,
      }
    }
  }))
  
  

  return (   
    <>
        <Box>
          {patients.map((patient) => {
            if(patient.id === id){
              console.log(patient.tasks)
              return(
                <>
                  {patient.tasks.map((task) => {
                    if(task === "Medication Administration"){
                      return(
                        <>
                        <Box>
                          <Stack>
                            <Typography variant="h5"><b> Medication Administration </b></Typography>
                              <FormControlLabel
                                control={
                                <Checkbox 
                                  checked={took}
                                  onChange={handleChange}
                                  name="took"
                                  inputProps={{ 'aria-label': 'controlled' }}
                                />}
                                label= {"Witnessed for Medication Administration"}
                              />                      
                          </Stack>

                          <Stack>
                            <FormControlLabel
                              control={
                              <Checkbox 
                                checked={refused}
                                onChange={handleChange}
                                name="refused"
                                inputProps={{ 'aria-label': 'controlled' }}
                              />}
                              label= {"Patient Refused"}
                            />
                          </Stack>

                          <Stack>
                            {refused &&
                              <div>
                                <textarea
                                  placeholder="Enter the reason for refusal"
                                  value={reason}
                                  onChange={(e) => setReason(e.target.value)}
                                  rows="10"
                                ></textarea>
                              </div>
                            }
                          </Stack>
                        </Box>
                        </>
                      )
                    }
                    if(task === "Edma Assessment"){
                      return(
                        <>
                        <Box>
                          <Typography variant="h5"><b> Edma Assessment </b></Typography>
                          <Avatar variant={"rounded"} alt="The image" src={edema} style={{
                            width: "100%",
                            height: "100%",
                          }} />
                          <Stack>
                            <FormControlLabel
                              control={
                              <Checkbox 
                                checked={edemaAssess}
                                onChange={handleChange}
                                name="edemaAssess"
                                inputProps={{ 'aria-label': 'controlled' }}
                              />}
                              label= {"Assess for Edma Assessment"}
                            />
                          </Stack>

                          <Stack>
                            {edemaAssess &&
                              <div>
                                <textarea
                                  placeholder="Enter edema assessment"
                                  value={edemaAssessResult}
                                  onChange={(e) => setEdemaAssessResult(e.target.value)}
                                  rows="10"
                                ></textarea>
                              </div>
                            }
                          </Stack>
                        </Box>
                        </>
                      )
                    }
                  })}
                  
                </>
              )
            }
          })}
        </Box>
    </>
  )
})

export default OtherTasks;
