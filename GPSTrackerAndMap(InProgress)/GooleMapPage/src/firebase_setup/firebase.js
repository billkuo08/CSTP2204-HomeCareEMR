import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


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


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;