/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BloodPress from "../components/BloodPress";
import '../CSS/PatientVisitingPage.css';
import Spo from "../components/Spo";
import Pulse from "../components/Pulse";
import AnticoagulantInjection from "../components/AnticoagulantInjection";
import { addDailyTask } from "../API/patients.js";
import TourTwoToneIcon from '@mui/icons-material/TourTwoTone';
import PreviewTwoToneIcon from '@mui/icons-material/PreviewTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../config/config';

import {PatientsContext} from "../context/PatientsContext";
import { Typography, Button, Box } from "@mui/material";
import BloodGlucose from "../components/BloodGlucose";
import InsulinInjection from "../components/InsulinInjection";

export default function PatientVisitingPage() {
    const patients = useContext(PatientsContext);
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(patients[3]?.permission["Blood Pressure"]);
    const today = new Date();
    const day = today.getDay();
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    console.log(dayNames[day]);

    const ChildStateRef = useRef();
    const ChildStateRefBloodPressure = useRef();
    const ChildStateRefPulse = useRef();
    const ChildStateRefSpo = useRef();
    const ChildStateRefBloodGlucose = useRef();
    const ChildStateRefInsulinInjection = useRef();
    const handleClick = async (e) => {
        const childState = ChildStateRef.current.getChildState();
        const childStateBloodPressure = ChildStateRefBloodPressure.current.getChildState();
        const childStatePulse = ChildStateRefPulse.current.getChildState();
        const childStateSpo = ChildStateRefSpo.current.getChildState();
        const childStateBloodGlucose = ChildStateRefBloodGlucose.current.getChildState();
        const childStateInsulinInjection = ChildStateRefInsulinInjection.current.getChildState();
        console.log(childState, childStateBloodPressure, childStatePulse, childStateSpo, childStateBloodGlucose, childStateInsulinInjection);
        const data = {
            id,
            childStateBloodPressure,
            childStatePulse,
            childStateSpo,
            childStateBloodGlucose,
            childState,
            childStateInsulinInjection,
            createDateTime: new Date().toISOString(),
        }
        try {
            await addDailyTask(data)
            alert("Patient's Task information submitted successfully.");
        } catch (err) {
            console.log(err)
        }
    }

    const handlecall = (phone) => {
        window.open(`tel:${phone}`);
    }
    
   

  return (
    <>
    <Box className="custom-box">
        <Typography className="h6" variant="h5"><em><b><TourTwoToneIcon></TourTwoToneIcon>  Patient Visiting Page <PreviewTwoToneIcon></PreviewTwoToneIcon></b></em></Typography>

        {patients.map((patient) => {
            if(patient.id === id){
                return(
                    <>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon onClick={()=> navigate(`/order/${patient.id}`)}/>
                    </IconButton>
                    <IconButton color="primary" aria-label="">
                        <CallIcon onClick={()=>handlecall(patient.phone)} />
                    </IconButton>
                    <IconButton color="primary" aria-label="">
                        <ContactPhoneIcon onClick={()=>navigate(`/emergency/${patient.id}`)} />
                    </IconButton>
                    <Box className="custom-box">
                        <br></br>
                        <Typography variant="h6"><b><BadgeTwoToneIcon></BadgeTwoToneIcon> Patient Name :</b> {patient.firstName} {patient.lastName}</Typography>
                        <br></br>
                        <Typography variant="h6"><b><CakeTwoToneIcon></CakeTwoToneIcon> Patient Date of Birth : </b>{patient.birthDate}</Typography>
                        <br></br>
                        <Typography variant="h6"><b><NumbersTwoToneIcon></NumbersTwoToneIcon> Patient Health Card Number : </b>{patient.healthCardNumber}</Typography>
                        <br></br>
                        </Box>
                        <br></br>
                        <br></br>
                        
                        {
                            Object.keys(patient?.permission['Blood Pressure']).map((key)=>
                                patient?.permission['Blood Pressure'][key] && dayNames[day] === key ? <BloodPress ref={ChildStateRefBloodPressure} />: null
                            )
                        }
                        <br></br>

                        
                        {
                            Object.keys(patient?.permission['Pulse']).map((key)=>
                                patient?.permission['Pulse'][key] && dayNames[day] === key ? <Pulse ref={ChildStateRefPulse} />: null
                            )
                        }
                        <br></br>
                            
                        {
                            Object.keys(patient?.permission['Spo2']).map((key)=>
                                patient?.permission['Spo2'][key] && dayNames[day] === key ? <Spo ref={ChildStateRefSpo}/>: null
                            )
                        }

                        <br></br>

                        {
                            Object.keys(patient?.permission['Blood Glucose']).map((key)=>
                                patient?.permission['Blood Glucose'][key] && dayNames[day] === key ? <BloodGlucose ref={ChildStateRefBloodGlucose} />: null
                            )
                        }
                        <br></br>
                        {
                            Object.keys(patient?.permission['Insulin Injection']).map((key)=>
                                patient?.permission['Insulin Injection'][key] && dayNames[day] === key ? <InsulinInjection id={id} ref={ChildStateRefInsulinInjection}  />: null
                            )
                        }
                        
                        <br></br>

                        {
                            Object.keys(patient?.permission['Aanticoagulant Injection']).map((key)=>
                                patient?.permission['Aanticoagulant Injection'][key] && dayNames[day] === key ? <AnticoagulantInjection id={id} ref={ChildStateRef}  />: null
                            )
                        }
                    </>
                    
                    
                )
            }
        })}
                 <br></br>
         <Button variant="outlined" className="button-73" onClick={handleClick} >submit</Button>
         <br></br>
         <br></br>

    </Box>


   

    </>
  )
}
