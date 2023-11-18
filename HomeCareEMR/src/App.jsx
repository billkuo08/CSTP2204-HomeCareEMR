import './App.css'
import { Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePatientPage from './pages/CreatePatientPage'
import PatientVisitingPage from './pages/PatientVisitingPage'
import PatientListPage from './pages/PatientListPage'
import { getAllPatients } from './API/patients';
import {PatientsContext} from './context/PatientsContext';
import { useState, useEffect } from 'react';
import CheckboxComponent from './components/CheckboxComponent';
import RouteMapPage from './pages/RouteMapPage';
import LocationTrackerPage from './pages/LocationTrackerPage'
import MileageLogPage from './pages/MileageLogPage';
import EditPatientPage from './pages/EditPatientPage';
import CreateUserPage from './pages/CreateUserPage'
import CreateNurse from './components/CreateNurse'
import LoginPage from './pages/LoginPage'
import OrderPage from './pages/OrderPage'
import EmergencyContact from './pages/EmergencyContact'
import TestAPIFunction from './__tests__/TestAPIFunction'


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

    <div className="body">
</div>

      <PatientsContext.Provider 
      value={patients}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<PatientListPage />} />
          <Route path="/visiting/:id" element={<PatientVisitingPage />} />
          <Route path="/edit/:id" element={<EditPatientPage />} />
          <Route path="/createpatient" element={<CreatePatientPage />} />
          <Route path="/visiting" element={<PatientVisitingPage />} />
          <Route path="/checkbox" element={<CheckboxComponent />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/direction" element={<RouteMapPage/>} />
          <Route path="/tracker" element={<LocationTrackerPage/>} />
          <Route path="/mileagelog" element={<MileageLogPage/>} />
          <Route path="/createuser" element={<CreateUserPage/>} />
          <Route path="/createnurse" element={<CreateNurse/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/order/:id" element={<OrderPage/>} />
          <Route path="/emergency/:id" element={<EmergencyContact />} />
          <Route path="/test" element={<TestAPIFunction />} />


        </Routes>
      </PatientsContext.Provider>
      
    </>
  )
}

export default App
