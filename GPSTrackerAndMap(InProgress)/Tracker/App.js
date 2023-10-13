import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set , push ,update   } from 'firebase/database';
import * as Location from "expo-location";
import React, { useState } from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyAT1LP9vPMVgCcS-WhvH9bxnQ6JNqZIr5Y",
    authDomain: "cstp2107finalproject.firebaseapp.com",
    databaseURL: "https://cstp2107finalproject-default-rtdb.firebaseio.com",
    projectId: "cstp2107finalproject",
    storageBucket: "cstp2107finalproject.appspot.com",
    messagingSenderId: "734450003257",
    appId: "1:734450003257:web:3ca7395653d58a16accce8",
    measurementId: "G-DLC7VP6MRE"
  };

  initializeApp(firebaseConfig);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const saveLocation = async () => {
  
    const intervalId = setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
    
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    
      const db = getDatabase();
      const referenceFuel = ref(db, 'location/');
      update(referenceFuel, {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      
    }, 5000);
    
    return () => clearInterval(intervalId);
  };
    
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Text>Latitude: {location?.coords.latitude}</Text>
      <Text>Longitude: {location?.coords.longitude}</Text>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      <Button title="Share Location" onPress={saveLocation} />
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

// import React, { useEffect, useState } from 'react';
// import { Text, View } from 'react-native';
// import * as Location from 'expo-location';

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {errorMsg ? (
//         <Text>{errorMsg}</Text>
//       ) : location ? (
//         <Text>
//           Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
//         </Text>
//       ) : (
//         <Text>Loading location...</Text>
//       )}
//     </View>
//   );
// }

