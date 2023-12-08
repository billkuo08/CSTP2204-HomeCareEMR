import { useState, useEffect, useRef } from 'react'
import { getFirestore, collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
} from "@react-google-maps/api";
import { mapAPIKey } from "../config/config"
import car from '../images/car.png';
import redMarker from '../images/red-dot_Marker.png';
import yellowMarker from '../images/yellow-dot_Marker.png';
import { DirectionsRenderer } from "@react-google-maps/api";
import "../CSS/Map.css"
import ShareLocationTwoToneIcon from '@mui/icons-material/ShareLocationTwoTone';
import FollowTheSignsTwoToneIcon from '@mui/icons-material/FollowTheSignsTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';


const navigateToHomepage = () => {
    window.location.href = '/';
};


const center = {
    lat: 49.33473336980647,
    lng: -123.15846009191421,
};

function RouteDirection() {

    const firestoredb = getFirestore();
    const userInfoFromLoacl = localStorage.getItem('user');
    const userInfo = JSON.parse(userInfoFromLoacl);
    const userId = userInfo.id;
    const watchIdRef = useRef(null);


    const { isLoaded, google } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: mapAPIKey,
    });

    const [currentLocation, setCurrentLocation] = useState([]);
    const [directions, setDirections] = useState(null); // Store directions in state
    const [patientData, setPatientData] = useState();
    const [originLocation, setOriginLocation] = useState();
    const [trackingState, setTrackingState] = useState('idle');//Track the track, pause, stop state for mileage tracking
    const [totalDistanceForUpload, setTotalDistanceForUpload] = useState(0); // Store total distance traveled in state
    const [previousPosition, setPreviousPosition] = useState(null); // Store the previous position in state
    const [selectedRoute, setSelectedRoute] = useState('routeA');
    const patientsLocationCollectionRef = collection(firestoredb, 'patients');
    const nursesCollection = collection(firestoredb, 'nurses');
    const nurseDocRef = doc(nursesCollection, userId);



    const fetchPatientsData = async () => {

        //Fetch "patients' location" data
        const patientsLocationCollectionSnapshot = await getDocs(patientsLocationCollectionRef);
        const allPatientsData = patientsLocationCollectionSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setPatientData(allPatientsData);
        console.log(allPatientsData);

    };


    useEffect(() => {
        fetchPatientsData();

        watchIdRef.current = navigator.geolocation.watchPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setCurrentLocation(userLocation);
            },

        );

        // Clean up the watchId on component unmount
        return () => {
            navigator.geolocation.clearWatch(watchIdRef.current);
        };
    }, []); // Empty dependency array to run it only once when the component mounts


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
        event.preventDefault();

        const directionButtonId = event.target.id;
        const patientWithSameId = patientData.find(patient => patient.id === directionButtonId);

        if (patientWithSameId) {
            // Update the destination in the DirectionsService to the patient's location
            const updatedDestination = {
                lat: Number(patientWithSameId.lat),
                lng: Number(patientWithSameId.lng),
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
        event.preventDefault();

        setDirections(null);

        const originButtonId = event.target.id;
        const patientWithSameIdOrigin = patientData.find(patient => patient.id === originButtonId);
        console.log("button id: " + originButtonId);

        if (patientWithSameIdOrigin) {
            const updatedOrigin = {
                lat: Number(patientWithSameIdOrigin.lat),
                lng: Number(patientWithSameIdOrigin.lng),
            };

            setOriginLocation(updatedOrigin);
        };
    }

    const visitPatientPage = async (event) => {
        event.preventDefault();
        const selectedPatientId = event.currentTarget.getAttribute('patient-id');

        if (selectedPatientId) {
            window.location.href = `/visiting/${selectedPatientId}`;
        } else {
            console.error('No patient ID found for the selected button.');
        }
    };


    const resetRouteocation = () => {
        event.preventDefault();

        setDirections(null); // Remove DirectionsService
        setOriginLocation(null); // Set originLocation to null

    }

    const watchPositionCallback = (position) => {
        console.log('Got user\'s location:', position);
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        if (previousPosition) {
            // Calculate the distance between the current and previous positions
            const distance = calculateDistance(previousPosition, currentPosition);
            setTotalDistanceForUpload(prevDistance => prevDistance + distance);
            console.log('totalDistance:', totalDistanceForUpload);
        }

        // Update the previous position for the next calculation
        setPreviousPosition(currentPosition);
    };

    useEffect(() => {
        watchIdRef.current = navigator.geolocation.watchPosition(
            watchPositionCallback,
            (error) => {
                console.error('Error getting user\'s location:', error);
            }
        );

        // Clean up the watchId on component unmount
        return () => {
            navigator.geolocation.clearWatch(watchIdRef.current);
        };
    }, [previousPosition, totalDistanceForUpload]);


    const startTracking = () => {
        if (trackingState === 'tracking') {
            alert('You are already tracking!');
            return;
        }

        setTrackingState('tracking');
        try {
            console.log('Start tracking');
            // Watch is set up in useEffect
        } catch (error) {
            console.error('Error getting user\'s location:', error);
        }
    };





    // Example function to calculate distance between two points using Haversine formula
    const calculateDistance = (point1, point2) => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = toRadians(point2.lat - point1.lat);
        const dLng = toRadians(point2.lng - point1.lng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(point1.lat)) * Math.cos(toRadians(point2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    };

    const toRadians = (angle) => {
        return (angle * Math.PI) / 180;
    };





    const stopTracking = async () => {

        if (trackingState === 'idle') {
            alert('Please start tracking first!');
            return;
        }
        //Fetch Nurse's data for mileage log
        const nurseDocSnap = await getDoc(nurseDocRef);

        // Upload the total distance to the database
        if (nurseDocSnap.exists()) {
            console.log('Userdata:', nurseDocSnap.data());
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 16).replace('T', ' '); // Get the date in "year-month-day-hour-minute" format
            const data = nurseDocSnap.data();
            const firstName = data.firstName;
            const lastName = data.lastName;
            const mileageCollectionRef = collection(firestoredb, 'mileage');

            // Use doc() to create a new document reference with an auto-generated ID
            const newMileageDocRef = doc(mileageCollectionRef);

            const mileageData = {
                id: newMileageDocRef.id,
                Date: formattedDate,
                DistanceTraveled: `${totalDistanceForUpload.toFixed(2)} km`,
                FirstName: firstName,
                LastName: lastName,
                NurseID: userId,
            };
            addDoc(mileageCollectionRef, mileageData);
            console.log('mileage uploaded', mileageData)

            // Stop the tracking and reset values
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null; // Reset the ref to null
            setPreviousPosition(null);
            setTotalDistanceForUpload(0);
            setTrackingState('idle');

        } else {
            console.log('No such document!');
        }
    };









    const handleRouteChange = async (event) => {
        const selectedRoute = event.target.value;

        setDirections(null); // Remove DirectionsService
        setOriginLocation(null); // Set originLocation to null
        setSelectedRoute(selectedRoute);

    };




    return isLoaded ? (<>


        <div className="h5">
            <h5><em> <ShareLocationTwoToneIcon> </ShareLocationTwoToneIcon> Routes Direction <FollowTheSignsTwoToneIcon> </FollowTheSignsTwoToneIcon></em></h5>
            <div className="dropdown-list">
                <label htmlFor="dropdownOptions" style={{ fontSize: '14px' }}>Select a route: </label>
                <select id="dropdownOptions" onChange={handleRouteChange} value={selectedRoute}>
                    <option value="routeA">Route A</option>
                    <option value="routeB">Route B</option>
                    <option value="routeC">Route C</option>
                </select>
            </div>
        </div>

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
                            url: yellowMarker,
                            scaledSize: new window.google.maps.Size(32, 32),
                        }}
                    />
                    : null
                }

                {patientData ?
                    patientData.map((location, index) => (
                        location.route === selectedRoute ? (
                            <Marker
                                key={index}
                                position={{ lat: Number(location.lat), lng: Number(location.lng) }}
                                icon={{
                                    url: redMarker,
                                    scaledSize: new window.google.maps.Size(32, 32),
                                }}
                            />
                        ) : null

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
            <button className="btn-homepage" onClick={navigateToHomepage}>Go to Homepage</button>
            <button className="btn-reset" onClick={resetRouteocation}>Reset Map</button>
            <button className="btn-trackAndPause" onClick={startTracking}>Track Mileage</button>
            <button className="btn-upload" onClick={stopTracking}>Stop & Upload Mileage</button>

        </div>

        <form className="mapform-container">
            <div className="patient-mainbox">
                {patientData ? (
                    patientData.map((patient, index) => (
                        patient.route === selectedRoute ? (
                            <div className="patient-box" key={index}>
                                <h3><BadgeTwoToneIcon></BadgeTwoToneIcon> Full Name: {patient.firstName + " " + patient.lastName}</h3>
                                <h4><BusinessTwoToneIcon></BusinessTwoToneIcon> Address: {patient.address}</h4>
                                <button className="btn-forPatient" id={patient.id} onClick={changeOrigin}>Set Current</button>
                                <button className="btn-forPatient" id={patient.id} onClick={changeDestination}>Direction</button>
                                <button patient-id={patient.id} onClick={visitPatientPage}>Visit</button>



                            </div>
                        ) : null
                    ))
                ) : null

                }
            </div>
        </form>
    </>


    ) : null;


}

export default RouteDirection


// const pauseTracking = () => {
//     console.log('Pause tracking');
//     // Pause the tracking by clearing the watch
//     navigator.geolocation.clearWatch(watchId);
// };

//For pause and resume tracking
// const handleTrackAndPauseClick = () => {
//     switch (trackingState) {
//         case 'idle':
//             mileageTracker.startTracking();
//             setTrackingState('tracking');
//             break;
//         case 'tracking':
//             mileageTracker.pauseTracking();
//             setTrackingState('paused');
//             break;
//         case 'paused':
//             mileageTracker.startTracking();
//             setTrackingState('tracking');
//             break;
//         default:
//             break;
//     }
// };

{/* <button className="btn-trackAndPause" onClick={handleTrackAndPauseClick}>
                {trackingState === 'idle' && 'Track Mileage'}
                {trackingState === 'tracking' && 'Pause Tracking'}
                {trackingState === 'paused' && 'Resume Tracking'}
            </button> */}