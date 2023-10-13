import { Container, Typography, Stack, TextField, Button, Box, FormControlLabel, Checkbox, FormControl, FormLabel, FormGroup} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore';
import { db} from '../config/config';


export default function CreatePatient() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [emergencyContactName, setEmergencyContactName] = useState('')
    const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('')
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('')
    const [tasks, setTasks] = useState([])

    const handleDayChange = (event) => {
        const index = tasks.indexOf(event.target.value)
        if (index === -1) {
            setTasks([...tasks, event.target.value])
        } else {
            setTasks(tasks.filter(task => task !== event.target.value))
        }
    }
 


    const patientsRef = collection(db, 'patients')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const patient = { 
            firstName, 
            lastName, 
            phone, 
            address,
            emergencyContactName,
            emergencyContactRelationship,
            emergencyContactPhone,
            tasks

        }
        try {
            await addDoc(patientsRef, patient)
            alert("Doctor information submitted successfully.");
        } catch (err) {
            console.log(err)
        }
    }


  return (
    <>
        <Container>
            <Typography variant="h5">Create Patient</Typography>
            <form onSubmit={handleSubmit} action={<Link to="/" />}>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1, marginTop: 1 }}>
                    <TextField
                        size="small"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        size="small"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                    <TextField
                        size="small"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Phone"
                        onChange={e => setPhone(e.target.value)}
                        value={phone}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1 }}>
                    <TextField
                        size="small"
                        type="address"
                        variant='outlined'
                        color='secondary'
                        label="Address"
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1 }}>
                    <TextField
                        size="small"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Emergency Contact Name"
                        onChange={e => setEmergencyContactName(e.target.value)}
                        value={emergencyContactName}
                        fullWidth
                        required
                    />
                    <TextField
                        size="small"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Relationship"
                        onChange={e => setEmergencyContactRelationship(e.target.value)}
                        value={emergencyContactRelationship}
                        fullWidth
                        required
                    />
                    <TextField
                        size="small"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Emergency Contact Phone"
                        onChange={e => setEmergencyContactPhone(e.target.value)}
                        value={emergencyContactPhone}
                        fullWidth
                        required
                    />
                </Stack>
<Box>
                    <FormControl>
                        <FormLabel>Patient Daily Visting Task</FormLabel>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='vitalSigns'
                                        checked={tasks.includes('vitalSigns')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Vital Signs'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='medicationAdministration'
                                        checked={tasks.includes('medicationAdministration')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Medication Administration'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='injectionAdministration'
                                        checked={tasks.includes('injectionAdministration')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Injection Administration'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='assessment'
                                        checked={tasks.includes('assessment')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Assessment'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='additionalInstruction'
                                        checked={tasks.includes('additionalInstruction')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Additional Instruction'
                            />
                           
                        </FormGroup>
                    </FormControl>
                </Box>
                <Button 
                variant="outlined" color="secondary" type="submit" >Submit</Button>
                

            </form>
        </Container>
    </>
  )
}
