/* eslint-disable react/jsx-key */
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { PatientsContext } from '../context/PatientsContext';
import { Typography, Container, Box, Button  } from '@mui/material';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';

export default function EmergencyContact() {
  const {id} = useParams();
  const patients = useContext(PatientsContext);
  console.log(id);
    const handlecall = (phone) => {
        window.open(`tel:${phone}`);
    }

  return (
    
    
      <Container className="flex justify-center items-center form-container" sx={{ width: '50%' }}>
        {patients.map((patient) => {
          if(patient.id === id){
            return(
              <div className="form-wrapper">
                <div className="form-column">
                  <Typography variant="h5" className="h5">
                    Supplies/Medication Order
                  </Typography>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" className="h6">
                      Patient Name: {patient.firstName} {patient.lastName}
                    </Typography>
                    <Typography variant="h6" className="h6">
                      Emergency Contact Name: {patient.emergencyContactName}
                    </Typography>
                    <Typography variant="h6" className="h6">
                      relationship: {patient.emergencyContactRelationship}
                    </Typography>
                    <Typography variant="h6" className="h6">
                      Emergency Contact Phone: {patient.emergencyContactPhone}
                    </Typography>

                      <Button variant="outlined" onClick={()=>handlecall(patient.emergencyContactPhone)} startIcon={<PhoneForwardedIcon />}>
                        Call
                      </Button>

                    </Box>
                </div>
                </div>



            )
          }
        })}
      </Container>
    
  )
}
