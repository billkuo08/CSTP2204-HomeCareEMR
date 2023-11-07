import { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
} from "@react-google-maps/api";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { dbMap, mapAPIKey } from "../config/config"
import car from '../images/car.png';
import { DirectionsRenderer } from "@react-google-maps/api";
import "../CSS/Map.css"
import ShareLocationTwoToneIcon from '@mui/icons-material/ShareLocationTwoTone';
import FollowTheSignsTwoToneIcon from '@mui/icons-material/FollowTheSignsTwoTone';


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
    const [directions, setDirections] = useState(null); // Store directions in state
    const [patientData, setPatientData] = useState();
    const [patientsLocationData, setPatientLocation] = useState([]);
    const [originLocation, setOriginLocation] = useState();



    // const myLocations = [
    //     { lat: 49.33473336980647, lng: -123.15846009191421 }, // First set of coordinates
    //     { lat: 49.27679087948593, lng: -123.11163668254494 }, // Second set of coordinates
    // ];

    const fetchdata = async () => {

        const starCountRef = ref(dbMap, "location/");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setCurrentLocation(data);
        });

        //Fetch "location" data
        const patientsLocationCollectionRef = collection(firestoredb, 'patients');
        const patientsLocationCollectionSnapshot = await getDocs(patientsLocationCollectionRef);
        const patientsLocation = patientsLocationCollectionSnapshot.docs.map((doc) => doc.data());
        const latlngPatientLocationData = patientsLocation.filter((data) => data.lat !== undefined && data.lng !== undefined).map((data) => ({
            id: data.id,
            lat: Number(data.lat),
            lng: Number(data.lng)
        }));

        setPatientLocation(latlngPatientLocationData);
        console.log(latlngPatientLocationData)

        // Fetch "patients" collection data
        const patientsCollectionRef = collection(firestoredb, 'patients');
        const patientsCollectionSnapshot = await getDocs(patientsCollectionRef);
        const patientsData = patientsCollectionSnapshot.docs.map((doc) => doc.data());
        setPatientData(patientsData);

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

    const changeDestination = () => {

        const directionButtonId = event.target.id;
        const patientWithSameId = patientsLocationData.find(patient => patient.id === directionButtonId);

        if (patientWithSameId) {
            // Update the destination in the DirectionsService to the patient's location
            const updatedDestination = {
                lat: patientWithSameId.lat,
                lng: patientWithSameId.lng,
            };

            // Create a new DirectionsService request with the updated destination
            const directionsService = new window.google.maps.DirectionsService();
            if (!originLocation) {
                directionsService.route(
                    {
                        destination: updatedDestination,
                        origin: currentLocation,
                        travelMode: "DRIVING", // You can change this to your preferred travel mode
                    },
                    directionsCallback
                );
            } else {
                console.log(originLocation);
                directionsService.route(
                    {
                        destination: updatedDestination,
                        origin: originLocation,
                        travelMode: "DRIVING", // You can change this to your preferred travel mode
                    },
                    directionsCallback
                );
            }
        } else {
            console.log(`No patient found with ID: ${buttonId}`);
        }



    };

    const changeOrigin = () => {

        setDirections(null);

        const originButtonId = event.target.id;
        const patientWithSameIdOrigin = patientsLocationData.find(patient => patient.id === originButtonId);

        if (patientWithSameIdOrigin) {
            const updatedOrigin = {
                lat: patientWithSameIdOrigin.lat,
                lng: patientWithSameIdOrigin.lng,
            };

            setOriginLocation(updatedOrigin);
        };
    }

    const resetCurrentLocation = () => {

        setDirections(null); // Remove DirectionsService
        setOriginLocation(null); // Set originLocation to null

    }


    return isLoaded ? (
        <>
        <div className="h5"> <h5><em> <ShareLocationTwoToneIcon> </ShareLocationTwoToneIcon> Routes Direction <FollowTheSignsTwoToneIcon> </FollowTheSignsTwoToneIcon></em></h5></div>
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

                    {originLocation ?
                        <Marker
                            position={
                                typeof originLocation.lat === 'number' && typeof originLocation.lng === 'number'
                                    ? originLocation
                                    : null
                            }
                            icon={{
                                url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                                scaledSize: new window.google.maps.Size(32, 32),
                            }}
                        />
                        : null
                    }

                    {patientsLocationData ?
                        patientsLocationData.map((location, index) => (
                            <Marker
                                key={index}
                                position={location}
                                icon={{
                                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                    scaledSize: new window.google.maps.Size(32, 32),
                                }}
                            />
                        ))
                        : null
                    }

                    {directions && (
                        <DirectionsRenderer
                            directions={directions} // Display directions based on stored state
                            options={{
                                preserveViewport: true,
                                suppressMarkers: true,

                            }}
                        />
                    )}


                </GoogleMap>
                <button className="btn-reset" onClick={resetCurrentLocation} >Reset</button>

            </div>

            <div className="patient-mainbox">
                {patientData ? (
                    patientData.map((patient, index) => (
                        <div className="patient-box" key={index}>
                            <h3>Full Name: {patient.firstName + " " + patient.lastName}</h3>
                            <h4>Address: {patient.address}</h4>
                            <button className="btn-current" id={patient.id} onClick={changeOrigin}>Set as Current</button>
                            <button className="btn-driection" id={patient.id} onClick={changeDestination}>Direction</button>
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
