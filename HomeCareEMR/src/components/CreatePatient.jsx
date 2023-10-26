/* eslint-disable react/no-unknown-property */
import { Container, Typography, Stack, TextField, Button, Box, FormControlLabel, Checkbox, FormControl, FormLabel, FormGroup, InputLabel, MenuItem, Select} from '@mui/material'
import { useState} from 'react'
import { Link } from 'react-router-dom'
// import { addDoc, collection } from 'firebase/firestore';
// import { db} from '../config/config';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addPatient } from '../API/patients';
import MitrixCheckBox from "./MatrixCheckBox"


export default function CreatePatient() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [emergencyContactName, setEmergencyContactName] = useState('')
    const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('')
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('')
    const [bloodPressure, setBloodPressure] = useState('')
    const [tasks, setTasks] = useState([])
    const [gender, setGender] = useState('')
    const [birthDate, setBirthDate] = useState(dayjs())
    const [healthCardNumber, setHealthCardNumber] = useState('')
    const [pulse, setPulse] = useState('')
    const [spo, setSpo] = useState('')
    const [bloodGlucose, setBloodGlucose] = useState('')
    const [route, setRoute] = useState('')
    const [insulinName, setInsulinName] = useState('')
    const [insulinDose, setInsulinDose] = useState('')
    const [anticoagulant, setAnticoagulant] = useState('')
    const [anticoagulantName, setAnticoagulantName] = useState('')
    const [anticoagulantDose, setAnticoagulantDose] = useState('')
    const [permission, setPermission] = useState({
        "Blood Pressure":{            
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            daily: false,
        },
        "Pulse":{
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            daily: false,
        },
        "Spo2":{
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            daily: false,
        },
        "Blood Glucose":{
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            daily: false,
        },
    "Aanticoagulant Injection":{
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            daily: false,
        },
});

    const navStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0055A4', // Professional blue color
        color: 'yellow', // White text for better contrast
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
      };
      const buttonStyle = {
        margin: '5px',
        padding: '10px 20px',
        backgroundColor: 'white', // Light blue background
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        color: 'yellow', // White text
        fontWeight: 'bold', // Bold text
        textDecoration: 'none',
      };
      const gridItemStyle = {
        backgroundColor: 'white',
        padding: '20px',
        border: '1px solid #E0E0E0', // Light gray border
        borderRadius: '5px',
        transition: 'background-color 0.3s',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Subtle box shadow
      };
      const gridItemHoverStyle = {
        backgroundColor: '#F0F0F0', // Light gray background on hover
      };
      const footerStyle = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0055A4', // Match the top navigation bar
        color: 'white',
        padding: '10px',
        textAlign: 'center',
      };
      const formContainerStyle = {
        marginTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      };
      
      const marqueeStyle = {
          backgroundColor: 'red',
          color: 'white',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          animation: 'marquee 30s linear infinite', // Adjust the duration to 30 seconds
        };

    const handleGender = (event) => {
        setGender(event.target.value);
        };  
    
    const handleRoute = (event) => {
        setRoute(event.target.value);
        };

    const handleDayChange = (event) => {
        const index = tasks.indexOf(event.target.value)
        if (index === -1) {
            setTasks([...tasks, event.target.value])
        } else {
            setTasks(tasks.filter(task => task !== event.target.value))
        }
    }

    const handleBloodPress =(event)=>{
        const index = bloodPressure.indexOf(event.target.value)
        if (index === -1) {
            setBloodPressure([...bloodPressure, event.target.value])
        } else {
            setBloodPressure(bloodPressure.filter(task => task !== event.target.value))
        }
    }
 
    const handlePulse =(event)=>{
        const index = pulse.indexOf(event.target.value)
        if (index === -1) {
            setPulse([...pulse, event.target.value])
        } else {
            setPulse(pulse.filter(task => task !== event.target.value))
        }
    }

    const handlespo =(event)=>{
        const index = spo.indexOf(event.target.value)
        if (index === -1) {
            setSpo([...spo, event.target.value])
        } else {
            setSpo(spo.filter(task => task !== event.target.value))
        }
    }

    const handleGlocuse =(event)=>{
        const index = bloodGlucose.indexOf(event.target.value)
        if (index === -1) {
            setBloodGlucose([...bloodGlucose, event.target.value])
        } else {
            setBloodGlucose(bloodGlucose.filter(task => task !== event.target.value))
        }
    }

    const handleAnticoagulant =(event)=>{
        const index = anticoagulant.indexOf(event.target.value)
        if (index === -1) {
            setAnticoagulant([...anticoagulant, event.target.value])
        } else {
            setAnticoagulant(anticoagulant.filter(task => task !== event.target.value))
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const patient = { 
            firstName, 
            lastName,
            birthDate: birthDate.format('YYYY-MM-DD'),
            healthCardNumber,
            route,
            phone, 
            address,
            emergencyContactName,
            emergencyContactRelationship,
            emergencyContactPhone,
            bloodPressure,
            bloodGlucose,
            pulse,
            tasks,
            anticoagulant,
            anticoagulantName,
            anticoagulantDose,
            insulinName,
            insulinDose,
            spo,
            permission,
            createdAt: Date.now(),

        }
        try {
            await addPatient(patient)
            alert("Doctor information submitted successfully.");
        } catch (err) {
            console.log(err)
        }
    }




  return (
    <>
     <marquee behavior="scroll" direction="left" style={{ backgroundColor: 'red', color: 'white' }}>
      This page is off-limits to the public as it is a company pipeline tool, and it is for admin access only; unauthorized access will result in consequences.
      </marquee>

      <nav style={navStyle}>
        <button style={buttonStyle}>
          <a href="/">Home</a>
        </button>
        <button style={buttonStyle}>
          <a href="/about">About</a>
        </button>
        <button style={buttonStyle}>
          <a href="/contact">Contact</a>
        </button>
      </nav>

        <Container >
            <Typography variant="h5">Create Patient</Typography>
            <form onSubmit={handleSubmit} action={<Link to="/" />}>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 0, marginTop: 1 }}>
                    <TextField
                        size="medium"
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
                        size="medium"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />

                    <FormControl fullWidth size="medium">
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        onChange={handleGender}
                        >
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack spacing={1} direction="row" sx={{ marginBottom: 1}}>  

                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker label="Date of Birth"
                                value={birthDate}
                                onChange={(newValue) => setBirthDate(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>  

                        <TextField
                            sx={{width:"36%", paddingTop:1}}
                            size="medium"
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Health Card Number"
                            onChange={e => setHealthCardNumber(e.target.value)}
                            value={healthCardNumber}
                            required
                            />
                        
                    <FormControl size="medium" sx={{width:"36%", paddingTop:1}}>
                        <InputLabel id="demo-simple-select-label">Route</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={route}
                        label="Route"
                        onChange={handleRoute}
                        >
                        <MenuItem value={'routeA'}>A</MenuItem>
                        <MenuItem value={'routeB'}>B</MenuItem>
                        <MenuItem value={'routeC'}>C</MenuItem>
                        </Select>
                    </FormControl>      
                      
                </Stack>
                
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1 }}>
                    <TextField
                        size="medium"
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
                        size="medium"
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
                        size="medium"
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
                        size="medium"
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
                        size="medium"
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
                <Typography variant="h5">Patient Daily Visting Task</Typography>
                <hr />
                <Box>
                    <div className="grid">
                        <span></span>
                        <span>Monday</span>
                        <span>Tuesday</span>
                        <span>Wednesday</span>
                        <span>Thursday</span>
                        <span>Friday</span>
                        <span>Saturday</span>
                        <span>Sunday</span>
                        <span>Daily</span>
                        {Object.keys(permission).map((key)=>
                            <MitrixCheckBox 
                                key={key}
                                permission={permission[key]}
                                setPermission={(newPermission) => {
                                    setPermission({
                                        ...permission, 
                                        [key]:{ ...newPermission},
                                    });
                                }}
                                    
                                label={key} />
                        )} 
                    </div>
                </Box>

                <Typography variant="h5">Other Task</Typography>
                <hr />         
                <Box>
                    <FormControl>
                        <FormGroup row>
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
                                        value='edmaAssessment'
                                        checked={tasks.includes('edmaAssessment')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Edema Assessment'
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
                
                

                <Typography variant="h7">Insulin Injection</Typography>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1}}> 

                    <TextField 
                        label="Insulin Name"
                        value={insulinName}
                        onChange={e => setInsulinName(e.target.value)}
                    />
                    <TextField
                        label="Insulin Dose"
                        value={insulinDose}
                        onChange={e => setInsulinDose(e.target.value)}
                    />
                            
                </Stack>
                <Typography variant="h7">Anticoagulant injection</Typography>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1}}> 
                                   
                    <TextField 
                        label="Anticoagulant Name"
                        value={anticoagulantName}
                        onChange={e => setAnticoagulantName(e.target.value)}
                    />
                    <TextField
                        label="Anticoagulant Dose"
                        value={anticoagulantDose}
                        onChange={e => setAnticoagulantDose(e.target.value)}
                    />
                            
                </Stack>


                <Button 
                variant="outlined" color="secondary" type="submit">Submit</Button>
                
            </form>
        </Container>
    </>
  )
}