import { useState, useEffect } from 'react'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
} from "@react-google-maps/api";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { dbMap, mapAPIKey } from "../config/config"
import car from '../images/car.png';
import "../CSS/Map.css"
import ShareLocationTwoToneIcon from '@mui/icons-material/ShareLocationTwoTone';
import FollowTheSignsTwoToneIcon from '@mui/icons-material/FollowTheSignsTwoTone';


const navigateToHomepage = () => {
    window.location.href = '/';
};


const center = {
    lat: 49.33473336980647,
    lng: -123.15846009191421,
};

function LocationTracker() {

    const dbMap = getDatabase();

    const { isLoaded, google } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: mapAPIKey,
    });

    const [currentLocation, setCurrentLocation] = useState([]);
   

    const fetchdata = async () => {
        //Fetch "location" data for GPS tracking
        const starCountRef = ref(dbMap, "location/");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setCurrentLocation(data);
        });

    };

    useEffect(() => {
        fetchdata();
    }, []);  



    return isLoaded ? (        <>


            <div className="h5"> <h5><em> <ShareLocationTwoToneIcon> </ShareLocationTwoToneIcon> Location Tracker <FollowTheSignsTwoToneIcon> </FollowTheSignsTwoToneIcon></em></h5></div>
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
                <button className="btn-homepage" onClick={navigateToHomepage}>Go to Homepage</button>

            </div>       
        </>


    ) : null;


}

export default LocationTracker