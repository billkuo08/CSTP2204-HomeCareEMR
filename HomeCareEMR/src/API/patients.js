import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/config";

export const addPatient = async (patient) => {
  try {
    const docRef = await addDoc(collection(db, "patients"), patient);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getAllPatients = async () => {
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
        return patientsData;
        }else{
        console.log("No such document!");
        }
    } catch (error) {
        console.log(error);
    }
    }