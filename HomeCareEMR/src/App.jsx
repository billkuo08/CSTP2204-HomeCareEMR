import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePatientPage from './pages/CreatePatientPage'
import PatientVisitingPage from './pages/PatientVisitingPage'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createpatient" element={<CreatePatientPage />} />
        <Route path="/visiting" element={<PatientVisitingPage />} />
      </Routes>
      
    </>
  )
}

export default App
