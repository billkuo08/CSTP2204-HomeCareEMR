import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push, update } from 'firebase/database';
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFirestore, collection, doc, getDoc, addDoc } from 'firebase/firestore';



export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyDS9nLcJyoLcNH_4BpuV1nK0v3lqdwN_os",
    authDomain: "cstp2107-wecare.firebaseapp.com",
    databaseURL: "https://cstp2107-wecare-default-rtdb.firebaseio.com",
    projectId: "cstp2107-wecare",
    storageBucket: "cstp2107-wecare.appspot.com",
    messagingSenderId: "779900322667",
    appId: "1:779900322667:web:6002731a751e9017ba022e"
    
  };

  initializeApp(firebaseConfig);
  // const [location, setLocation] = useState(null);
  const [location, setLocation] = useState({ coords: { latitude: 0, longitude: 0 } });
  const [errorMsg, setErrorMsg] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [previousLocation, setPreviousLocation] = useState(null);
  const [nurstFirstName, setFirstName] = useState("");
  const [nurseLastName, setLastName] = useState("");
  const nurseID = "7uHyjpsQ8piFi7bQ5ox7";

  useEffect(() => {
    fetchNurseData();

    let intervalId; // Declare intervalId outside the trackLocation function

    const trackLocation = async () => {
      intervalId = setInterval(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        const db = getDatabase();
        const referenceFuel = ref(db, 'location/');

        update(referenceFuel, {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });

        if (previousLocation && previousLocation.coords) { // Check if previousLocation and its coords exist
          // console.log('previousLocation has been updated:', previousLocation.coords.latitude, previousLocation.coords.longitude);
          if (
            previousLocation.coords.latitude !== currentLocation.coords.latitude ||
            previousLocation.coords.longitude !== currentLocation.coords.longitude
          ) {
            const distance = calculateDistance(
              previousLocation.coords.latitude,
              previousLocation.coords.longitude,
              currentLocation.coords.latitude,
              currentLocation.coords.longitude
            );
            setTotalDistance(totalDistance + distance);
          }
        }

        setPreviousLocation(currentLocation);


      }, 5000);


      return () => clearInterval(intervalId); // Clear interval using the outer variable
    };

    trackLocation();

    return () => clearInterval(intervalId);// Make sure to clear interval when unmounting

  }, [previousLocation]);


  const calculateDistance = (lat1, lon1, lat2, lon2) => {

    // Haversine formula to calculate distance between two points
    // const earthRadius = 6371; // Earth's radius in kilometers
    const earthRadius = 6371000; // Earth's radius in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    // console.log('CalculateDistance is being called. Total Distance:', distance);

    return distance;
  };

  const fetchNurseData = async () => {
    const db = getFirestore();
    const nursesCollection = collection(db, 'nurses');
    const docRef = doc(nursesCollection, nurseID);
    
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Nurse data:', docSnap.data());
        const data = docSnap.data();
        const firstName = data.firstName;
        const lastName = data.lastName;

        // Use the retrieved first and last names in your code
        // For example, set these values to state variables for use in the app
        setFirstName(firstName);
        setLastName(lastName);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  };

  const addMileageDocument = async (data) => {
    const db = getFirestore();
    const mileageCollection = collection(db, 'mileage');

    try {
    // Use addDoc to generate a new document with an auto-generated unique ID instead of setDoc with requires custom document ID
      const newMileageDocRef = await addDoc(mileageCollection, data);
      console.log('Document added with Data:', data);

    } catch (error) {
      console.error('Error adding document:', error);
    }
  };


  const resetDistance = () => {

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16).replace('T', ' '); // Get the date in "year-month-day-hour-minute" format

    const mileageData = {
      Date: formattedDate,
      DistanceTraveled: `${totalDistance.toFixed(2)} km`,
      FirstName: nurstFirstName,
      LastName: nurseLastName,
      NurseID: nurseID,
    };

    addMileageDocument(mileageData);

    setTotalDistance(0); // Reset the total distance to 0
    setPreviousLocation(null);
  };



  return (

    <SafeAreaView style={styles.container}>
      <View>
        <Text>Latitude: {location?.coords.latitude}</Text>
        <Text>Longitude: {location?.coords.longitude}</Text>
        <Text>Total Distance Traveled: {totalDistance.toFixed(2)} km</Text>
        <Button title="Reset Distance" onPress={resetDistance} />
        {errorMsg ? <Text>{errorMsg}</Text> : null}
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


