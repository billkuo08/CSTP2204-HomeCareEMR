import {
    addDoc,
    getDocs,
    doc,
    query,
    where,
    setDoc,
    collection,
} from "firebase/firestore";

import { db } from "../config/config";

export const createOrder= async (payload) => {
    try{
        const docRef = await addDoc(collection(db, "orders"), payload);
        console.log("Document written with ID: ", docRef.id);
    }catch(e){
        console.error("Error adding document: ", e);
    }
}

export const getAllOrders = async () => {
    try {
        const orders = await getDocs(collection(db, "orders"));
        console.log("orders", orders)
        if(orders){
        const ordersData = orders.docs.map((doc) => {
            return{
            ...doc.data(),
            id: doc.id,
            };
        });
        return ordersData;
        }else{
        console.log("No such document!");
        }
    } catch (error) {
        console.log(error);
    }
    }