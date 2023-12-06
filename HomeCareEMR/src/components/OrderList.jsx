/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Container, Switch, Button} from '@mui/material'
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import PersonAddDisabledTwoToneIcon from '@mui/icons-material/PersonAddDisabledTwoTone';
import { editOrder } from "../API/orders";
import { useState } from 'react';
export default function OrderList(props) {
    const orderData = props.data;
    const [orders, setOrders] = useState(orderData);
    const handleStatusChange = async(orderId, order) => {
        order.status = !order.status;
        const updateData = await editOrder(orderId, order);
        setOrders(updateData);
    }
  return (
    <Container className="flex justify-center items-center form-container" sx={{ width: '100%' }}>
        <h2><PersonAddAltTwoToneIcon /><em> Supplies Order List </em> <PersonAddDisabledTwoToneIcon /></h2>
        <div className="table-wrapper" >
        <table className="fl-table">
            <thead>
                <tr>
                    <th>Order Date</th>
                    <th>Patient Name</th>
                    <th>Order Item</th>
                    <th>Order Status</th>
                    <th>Order By</th>
                </tr>
            </thead>
            <tbody>
                {orderData.map((order) => {
                    return(
                        <tr>
                            <td>{order?.createDateTime}</td>
                            <td>{order?.patientName}</td>
                            <td>{order?.supplyName}</td>
                            <td><Button 
                                variant="contained"
                                color={order.status ? "success" : "warning"}
                                onClick={() => handleStatusChange(order.id, order)}
                                >
                                {order.status ? "Completed" : "Pending"}
                            </Button></td>
                            <td>{order?.user}</td>

                        </tr>
                    )

                })}

            </tbody>
        </table>
        </div>
    </Container>
  )
}
