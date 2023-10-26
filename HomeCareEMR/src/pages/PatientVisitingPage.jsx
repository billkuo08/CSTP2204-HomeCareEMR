/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import BloodPress from "../components/BloodPress";
import Spo from "../components/Spo";
import Pulse from "../components/Pulse";
import AnticoagulantInjection from "../components/AnticoagulantInjection";
import { addDailyTask } from "../API/patients.js";
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../config/config';

import {PatientsContext} from "../context/PatientsContext";
import { Typography, Button, Box } from "@mui/material";
import BloodGlucose from "../components/BloodGlucose";
import InsulinInjection from "../components/InsulinInjection";

export default function PatientVisitingPage() {
    const patients = useContext(PatientsContext);
    const {id} = useParams();
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
    
   

  return (
    <>
    <Box>
        <Typography variant="h5">Patient Visiting Page</Typography>
        {patients.map((patient) => {
            if(patient.id === id){
                return(
                    <>
                        <Typography variant="h6">Patient Name : {patient.firstName} {patient.lastName}</Typography>
                        <Typography variant="h6">Patient Date of Birth : {patient.birthDate}</Typography>
                        <Typography variant="h6">Patient Health Card Number : {patient.healthCardNumber}</Typography>

                        {
                            Object.keys(patient?.permission['Blood Pressure']).map((key)=>
                                patient?.permission['Blood Pressure'][key] && dayNames[day] === key ? <BloodPress ref={ChildStateRefBloodPressure} />: null
                            )
                        }

                        {
                            Object.keys(patient?.permission['Pulse']).map((key)=>
                                patient?.permission['Pulse'][key] && dayNames[day] === key ? <Pulse ref={ChildStateRefPulse} />: null
                            )
                        }
                            
                        {
                            Object.keys(patient?.permission['Spo2']).map((key)=>
                                patient?.permission['Spo2'][key] && dayNames[day] === key ? <Spo ref={ChildStateRefSpo}/>: null
                            )
                        }

                        {
                            Object.keys(patient?.permission['Blood Glucose']).map((key)=>
                                patient?.permission['Blood Glucose'][key] && dayNames[day] === key ? <BloodGlucose ref={ChildStateRefBloodGlucose} />: null
                            )
                        }

                        {
                            Object.keys(patient?.permission['Insulin Injection']).map((key)=>
                                patient?.permission['Insulin Injection'][key] && dayNames[day] === key ? <InsulinInjection id={id} ref={ChildStateRefInsulinInjection}  />: null
                            )
                        }

                        {
                            Object.keys(patient?.permission['Aanticoagulant Injection']).map((key)=>
                                patient?.permission['Aanticoagulant Injection'][key] && dayNames[day] === key ? <AnticoagulantInjection id={id} ref={ChildStateRef}  />: null
                            )
                        }

                    </>
                    
                    
                )
            }
        })}
        
    </Box>

    <Button variant="outlined" onClick={handleClick} >submit</Button>

    </>
  )
}
