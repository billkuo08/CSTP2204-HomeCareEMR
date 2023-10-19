import React, { useState } from 'react';
import '../CSS/HomePage.css';
import { Bar, Line } from 'react-chartjs-2';
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

//
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function HomePage() {
  const currentYear = new Date().getFullYear();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title:{
      text: "Simple Column Chart with Index Labels"
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "outside",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 71 },
        { x: 60, y: 68 },
        { x: 70, y: 38 },
        { x: 80, y: 92, indexLabel: "Highest" },
        { x: 90, y: 54 },
        { x: 100, y: 60 },
        { x: 110, y: 21 },
        { x: 120, y: 49 },
        { x: 130, y: 36 }
      ]
    }]
  }


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
          <br></br>

          <br></br>

          <br></br>
          <div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
				// /* containerProps={{ width: '100%', height: '300px' }} 
			/>
 
		</div>
    
        </div>
      </div>
      <footer className="footer">
        &copy; {currentYear} HomeCare EMR
      </footer>
    </div>
  );
}
