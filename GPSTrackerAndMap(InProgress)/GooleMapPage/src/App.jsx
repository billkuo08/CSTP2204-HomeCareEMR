import { useState, useEffect } from 'react'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polyline
} from "@react-google-maps/api";
import { getDatabase, ref, onValue } from "firebase/database";
import db from "./firebase_setup/firebase";
import car from './car.png';
import { DirectionsService } from "@react-google-maps/api";
import { DirectionsRenderer } from "@react-google-maps/api";


const center = {
  lat: 49.33473336980647,
  lng: -123.15846009191421,
};

function App() {

  const db = getDatabase();

  const { isLoaded, google } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBK803PmGUbHyFmiVyc2mVa83cC1NW8KsI",
  });

  const [currentLocation, setCurrentLocation] = useState([]);
  const [directions, setDirections] = useState(null); // Add this state for DirectionsRenderer

  const locations = [
    { lat: 49.33473336980647, lng: -123.15846009191421 }, // First set of coordinates
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

        // if (isLoaded && google) {
    //   const directionsService = new google.maps.DirectionsService();

    //   const origin = new google.maps.LatLng(49.28156434232159, -123.111261173516);
    //   const destination = new google.maps.LatLng(49.27679087948593, -123.11163668254494);

    //   const request = {
    //     origin: origin,
    //     destination: destination,
    //     travelMode: 'DRIVING', // You can change the travel mode as needed
    //   };

    //   directionsService.route(request, (result, status) => {
    //     if (status === 'OK') {
    //       // Handle the result and extract the path of the route
    //       const route = result.routes[0];
    //       // Display the route on your map using the Polyline component.
    //     }
    //   });
    // }
  }, []);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
      } else {
        console.error('Directions request failed with status:', response.status);
      }
    } else {
      console.error('Directions request failed. Response is null.');
    }
  };

  return isLoaded ? (
    <>
      <GoogleMap
        center={center}
        zoom={12}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/* <Marker position={currentLocation} icon={car}>
        </Marker> */}
        <Marker
          position={
            typeof currentLocation.lat === 'number' && typeof currentLocation.lng === 'number'
              ? currentLocation
              : null // Set a default position or null if currentLocation is invalid
          }
          icon={car}
        />


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

        {currentLocation.lat && currentLocation.lng && locations[0] && locations[1] ? (
          <DirectionsService
            options={{
              destination: locations[0], // Destination marker coordinates
              origin: locations[1], // Current location marker coordinates
              travelMode: "DRIVING", // You can change this to your preferred travel mode
            }}
            callback={directionsCallback}
          />
        ) : null}

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
            }}
          />
        )}

      </GoogleMap>
    </>
  ) : null;


}

export default App
