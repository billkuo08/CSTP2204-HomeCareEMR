import { useState } from 'react';
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
import CanvasJSReact from '@canvasjs/react-charts';
import Diversity1TwoToneIcon from '@mui/icons-material/Diversity1TwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import FlipCameraAndroidTwoToneIcon from '@mui/icons-material/FlipCameraAndroidTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

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
    theme: "light2",
    title: {
      text: "Highest Diagnostic Test Results"
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column",
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
  };

  const options2 = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Medical Traffic Sources",
      className: "custom-title-class", // Custom class for the title
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b:>{label}</b: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: [
        { y: 18, label: "Direct" },
        { y: 49, label: "Organic Search" },
        { y: 9, label: "Paid Search" },
        { y: 5, label: "Referral" },
        { y: 19, label: "Social" }
      ]
    }]
  };

  return (
    <div>
      <button className="toggle-button" onClick={toggleSidebar}>
        <ViewSidebarTwoToneIcon />
      </button>
      <div className="content">
        <div className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
          <h3><NavigationTwoToneIcon/> <PinchTwoToneIcon/></h3>
          <ul>
            <li>
              <a href="/admin"><PasswordTwoToneIcon/> Admin Login</a>
            </li>
            <li>
              <a href="/nurses"><HealthAndSafetyTwoToneIcon/> Nurses</a>
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
            <p><Diversity1TwoToneIcon /> our Trusted Partner in Healthcare <VolunteerActivismTwoToneIcon /></p>
          </div>
          <div className="grid-container">

{/* ////////////////////////// FLIP CARDS ////////////////////////// */}
            <div className="flip-card">
    <div className="flip-card-inner">
        <div className="flip-card-front">
            <p className="title">Community Care Clinics</p>
            <p><FlipCameraAndroidTwoToneIcon /></p>
        </div>
        <div className="flip-card-back">
        <p className="title"><InfoTwoToneIcon/></p>
            <p>Community care clinics provide a range of nursing care and other professional health services in your community.</p>
        </div>
    </div>
</div>

<div className="flip-card">
    <div className="flip-card-inner">
        <div className="flip-card-front">
            <p className="title">Home Care Nursing</p>
            <p><FlipCameraAndroidTwoToneIcon /></p>
        </div>
        <div className="flip-card-back">
        <p className="title"><InfoTwoToneIcon/></p>
            <p>Nurses working in Home & Community Care provide a range of services, both in community clinics and in your home.</p>
        </div>
    </div>
</div>

<div className="flip-card">
    <div className="flip-card-inner">
        <div className="flip-card-front">
            <p className="title">Home Support Services</p>
            <p><FlipCameraAndroidTwoToneIcon /></p>
        </div>
        <div className="flip-card-back">
            <p className="title"><InfoTwoToneIcon/></p>
            <p>Home support services are intended to promote independence for those with chronic health conditions, disabilities or terminal illness.</p>
        </div>
    </div>
</div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            We are committed to your well-being.
          </p>
          <br></br>
          <div>
            <CanvasJSChart options={options} />
            <CanvasJSChart options={options2} />
          </div>
        </div>
      </div>
      <footer className="footer">
        &copy; {currentYear} HomeCare EMR
      </footer>
    </div>
  );
}
