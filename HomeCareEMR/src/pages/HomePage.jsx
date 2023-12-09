
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
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
import PatientVisitingPage from './PatientVisitingPage';
import HomeComponent from '../components/HomeComponent';
import CreateUserPage from './CreateUserPage';
import CreatePatient from '../components/CreatePatient';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import ManageHistoryTwoToneIcon from '@mui/icons-material/ManageHistoryTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import DirectionsRunTwoToneIcon from '@mui/icons-material/DirectionsRunTwoTone';
import DrawTwoToneIcon from '@mui/icons-material/DrawTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import { mapAPIKey } from "../config/config"
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';




var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const ShowComponent = (props) => {
  const {childre, activeTree, selectedTree} = props;
  return (
  <div hidden={activeTree !== selectedTree }>
    {activeTree === selectedTree && <Box mx={2}>{childre}</Box>}
  </div>
  );
}
export default function HomePage() {
  const [currentLocation, setCurrentLocation] = useState([]);
  const currentYear = new Date().getFullYear();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeTree, setActiveTree] = useState();
  const [hasSentToDb, setHasSentToDb] = useState(false);
  const [userIsInDb, setUserIsInDb] = useState(false);
  const firestoredb = getFirestore();
  const userInfoFromLocal = localStorage.getItem('user');
  const userInfo = JSON.parse(userInfoFromLocal);
  const userId = userInfo.id;


  // console.log(activeTree);
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

  return (<>

    <div className="body">
      <div className="main-content">
        <button className="toggle-button" onClick={toggleSidebar}>
          <ViewSidebarTwoToneIcon />
        </button>
      </div>

      <div className="content">
        <div className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
          <h3><NavigationTwoToneIcon /> <PinchTwoToneIcon /></h3>

          <br></br>
          <br></br>
          <ul>
            <li>
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                onNodeSelect={handleSelect}
              >
                <ManageAccountsTwoToneIcon> </ManageAccountsTwoToneIcon> <TreeItem nodeId="1" label="Manage User">
                  <br></br>
                  <GroupAddTwoToneIcon></GroupAddTwoToneIcon><TreeItem nodeId="Create User" label="Create User" />
                  <br></br>
                  <RecentActorsTwoToneIcon></RecentActorsTwoToneIcon><TreeItem nodeId="User List" label="User List" />
                  <br></br>
                  <DirectionsRunTwoToneIcon></DirectionsRunTwoToneIcon><TreeItem nodeId="Nurse List" label="Nurse List" />
                  <br></br>
                </TreeItem>
                <br></br>

                <ManageHistoryTwoToneIcon></ManageHistoryTwoToneIcon><TreeItem nodeId="5" label="Manage Patients">
                  <br></br>
                  <DrawTwoToneIcon></DrawTwoToneIcon><TreeItem nodeId="Create Patient" label="Create Patient" />
                  <br></br>
                  <BallotTwoToneIcon></BallotTwoToneIcon><TreeItem nodeId="Patients List" label="Patients List" />  
                </TreeItem>
                <br></br>
                <HomeTwoToneIcon></HomeTwoToneIcon>
                <TreeItem nodeId="Home" label="Home" />
                <br></br>
                <LogoutTwoToneIcon></LogoutTwoToneIcon> 
                <TreeItem nodeId='7' label='Log out' onClick={handleLogOut} />
              </TreeView>
              <br></br>
            </li>
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
              <a href="/order"><VaccinesTwoToneIcon /> Order Medication & Supplies</a>
            </li>
          </ul>
        </div>

      </div>
   
      {(()=>{
        if(!activeTree || activeTree === "1" || activeTree === "5" || activeTree === "Home"){
          return <HomeComponent/>
        }
      })()}
      <ShowComponent childre={<CreateUserPage/>} activeTree={activeTree} selectedTree="Create User"/>  
      <ShowComponent childre={<CreatePatient/>} activeTree={activeTree} selectedTree="Create Patient"/> 
      <ShowComponent childre={<PatientListPage/>} activeTree={activeTree} selectedTree="Patients List"/>    
      <br></br>
      <br></br>
      <br></br>


      <footer className="footer">
        &copy; {currentYear} HomeCare EMR
        <div className="CameraAltTwoToneIcon">
          <a href="https://www.instagram.com/wecare.ca/?hl=en" target="_blank" rel="noreferrer">
            <CameraAltTwoToneIcon />
          </a>
        </div>
      </footer>
    </div>
  </>
  )
}
