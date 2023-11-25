//By Bill
import { React, useEffect } from 'react';
import { createOrder, deleteOrder, getAllOrders, editOrder, getOrder } from '../API/orders.js';


export default function TestCreateOrderFunction() {
    const orderAPIs = async () => {
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

        await createOrder(newOrder);
        await getAllOrders();
        await editOrder(newOrder.id, updateOrder);
        await getOrder(newOrder.id);
        await deleteOrder(newOrder.id);
        
    }; 

  


    return (
        <><div> Bill's create/edit/delete/getall's OrderTest</div><button onClick={orderAPIs}>Test Order APIs</button></>

    );

}


