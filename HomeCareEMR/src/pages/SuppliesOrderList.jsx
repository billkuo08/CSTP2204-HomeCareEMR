import {PatientsContext} from "../context/PatientsContext";
import { useContext, useState } from "react";
import { getAllOrders } from "../API/orders";
import { useEffect } from "react";
import OrderList from "../components/OrderList";

export default function SuppliesOrderList() {
    const patients = useContext(PatientsContext);
    const [orderData, setOrderData] = useState([]);
    console.log(patients);
    const getAllOrdersData = async () => {
        try{
            const orders = await getAllOrders();
            setOrderData(orders);
            console.log(orders);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getAllOrdersData();
    }, [])


  return (
    
    <>
    <OrderList data={orderData}/>
    </>
  )
}
