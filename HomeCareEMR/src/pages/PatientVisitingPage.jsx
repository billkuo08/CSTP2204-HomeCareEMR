/* eslint-disable react/jsx-key */
import { useEffect,useState } from "react";
import BloodPress from "../components/BloodPress";
import Pulse from "../components/Pulse";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/config';



export default function PatientVisitingPage() {
    const [patients, setPatients] = useState([]);
    console.log(patients);
    const today = new Date();
    const day = today.getDay();
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    console.log(dayNames[day]);
   
    const getAllPatientData = async () => {
        try {
            const patients = await getDocs(collection(db, "patients"));
            console.log("patients", patients)
            if(patients){
                const patientsData = patients.docs.map((doc) => {
                    return{
                        ...doc.data(),
                        id: doc.id,
                    };
                });
                setPatients(patientsData);
            }else{
                console.log("No such document!");
            }
        } catch (error) {
            console.log(error);
        }
        

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
