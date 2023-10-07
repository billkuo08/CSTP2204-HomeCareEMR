import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePatientPage from './pages/CreatePatientPage'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createpatient" element={<CreatePatientPage />} />
      </Routes>
      
    </>
  )
}

export default App
