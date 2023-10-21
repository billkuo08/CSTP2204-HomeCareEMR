import { useState, useEffect } from 'react'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
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

  const { isLoaded, google } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBK803PmGUbHyFmiVyc2mVa83cC1NW8KsI",
  });

  const [currentLocation, setCurrentLocation] = useState([]);

  const locations = [
    { lat: 49.28156434232159, lng: -123.111261173516 }, // First set of coordinates
    { lat: 49.27679087948593, lng: -123.11163668254494 }, // Second set of coordinates
  ];

  const fetchdata = async () => {
    const starCountRef = ref(db, "location/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentLocation(data);
      console.log(data);
    });
  };

  

  useEffect(() => {
    fetchdata();
    if (isLoaded && google) {
      const directionsService = new google.maps.DirectionsService();

      const origin = new google.maps.LatLng(49.28156434232159, -123.111261173516);
      const destination = new google.maps.LatLng(49.27679087948593, -123.11163668254494);

      const request = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING', // You can change the travel mode as needed
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          // Handle the result and extract the path of the route
          const route = result.routes[0];
          // Display the route on your map using the Polyline component.
        }
      });
    }
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

        {locations.map((location, index) => (
          <Marker
            key={index}
            position={location}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // URL to the red location icon
              scaledSize: new window.google.maps.Size(32, 32), // Adjust the size as needed
            }}
          />
        ))}


      </GoogleMap>
    </>
  ) : (
    <></>
  );
  
}

export default App
