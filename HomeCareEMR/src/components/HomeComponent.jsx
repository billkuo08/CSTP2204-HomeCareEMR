import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import Diversity1TwoToneIcon from '@mui/icons-material/Diversity1TwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import FlipCameraAndroidTwoToneIcon from '@mui/icons-material/FlipCameraAndroidTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { useState, useEffect } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { mapAPIKey } from "../config/config"
import redcross from '../images/redcross.png';

export default function HomeComponent() {
    const [currentLocation, setCurrentLocation] = useState([]);
    const [hasSentToDb, setHasSentToDb] = useState(false);
    const [userIsInDb, setUserIsInDb] = useState(false);
    const firestoredb = getFirestore();
    const userInfoFromLocal = localStorage.getItem('user');
    const userInfo = JSON.parse(userInfoFromLocal);
    const userId = userInfo.id;


const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapAPIKey,
  });

  //Sending location data to Firestore
  const sendLocationToFirestore = () => {
    console.log('sending initial location to firestore');
    const initialLocation = collection(firestoredb, 'locations');

    const locationData = {
      id: userId,
      lat: Number(currentLocation.lat),
      lng: Number(currentLocation.lng),
    };

    addDoc(initialLocation, locationData)
  };

  useEffect(() => {

    const watchId = navigator.geolocation.watchPosition(

      (position) => {
        const userLocation = {
          lat: Number(position.coords.latitude),
          lng: Number(position.coords.longitude),
        };
        setCurrentLocation(userLocation);
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );  

    if (currentLocation.lat && currentLocation.lng && !hasSentToDb) {
      setHasSentToDb(true);
      sendLocationToFirestore();
    }

    if(hasSentToDb && !userIsInDb) {
      setUserIsInDb(true);

    }

    // Clean up the watchId on component unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [hasSentToDb, userIsInDb]);



  return (
    <>
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

          {isLoaded ? (

            <div className="map-container-homepage">

              <GoogleMap
                center={{
                  lat: 49.33473336980647,
                  lng: -123.15846009191421,
                }}
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
                {currentLocation && (
                  <Marker
                    position={currentLocation}
                    icon={{
                      url: redcross,
                      scaledSize: new window.google.maps.Size(55, 55),
                    }}
                  />
                )}

              </GoogleMap>

            </div>
          ) : (
            <div>Loading Google Maps...</div>
          )}

          <div>
            {/* <ShowComponent activeTree={activeTree} selectedTree="Slider One"><PatientTableComponent /></ShowComponent> */}
            {/* lets not use for now */}
            {/* <CanvasJSChart options={options} />
            <CanvasJSChart options={options2} /> */}
          </div>
        </div>



      <br></br>
      <br></br>
      <br></br>
    </>
  )
}
