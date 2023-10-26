/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import BloodPress from "../components/BloodPress";
import Spo from "../components/Spo";
import Pulse from "../components/Pulse";
import AnticoagulantInjection from "../components/AnticoagulantInjection";
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../config/config';

import {PatientsContext} from "../context/PatientsContext";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import BloodGlucose from "../components/BloodGlucose";

export default function PatientVisitingPage() {
    const patients = useContext(PatientsContext);
    const {id} = useParams();
    console.log(patients[3]?.permission["Blood Pressure"]);
    const today = new Date();
    const day = today.getDay();
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    console.log(dayNames[day]);
    
   

  return (
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
                                patient?.permission['Blood Pressure'][key] ? <BloodPress />: null
                            )
                        }

                        {
                            Object.keys(patient?.permission['Pulse']).map((key)=>
                                patient?.permission['Pulse'][key] ? <Pulse />: null
                            )
                        }
                            
                            {
                                Object.keys(patient?.permission['Spo2']).map((key)=>
                                    patient?.permission['Spo2'][key] ? <Spo />: null
                                )
                            }
    
                            {
                                Object.keys(patient?.permission['Blood Glucose']).map((key)=>
                                    patient?.permission['Blood Glucose'][key] ? <BloodGlucose />: null
                                )
                            }
    
                            {
                                Object.keys(patient?.permission['Aanticoagulant Injection']).map((key)=>
                                    patient?.permission['Aanticoagulant Injection'][key] ? <AnticoagulantInjection />: null
                                )
                            }

                    </>
                    
                    
                )
            }
        })}
        
    </Box>
  )
}
