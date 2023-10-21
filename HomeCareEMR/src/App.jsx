import './App.css'
import { Routes, Route, useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePatientPage from './pages/CreatePatientPage'
import PatientVisitingPage from './pages/PatientVisitingPage'
import PatientListPage from './pages/PatientListPage'
import { getAllPatients } from './API/patients';
import {PatientsContext} from './context/PatientsContext';
import { useState, useEffect } from 'react';

function App() {
  const [patients, setPatients] = useState([]);
    console.log(patients);
      const getAllPatientData = async () => {
        const patientsData = await getAllPatients();
        setPatients(patientsData);  
    }

  useEffect(() => {
    getAllPatientData();
  }, [])
    

  return (
    <>
      <PatientsContext.Provider 
      value={patients}>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<PatientListPage />} />
          <Route path="/visiting/:id" element={<PatientVisitingPage />} />
          <Route path="/createpatient" element={<CreatePatientPage />} />
          <Route path="/visiting" element={<PatientVisitingPage />} />
        </Routes>
      </PatientsContext.Provider>
      
    </>
  )
}

export default App
