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
    console.log(patients);
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
                        {(() => {
                            if(patient.bloodPressure!=""){
                                for(let bp of patient.bloodPressure){
                                    if(bp === dayNames[day]){
                                        return(
                                            <BloodPress />
                                        )
                                    }
                                }         
                            }
                        })()
                        }

                        {(() => {
                            if(patient.pulse!=""){
                                for(let pl of patient.pulse){
                                    if(pl === dayNames[day]){
                                        return(
                                            <Pulse />
                                        )
                                    }
                                }         
                            }
                        }
                        )()
                        }
                        {(() => {
                            if(patient.spo!=""){
                                for(let sp of patient.spo){
                                    if(sp === dayNames[day]){
                                        return(
                                            <Spo />
                                        )
                                    }
                                }         
                            }
                        }
                        )()
                        }
                        {(() => {
                            if(patient.anticoagulant!=""){
                                for(let ac of patient.anticoagulant){
                                    if(ac === dayNames[day]){
                                        return(
                                            <AnticoagulantInjection />
                                        )
                                    }
                                }         
                            }
                        }
                        )()
                        }

                        {(() => {
                            if(patient.bloodGlucose!=""){
                                for(let bg of patient.bloodGlucose){
                                    if(bg === dayNames[day]){
                                        return(
                                            <BloodGlucose />
                                        )
                                    }
                                }         
                            }
                        }
                        )()
                        }
                        


                        
                    </>
                    
                    
                )
            }
        })}
   
        {/* {patients[3]?.bloodPressure.map((bp) => {
            if(bp === dayNames[day-1]){
                return(
                    <BloodPress />)
            }
            
        })
        }     */}
  
        
    </Box>
  )
}
