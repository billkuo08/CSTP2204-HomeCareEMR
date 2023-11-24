import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
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

export const updatePatient = async (patient) => {
  try {
    const docRef = await updateDoc(doc(db, "patients", patient.id), patient);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const addDailyTask = async (dailyTask) => {
  try {
    const docRef = await addDoc(collection(db, "dailyTask", ), dailyTask);
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

    export const getPatientById = async (id) => {
        try {
            const patient = await getDoc(doc(db, "patients", id));
            console.log("patient", patient)
            if(patient){
            const patientData = patient.data();
            return patientData;
            }else{
            console.log("No such document!");
            }
        } catch (error) {
            console.log(error);
        }
        }

        export const deletePatient = async (id) => {
            try {
                await deleteDoc(doc(db, "patients", id));
                console.log("Document successfully deleted!");
            } catch (error) {
                console.error("Error removing document: ", error);
            }
            }

