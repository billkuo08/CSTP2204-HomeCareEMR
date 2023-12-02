//By Bill
import { React, useEffect } from 'react';
import { createOrder, deleteOrder, getAllOrders, editOrder, getOrder } from '../API/orders.js';


export default function TestCreateOrderFunction() {
    const newOrder = {
        createDateTime: "2023-11-18T10:05:26.258Z",
        id: "orderTestID",
        patientName: "testName",
        supplyName: "testSupplyName",
    };

    const updateOrder = {
        createDateTime: "2023-11-18T10:05:26.258Z",
        id: "orderTestID",
        patientName: "Bill Kuo",
        supplyName: "Bill Kuo's supply",
    };

    const createAndGetOrderTest = async () => {
        try {
            await createOrder(newOrder);
            const response1 = await getOrder(newOrder.id)
            if (response1 && response1.id === newOrder.id)
                return response1;
        } catch (error) {
            console.log(error);
        }
    }

    const getAllOrdersTest = async () => {
        try {
            const response2 = await getAllOrders();
            if (response2 && response2.length > 0)
                return response2;
        } catch (error) {
            console.log(error);
        }
    }

    const editOrderTest = async () => {
        try {
            const response3 = await editOrder(newOrder.id, updateOrder);
            if (response3 && response3.id === newOrder.id)
                return response3;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteOrderTest = async () => {
        try {
            const response4 = await deleteOrder(newOrder.id);
            if (response4 && reponse4.id === newOrder.id)
                return response4;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <><div> Bill's create/edit/delete/getall's OrderTest</div>
            <button onClick={createAndGetOrderTest}>Test Create & Get Order APIs</button>
            <button onClick={getAllOrdersTest}>Test Get All Orders APIs</button>
            <button onClick={editOrderTest}>Test Edit Order APIs</button>
            <button onClick={deleteOrderTest}>Test delete Order APIs</button>

        </>

    );

}


