//By Bill
import { React, useEffect } from 'react';
import { createOrder, deleteOrder, getAllOrders, editOrder, getOrder } from '../API/orders.js';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default function TestCreateOrderFunction() {
    const db = getFirestore();

    const newOrder = {
        createDateTime: "2023-11-18T10:05:26.258Z",
        fieldId: "testFieldID",
        patientName: "testName",
        supplyName: "testSupplyName",
    };

    const updateOrder = {
        createDateTime: "2023-11-18T10:05:26.258Z",
        fieldId: "orderTestID",
        patientName: "Bill Kuo",
        supplyName: "Bill Kuo's supply",
    };

    const createAndGetOrder_whenOrderexist_shouldReturnOrder = async () => {
        try {
            await createOrder(newOrder);
            const response1 = await getOrder(newOrder.id)
            
            if (response1)
                return response1;
        } catch (error) {
            console.log(error);
        }
    }

    const getAllOrders_whenAtleastOneOrder_shouldReturnAllOrders = async () => {
        try {
            const response2 = await getAllOrders();
            if (response2.length > 0)
                return response2;
        } catch (error) {
            console.log(error);
        }
    }

    const editTheOrder_whenOrderexists_shouldReturnEditedOrder = async () => {
        try {
            const targetOrder = await getOrder(newOrder.id)
            console.log(targetOrder)
            const response3 = await editOrder('flloUISzhDYUlFFTJr9m', updateOrder);
            if (response3)
                return response3;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTheOrder_whenOrderexists_shouldReturndeletedOrder = async () => {
        try {
            const response4 = await deleteOrder(newOrder.id);
            if (response4)
                return response4;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <><div> Bill's create/edit/delete/getall's OrderTest</div>
            <button onClick={createAndGetOrder_whenOrderexist_shouldReturnOrder}>Test Create & Get Order APIs</button>
            <button onClick={getAllOrders_whenAtleastOneOrder_shouldReturnAllOrders}>Test Get All Orders APIs</button>
            <button onClick={editTheOrder_whenOrderexists_shouldReturnEditedOrder}>Test Edit Order APIs</button>
            <button onClick={deleteTheOrder_whenOrderexists_shouldReturndeletedOrder}>Test delete Order APIs</button>

        </>

    );

}


