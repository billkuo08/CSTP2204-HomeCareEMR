import {
    addDoc,
    getDocs,
    doc,
    query,
    where,
    setDoc,
    collection,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../config/config";

export const createOrder= async (payload) => {
    try{
        const docRef = await addDoc(collection(db, "orders"), payload);
        console.log("Document written with ID: ", docRef.id);
        console.log('Create Order:', payload)
    }catch(e){
        console.error("Error adding document: ", e);
    }
}

export const getOrder = async (orderId) => {
    try {
      const ordersCollection = collection(db, 'orders');
      const querySnapshot = await getDocs(ordersCollection);
      const orderDoc = querySnapshot.docs.find(doc => doc.data().id === orderId);
  
      if (orderDoc) {
        const orderData = orderDoc.data();
        console.log('Get Order:', orderData)
        return orderData;
      } else {
        console.log("No such document!");
      }
    } catch(e){
        console.error("Error getting document: ", e);
    }
}


export const editOrder = async (orderId, updatedPayload) => {
    try {
      const ordersCollection = collection(db, 'orders');
      const querySnapshot = await getDocs(ordersCollection);
      console.log(querySnapshot.docs[0].id);
      const orderDoc = querySnapshot.docs.find(doc => doc.id === orderId);
  
      if (orderDoc) {
        await updateDoc(orderDoc.ref, updatedPayload);
        const updata = await getDocs(ordersCollection);
        const orderData = updata.docs.map((doc) => {
            return{
            ...doc.data(),
            };
        });
        
        console.log('Edit Order:', orderData)
        
        console.log(`Order with orderId ${orderId} updated successfully`);
        return orderData;
      } else {
        console.error(`Order with orderId ${orderId} not found`);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  

export const getAllOrders = async () => {
    try {
        const orders = await getDocs(collection(db, "orders"));
        if(orders){
        const ordersData = orders.docs.map((doc) => {
            return{
            ...doc.data(),
            id: doc.id,
            };
        });
        console.log('Get All Orders:', ordersData)
        return ordersData;
        }else{
        console.log("No such document!");
        }
    } catch (error) {
        console.log(error);
    }
    }

    export const deleteOrder = async (orderId) => {
        try {
          const querySnapshot = await getDocs(collection(db, 'orders'));
          const orderDoc = querySnapshot.docs.find(doc => doc.data().id === orderId);
      
          if (orderDoc) {
            await deleteDoc(orderDoc.ref);
            console.log(`Order with orderId ${orderId} deleted successfully`);
          } else {
            console.error(`Order with orderId ${orderId} not found`);
          }
        } catch (error) {
          console.error("Error deleting order:", error);
          return { success: false, message: "Error deleting order" };
        }
      };
      
     
      