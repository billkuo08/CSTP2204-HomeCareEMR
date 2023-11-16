import {
    addDoc,
    getDocs,
    doc,
    query,
    where,
    setDoc,
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

