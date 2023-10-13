import { useState, useEffect } from 'react'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { getDatabase, ref, onValue } from "firebase/database";
import db from "./firebase_setup/firebase";
import car from './car.png';


const center = {
  lat: 49.3347735696573,
  lng: -123.15848589440924,
};

function App() {

  const db = getDatabase();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBK803PmGUbHyFmiVyc2mVa83cC1NW8KsI",
  });

  const [currentLocation, setCurrentLocation] = useState([]);

  const fetchdata = async () => {
    const starCountRef = ref(db, "location/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentLocation(data);
      console.log(data);
    });
  };

  //From chat gpt
  // const fetchdata = async () => {
  //   const starCountRef = ref(db, "location/");
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //     if (data) {
  //       setCurrentLocation({
  //         lat: data.latitude, // Replace with the correct latitude key
  //         lng: data.longitude, // Replace with the correct longitude key
  //       });
  //     }
  //   });
  // };
  

  useEffect(() => {
    fetchdata();
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        center={center}
        zoom={8}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={currentLocation} icon={car}>
        </Marker>

      </GoogleMap>
    </>
  ) : (
    <></>
  );

  //from chatgpt
  // return isLoaded ? (
  //   <>
  //     <GoogleMap
  //       center={center}
  //       zoom={8}
  //       mapContainerStyle={{ width: "100%", height: "100vh" }}
  //       options={{
  //         zoomControl: false,
  //         streetViewControl: false,
  //         mapTypeControl: false,
  //         fullscreenControl: false,
  //       }}
  //     >
  //       <Marker position={currentLocation} icon={car} />
  //     </GoogleMap>
  //   </>
  // ) : (
  //   <></>
  // );
  
}

export default App
