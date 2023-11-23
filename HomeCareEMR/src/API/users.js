import {
    addDoc,
    getDocs,
    doc,
    query,
    where,
    setDoc,
    deleteDoc,
    collection,
} from "firebase/firestore";
import CryptoJS from "crypto-js";
import { db } from "../config/config";


export const createUser= async (payload) => {
    console.log(payload);
    try{
        const hashedPassword = CryptoJS.AES.encrypt(
            payload.password,
            "secret key 123"
        ).toString();
        payload.password = hashedPassword;
        const docRef = await addDoc(collection(db, "users"), payload);
        console.log("Document written with ID: ", docRef.id);
        const qry = query(
            collection(db, "users"),
            where("username", "==", payload.username)
        );
        console.log(qry);
    const userSnapshots = await getDocs(qry);
    console.log(userSnapshots);
    const user = userSnapshots.docs[0].data();
    console.log(user);


        return {
        success: true,
        message: "User logged in successfully",
        data:{
            ...user,
            userId: userSnapshots.docs[0].id,
        },
        };

    }catch(error){
        return error;
    }
}

export const addNurse = async (payload) => {
    console.log(payload);
    try{
        await setDoc(doc(db, "nurses", payload.userId), payload);

        return {
            success: true,
            message: "Nurse created successfully",
        }

    }catch(error){
        return error;
    }
}

export const loginUser = async (payload) => {
    try {
        const qry = query(
            collection(db, "users"),
            where("username", "==", payload.username)
        );
    const userSnapshots = await getDocs(qry);
    if(userSnapshots.empty){
        throw new Error("User does not exist");
    }

    const user = userSnapshots.docs[0].data();
    user.id = userSnapshots.docs[0].id;
    const bytes = CryptoJS.AES.decrypt(user.password, "secret key 123");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalPassword);

    if(originalPassword === payload.password){
        return {
        success: true,
        message: "User logged in successfully",
        data:user,
        };
    }else{
        return {
        success: false,
        message: "Invalid password",
        };
    }
    } catch (error) {
        return error;
    }
}

export const getAllUsers = async () => {
    try {
        const users = await getDocs(collection(db, "users"));
        console.log("users", users)
        if(users){
        const usersData = users.docs.map((doc) => {
            return{
            ...doc.data(),
            id: doc.id,
            };
        });
        return usersData;
        }else{
        console.log("No such document!");
        }
    } catch (error) {
        console.log(error);
    }
    }

    export const getAllNurses = async () => {
        try {
          const nurses = await getDocs(collection(db, "nurses"));
      
          if (!nurses.empty) {
            const nursesData = nurses.docs.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            });
      
            console.log("All Nurses:", nursesData);
          } else {
            console.log("No nurses found!");
          }
        } catch (error) {
          console.error("Error fetching nurses:", error);
        }
      };
      

    export const deleteNurse = async (userId) => {
        try {
          const nurseRef =doc(db,'nurses', userId);
          await deleteDoc(nurseRef);
          return { success: true, message: `Nurse with userId ${userId} deleted successfully` };
        } catch (error) {
          console.error("Error deleting nurse:", error);
          return { success: false, message: "Error deleting nurse" };
        }
    };