/* eslint-disable react/jsx-key */
import { useEffect,useState } from "react";
import BloodPress from "../components/BloodPress";
import Pulse from "../components/Pulse";
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../config/config';
import { getAllPatients } from "../API/patients";



export default function PatientVisitingPage() {
    const [patients, setPatients] = useState([]);
    console.log(patients);
    const today = new Date();
    const day = today.getDay();
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    console.log(dayNames[day]);
   
    const getAllPatientData = async () => {
        const patientsData = await getAllPatients();
        setPatients(patientsData);  
    }
    
    useEffect(() => {
        getAllPatientData();
    }, [])

  return (
    <>
        <div>PatientVisitingPage</div>
        {patients[2]?.bloodPressure.map((bp) => {
            if(bp === dayNames[day]){
                return(
                    <BloodPress />)
            }
            
        })
        }        
        <Pulse />
    </>
  )
}
