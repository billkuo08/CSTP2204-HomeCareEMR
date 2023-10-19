import React, { useState } from 'react';
import '../CSS/HomePage.css';
import ViewSidebarTwoToneIcon from '@mui/icons-material/ViewSidebarTwoTone';
import HealthAndSafetyTwoToneIcon from '@mui/icons-material/HealthAndSafetyTwoTone';
import InsertChartTwoToneIcon from '@mui/icons-material/InsertChartTwoTone';
import PersonPinCircleTwoToneIcon from '@mui/icons-material/PersonPinCircleTwoTone';
import DoNotStepTwoToneIcon from '@mui/icons-material/DoNotStepTwoTone';
import FolderSharedTwoToneIcon from '@mui/icons-material/FolderSharedTwoTone';
import VaccinesTwoToneIcon from '@mui/icons-material/VaccinesTwoTone';
import NavigationTwoToneIcon from '@mui/icons-material/NavigationTwoTone';
import PinchTwoToneIcon from '@mui/icons-material/PinchTwoTone';
import PasswordTwoToneIcon from '@mui/icons-material/PasswordTwoTone';

export default function HomePage() {
  const currentYear = new Date().getFullYear();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <button className="toggle-button" onClick={toggleSidebar}>
      <ViewSidebarTwoToneIcon /> {/* Use the Menu icon */}
      </button>
      <div className="content">
        <div
          className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}
        >
          <h3><NavigationTwoToneIcon/> <PinchTwoToneIcon/></h3>
          <ul>

          <li>
              <a href="/admin"><PasswordTwoToneIcon/> Admin Login </a>
            </li>

            <li>
              <a href="/nurses"><HealthAndSafetyTwoToneIcon/> Nurses </a>
            </li>

            <li>
              <a href="/charts"><InsertChartTwoToneIcon/> Health Charts</a>
            </li>
          
          <li>
              <a href="/tracker"><PersonPinCircleTwoToneIcon/> Location Tracker</a>
            </li>

            <li>
              <a href="/log"><DoNotStepTwoToneIcon/> Mileage Log Tracker</a>
            </li>

            <li>
              <a href="/database"><FolderSharedTwoToneIcon/> Patient Database</a>
            </li>
            
            <li>
              <a href="/order"><VaccinesTwoToneIcon/> Order Medication & Supplies</a>
            </li>

            </ul>
        </div>
        <div className="main-content">
          <div className="header">
            <h1>Welcome to HomeCare EMR</h1>
            <p>Your Trusted Partner in Healthcare ♥️</p>
          </div>
          <div className="grid-container">
            <div className="grid-item">
              <h2>Services</h2>
              <p>We offer a wide range of medical services to cater to your needs.</p>
            </div>
            <div className="grid-item">
              <h2>Doctors</h2>
              <p>Meet our experienced and dedicated medical professionals.</p>
            </div>
            <div className="grid-item">
              <h2>Appointments</h2>
              <p>Schedule an appointment and receive quality healthcare.</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            We are committed to your well-being.
          </p>
          
        </div>
      </div>
      <footer className="footer">
        &copy; {currentYear} HomeCare EMR
      </footer>
    </div>
  );
}
