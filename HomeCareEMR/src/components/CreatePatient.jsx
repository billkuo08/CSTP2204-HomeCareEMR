/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import { Container, Typography, Stack, TextField, Button, Box, FormControlLabel, Checkbox, FormControl, FormGroup, InputLabel, MenuItem, Select} from '@mui/material'
import { useState} from 'react'
import '../CSS/CreatePatient.css';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addPatient } from '../API/patients';
import MitrixCheckBox from "./MatrixCheckBox"
import CreateNewFolderTwoToneIcon from '@mui/icons-material/CreateNewFolderTwoTone';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import TaskAltTwoToneIcon from '@mui/icons-material/TaskAltTwoTone';
import LowPriorityTwoToneIcon from '@mui/icons-material/LowPriorityTwoTone';
import PlaylistAddTwoToneIcon from '@mui/icons-material/PlaylistAddTwoTone';


export default function CreatePatient() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [emergencyContactName, setEmergencyContactName] = useState('')
    const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('')
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('')
    const [tasks, setTasks] = useState([])
    const [gender, setGender] = useState('')
    const [birthDate, setBirthDate] = useState(dayjs())
    const [healthCardNumber, setHealthCardNumber] = useState('')
    const [route, setRoute] = useState('')
    const [insulinName, setInsulinName] = useState('')
    const [insulinDose, setInsulinDose] = useState('')
    const [anticoagulantName, setAnticoagulantName] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
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
        "Insulin Injection":{
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const patient = { 
            firstName, 
            lastName,
            birthDate: birthDate.format('YYYY-MM-DD'),
            healthCardNumber,
            gender,
            route,
            phone, 
            address,
            lat,
            lng,
            emergencyContactName,
            emergencyContactRelationship,
            emergencyContactPhone,
            tasks,
            anticoagulantName,
            anticoagulantDose,
            insulinName,
            insulinDose,
            permission,
            createdAt: new Date().toISOString(),

        }
        try {
            await addPatient(patient)
            alert("Doctor information submitted successfully.");
        } catch (err) {
            console.log(err)
        }

        setFirstName("")
        setLastName("")
        setPhone("")
        setAddress("")
        setLat("")
        setLng("")
        setEmergencyContactName("")
        setEmergencyContactRelationship("")
        setEmergencyContactPhone("")
        setTasks([])
        setGender("")
        setBirthDate(dayjs())
        setHealthCardNumber("")
        setRoute("")
        setInsulinName("")
        setInsulinDose("")
        setAnticoagulantName("")
        setAnticoagulantDose("")
        setPermission({
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
            "Insulin Injection":{
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
        
    }




  return (
    <>
      <div className="main-content">
        <Container className="form-container" id="create-patient" >
        <Typography variant="h5" className="h5"><b><CreateNewFolderTwoToneIcon /> Create Patient <CreateTwoToneIcon /></b></Typography>
        <form onSubmit={handleSubmit} action={<Link to="/" />} >
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
            <br></br>
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
            <br></br>
                    <FormControl fullWidth size="medium" >
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

                <br></br>

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
                
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1 }} >
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
                        label="Latitude"
                        onChange={e => setLat(e.target.value)}
                        value={lat}
                        fullWidth
                        required
                    />
                    <TextField
                        size="medium"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Longitude"
                        onChange={e => setLng(e.target.value)}
                        value={lng}
                        fullWidth
                        required
                    />
                </Stack>

                <br></br>

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
                <br></br>
                <Typography variant="h5" className="h5"><b> <FormatListBulletedTwoToneIcon/> Patient Daily Visiting Task <TaskAltTwoToneIcon /></b></Typography>
                <br></br>
                <hr />
                <Box className="custom-box">
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
                <br></br>
                <br></br>
                <Typography variant="h5" className="h5"><b><LowPriorityTwoToneIcon /> Other Task <PlaylistAddTwoToneIcon /></b></Typography>
                <br></br>
                <hr />         
                <Box className="custom-box">
                    <FormControl className="whitefam">
                        <FormGroup className="whitefam" row >
                            <FormControlLabel className="whitefam"
                                control={
                                    <Checkbox className="whitefam"
                                        value='Medication Administration'
                                        checked={tasks.includes('Medication Administration')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Medication Administration'
                            />
                            <FormControlLabel className="whitefam"
                                control={
                                    <Checkbox className="whitefam"
                                        value='Edma Assessment'
                                        checked={tasks.includes('Edma Assessment')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Edema Assessment'
                            />
                            <FormControlLabel className="whitefam"
                                control={
                                    <Checkbox
                                        value='Additional Instruction'
                                        checked={tasks.includes('Additional Instruction')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Additional Instruction'
                            />                           
                        </FormGroup>
                    </FormControl>
                </Box>
                
                <br></br>

                <Typography className="whitefam" variant="h7"><b>Insulin Injection</b></Typography>
                <Stack className="whitefam" spacing={1} direction="row" sx={{ marginBottom: 1, marginTop: 1}} justifyContent="center" alignItems="center">

                    <TextField className="whitefam"
                        label="Insulin Name"
                        value={insulinName}
                        onChange={e => setInsulinName(e.target.value)}
                    />

                    
                    <TextField className="whitefam"
                        label="Insulin Dose"
                        value={insulinDose}
                        onChange={e => setInsulinDose(e.target.value)}
                    />
                </Stack>
                
                <br></br>

                <Typography className="whitefam" variant="h7" sx={{ textAlign: 'Left' }}><b>Anticoagulant injection</b></Typography>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1, marginTop: 1}} justifyContent="center" alignItems="center">


                    
    <TextField className="whitefam"
        label="Anticoagulant Name"
        value={anticoagulantName}
        onChange={e => setAnticoagulantName(e.target.value)}
    />

    
    <TextField className="whitefam"
        label="Anticoagulant Dose"
        value={anticoagulantDose}
        onChange={e => setAnticoagulantDose(e.target.value)}
    />
</Stack>

<br></br>
                <Button className="button-73 , custom-box" 
                variant="outlined" color="secondary" type="submit">Submit</Button>
                
            </form>
        </Container>
      </div>  
      
    </>
  )
}