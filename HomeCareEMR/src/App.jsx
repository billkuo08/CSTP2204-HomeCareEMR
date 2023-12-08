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
import TestCreateOrderFunction from './__tests__/TestCreateOrderFunction'
import TestAPIFunctionJericho from './__tests__/TestAPIFunctionJericho'
import HistoryOfVisiting from './pages/HistoryOfVisiting'
import SuppliesOrderList from './pages/SuppliesOrderList'
import MuiTreeView from './pages/MuiTreeView'
import UserListPage from './pages/UserListPage'

function App() {
  const [patients, setPatients] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('user'));
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

          <Route path="/" 
          element={userInfo? <HomePage />:<LoginPage />} />
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
          <Route path="/billtest" element={<TestCreateOrderFunction />} />
          <Route path="/jerichotest" element={<TestAPIFunctionJericho />} />
          <Route path="/history/:id" element={<HistoryOfVisiting />} />
          <Route path="/supplies" element={<SuppliesOrderList />} />
          <Route path="/mui" element={<MuiTreeView />} />
          <Route path="/users" element={<UserListPage />} />
          
 

        </Routes>
      </PatientsContext.Provider>
      
    </>
  )
}

export default App
