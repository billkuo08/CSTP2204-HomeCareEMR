
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
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
import GpsFixedTwoToneIcon from '@mui/icons-material/GpsFixedTwoTone';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import Box from '@mui/material/Box';
import PatientListPage from './PatientListPage';
import PatientTableComponent from '../components/PatientTableComponent';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { dbMap, mapAPIKey } from "../config/config"
import car from '../images/car.png';
import "../CSS/Map.css"


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const ShowComponent = (props) => {
  console.log(props);
  const { childre, activeTree, selectedTree } = props;
  console.log(activeTree);
  return (
    <div hidden={activeTree !== selectedTree}>
      {activeTree === selectedTree && <Box mx={2}>{childre}</Box>}
    </div>
  );
}
export default function HomePage() {
  const currentYear = new Date().getFullYear();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeTree, setActiveTree] = useState();
  console.log(activeTree);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Highest Diagnostic Test Results",
      // Set the background color here
      backgroundColor: "rgba(255, 255, 255, 0.691)"
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
      // Set the background color here
      backgroundColor: "rgba(255, 255, 255, 0.691)"
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
  const handleSelect = (event, selectedTree) => {
    setActiveTree(selectedTree);
  };

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
    navigator("/login");
  }

  const center = {
    lat: 49.33473336980647,
    lng: -123.15846009191421,
  };

  const dbMap = getDatabase();

  const { isLoaded, google } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapAPIKey,
  });

  const [currentLocation, setCurrentLocation] = useState([]);



  useEffect(() => {

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(userLocation);
        console.log(currentLocation)
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );

    // Clean up the watchId on component unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);



  return isLoaded ? (

    <div className="body">
      <button className="toggle-button" onClick={toggleSidebar}>
        <ViewSidebarTwoToneIcon />
      </button>
      <div className="content">
        <div className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
          <h3><NavigationTwoToneIcon /> <PinchTwoToneIcon /></h3>

          <br></br>
          <br></br>



          <ul>

            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              onNodeSelect={handleSelect}
            >
              <TreeItem nodeId="1" label="Manage User">
                <br></br>
                <TreeItem nodeId="Slider One" label="Create User" onClick={() => window.location.pathname = '/createuser'} />

                <TreeItem nodeId="Slider Two" label="User List" />

                <TreeItem nodeId="Slider Three" label="Nurse List" />
                <br></br>
              </TreeItem>
              <br></br>
              <TreeItem nodeId="5" label="Manage Patients">

                <TreeItem nodeId="10" label="Create Patient" onClick={() => window.location.pathname = '/createpatient'} />

                <TreeItem nodeId="6" label="Patients List" onClick={() => window.location.pathname = '/patients'} />
              </TreeItem>
              <br></br>
              <TreeItem nodeId='7' label='Log out' onClick={handleLogOut} />
            </TreeView>
            <br></br>

            <li>
              <a href="/admin"><PasswordTwoToneIcon /> Admin Login</a>
            </li>
            <br></br>
            <br></br>
            <li>
              <a href="/nurses"><HealthAndSafetyTwoToneIcon /> Nurses</a>
            </li>
            <br></br>
            <br></br>
            <li>
              <a href="/charts"><InsertChartTwoToneIcon /> Health Charts</a>
            </li>
            <br></br>
            <br></br>
            <li>
              <a href="/tracker"><PersonPinCircleTwoToneIcon /> Location Tracker</a>
            </li>
            <br></br>
            <br></br>
            <li>
              <a href="/mileagelog"><DoNotStepTwoToneIcon /> Mileage Log</a>
            </li>
            <br></br>
            <br></br>
            <li>
              <a href="/direction"><GpsFixedTwoToneIcon /> Routes Direction</a>
            </li>
            <br></br>
            <br></br>
            <li>
              <a href="/database"><FolderSharedTwoToneIcon /> Patient Database</a>
            </li>
            <br></br>
            <br></br>
            <li>
              <a href="/order"><VaccinesTwoToneIcon /> Order Medication & Supplies</a>
            </li>
          </ul>
        </div>

        <div className="main-content">
          <div className="header">
            <h1><em>Welcome to HomeCare EMR</em></h1>
            <p><Diversity1TwoToneIcon /> Our Trusted Partner in Healthcare <VolunteerActivismTwoToneIcon /></p>
          </div>

          {/* <div className="grid-container">

            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p className="title">Willpower.</p>
                  <p><FlipCameraAndroidTwoToneIcon /></p>
                </div>
                <div className="flip-card-back">
                  <p className="title"><InfoTwoToneIcon /></p>
                  <p>Willpower, strength and determination, it will take you places.</p>
                  <br></br>
                  - Julianna Pena
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
                  <p className="title"><InfoTwoToneIcon /></p>
                  <p>Nurses working in Home & Community Care provide a range of services, both in community clinics and in your home.</p>
                </div>
              </div>
            </div>

            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p className="title">Teamwork !</p>
                  <p><FlipCameraAndroidTwoToneIcon /></p>
                </div>
                <div className="flip-card-back">
                  <p className="title"><InfoTwoToneIcon /></p>
                  <p>Unity is strength. . . when there is teamwork and collaboration, wonderful things can be achieved. <br></br>
                    <br></br>
                    - Mattie Stepanek</p>
                </div>
              </div>
            </div>


            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p className="title">Care <br></br> & <br></br>Kindness.</p>
                  <p><FlipCameraAndroidTwoToneIcon /></p>
                </div>
                <div className="flip-card-back">
                  <p className="title"><InfoTwoToneIcon /></p>
                  <p>Sometimes it takes only one act of kindness and caring to change a person's life.<br></br> <br></br> - Jackie Chan
                  </p>
                </div>
              </div>
            </div>


            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p className="title">Pay Attention !</p>
                  <p><FlipCameraAndroidTwoToneIcon /></p>
                </div>
                <div className="flip-card-back">
                  <p className="title"><InfoTwoToneIcon /></p>
                  <p>Pay close attention to everything, notice what no one else notices. Then you'll know what no one else knows, and that's always useful.</p>
                </div>
              </div>
            </div>

          </div> */}

          <br></br>
          <div className="map-container">
            <GoogleMap
              center={center}
              zoom={11}
              mapContainerStyle={{
                width: "100%",
                height: "65vh",
              }}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >

              <Marker
                position={
                  typeof currentLocation.lat === 'number' && typeof currentLocation.lng === 'number'
                    ? currentLocation
                    : null // Set a default position or null if currentLocation is invalid
                }
                icon={car}
              />

            </GoogleMap>
          </div>

          <div>
            {/* <ShowComponent activeTree={activeTree} selectedTree="Slider One"><PatientTableComponent /></ShowComponent> */}
            {/* lets not use for now */}
            {/* <CanvasJSChart options={options} />
            <CanvasJSChart options={options2} /> */}
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>


      <footer className="footer">
        &copy; {currentYear} HomeCare EMR
        <div className="CameraAltTwoToneIcon">
          <a href="https://www.instagram.com/wecare.ca/?hl=en" target="_blank">
            <CameraAltTwoToneIcon />
          </a>
        </div>
      </footer>
    </div>
  ) : null;
}
