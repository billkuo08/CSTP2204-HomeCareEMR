import { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
} from "@react-google-maps/api";
import { getDatabase, ref, onValue } from "firebase/database";
import { dbMap, mapAPIKey } from "../config/config"
import car from '../images/car.png';
import { DirectionsService } from "@react-google-maps/api";
import { DirectionsRenderer } from "@react-google-maps/api";
import "../CSS/Map.css"


const center = {
    lat: 49.33473336980647,
    lng: -123.15846009191421,
};

function RouteDirection() {

    const dbMap = getDatabase();
    const firestoredb = getFirestore();


    const { isLoaded, google } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: mapAPIKey,
    });

    const [currentLocation, setCurrentLocation] = useState([]);
    const [directions, setDirections] = useState(null); // Add this state for DirectionsRenderer
    const [patientData, setPatientData] = useState();

    const locations = [
        { lat: 49.33473336980647, lng: -123.15846009191421 }, // First set of coordinates
        { lat: 49.27679087948593, lng: -123.11163668254494 }, // Second set of coordinates
    ];

    const fetchdata = async () => {

        const starCountRef = ref(dbMap, "location/");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setCurrentLocation(data);
            console.log(data);
        });

        // Fetch "patients" collection data
        const patientsCollectionRef = collection(firestoredb, 'patients');
        const patientsCollectionSnapshot = await getDocs(patientsCollectionRef);
        const patientsData = patientsCollectionSnapshot.docs.map((doc) => doc.data());
        setPatientData(patientsData);

        // patientsData.map((patient) => {
        //     const patientAddress = patient.address;
        //     const firstName = patient.firstname;
        //     const lastName = patient.lastname;
        // });


    };

    useEffect(() => {
        fetchdata();

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
            <div className="map-container">
                <GoogleMap
                    center={center}
                    zoom={12}
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
                                preserveViewport: true,
                                suppressMarkers: true,

                            }}
                        />
                    )}


                </GoogleMap>
            </div>

            <div className="patient-mainbox">
                {patientData ? (
                    patientData.map((patient, index) => (
                        <div className="patient-box" key={index}>
                            <h3>Full Name: {patient.firstName + " " + patient.lastName}</h3>
                            <h4>Address: {patient.address}</h4>
                            <button className="btn-locate">Locate</button>
                        </div>
                    ))
                ) : (
                    <p>No patient data available</p>
                )}
            </div>
        </>


    ) : null;


}

export default RouteDirection
