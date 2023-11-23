
import { React, useEffect } from 'react';
import { createOrder } from '../API/orders.js';

export default function createOrderTest() {
    const orderCreate = async () => {
        const newOrder = {
            createDateTime: "2023-11-18T10:05:26.258Z",
            id: "testID",
            patientName: "testName",
            supplyName: "testSupplyName",
        };
        await createOrder(newOrder);
    };

    useEffect(() => {
        orderCreate();
    });


    return (
        <div> Bill's createOrderTest</div>

    );

}


