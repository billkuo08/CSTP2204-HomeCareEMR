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
import '../CSS/CreatePatient.css';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../config/config';

import {PatientsContext} from "../context/PatientsContext";
import { Typography, Box } from "@mui/material";
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

    const ChildStateRefAnticoagulantInjection = useRef();
    const ChildStateRefBloodPressure = useRef();
    const ChildStateRefPulse = useRef();
    const ChildStateRefSpo = useRef();
    const ChildStateRefBloodGlucose = useRef();
    const ChildStateRefInsulinInjection = useRef();
    let childStateBloodPressure= "";
    let childStatePulse= "";
    let childStateSpo= "";
    let childStateBloodGlucose= "";
    let childStateInsulinInjection= "";
    let childStateAnticoagulantInjection= "";
    const handleClick = async (e) => {
        patients.map((patient) => {
            if(patient.id === id){
                console.log(patient);
                Object.keys(patient?.permission['Blood Pressure']).map((key)=>{
                    if(patient?.permission['Blood Pressure'][key] && dayNames[day] === key){
                        childStateBloodPressure = ChildStateRefBloodPressure.current.getChildState();
                    }
                })
                Object.keys(patient?.permission['Pulse']).map((key)=>{
                    if(patient?.permission['Pulse'][key] && dayNames[day] === key){
                        childStatePulse = ChildStateRefPulse.current.getChildState();
                    }
                })
                Object.keys(patient?.permission['Spo2']).map((key)=>{
                    if(patient?.permission['Spo2'][key] && dayNames[day] === key){
                        childStateSpo = ChildStateRefSpo.current.getChildState();
                    }
                })
                Object.keys(patient?.permission['Blood Glucose']).map((key)=>{
                    if(patient?.permission['Blood Glucose'][key] && dayNames[day] === key){
                        childStateBloodGlucose = ChildStateRefBloodGlucose.current.getChildState();
                    }
                })
                Object.keys(patient?.permission['Insulin Injection']).map((key)=>{
                    if(patient?.permission['Insulin Injection'][key] && dayNames[day] === key){
                        childStateInsulinInjection = ChildStateRefInsulinInjection.current.getChildState();
                    }
                })
                Object.keys(patient?.permission['Aanticoagulant Injection']).map((key)=>{
                    if(patient?.permission['Aanticoagulant Injection'][key] && dayNames[day] === key){
                        childStateAnticoagulantInjection = ChildStateRefAnticoagulantInjection.current.getChildState();
                    }
                })
            }
        }
        )

        const data = {
            patientId: id,
            childStateBloodPressure,
            childStatePulse,
            childStateSpo,
            childStateBloodGlucose,
            childStateAnticoagulantInjection,
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
<Box className="form-container">
<Typography className="h5" variant="h5"><em><b><TourTwoToneIcon></TourTwoToneIcon>  Patient Visiting Page <PreviewTwoToneIcon></PreviewTwoToneIcon></b></em>
<br></br>
</Typography>
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
                    <Box>
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
                                patient?.permission['Blood Pressure'][key] && dayNames[day] === key ? <BloodPress ref={ChildStateRefBloodPressure} />: ""
                            )
                        }
                        <br></br>

                        
                        {
                            Object.keys(patient?.permission['Pulse']).map((key)=>
                                patient?.permission['Pulse'][key] && dayNames[day] === key ? <Pulse ref={ChildStateRefPulse} />: ""
                            )
                        }
                        <br></br>
                            
                        {
                            Object.keys(patient?.permission['Spo2']).map((key)=>
                                patient?.permission['Spo2'][key] && dayNames[day] === key ? <Spo ref={ChildStateRefSpo}/>: ""
                            )
                        }

                        <br></br>

                        {
                            Object.keys(patient?.permission['Blood Glucose']).map((key)=>
                                patient?.permission['Blood Glucose'][key] && dayNames[day] === key ? <BloodGlucose ref={ChildStateRefBloodGlucose} />: ""
                            )
                        }
                        <br></br>
                        {
                            Object.keys(patient?.permission['Insulin Injection']).map((key)=>
                                patient?.permission['Insulin Injection'][key] && dayNames[day] === key ? <InsulinInjection id={id} ref={ChildStateRefInsulinInjection}  />: ""
                            )
                        }
                        
                        <br></br>

                        {
                            Object.keys(patient?.permission['Aanticoagulant Injection']).map((key)=>
                                patient?.permission['Aanticoagulant Injection'][key] && dayNames[day] === key ? <AnticoagulantInjection id={id} ref={ChildStateRefAnticoagulantInjection}  />: ""
                            )
                        }
                    </>
                    
                    
                )
            }
        })}

<div> <button className="button88"  onClick={handleClick}> submit </button>
   </div>
    </Box>
    </>
  )
}
