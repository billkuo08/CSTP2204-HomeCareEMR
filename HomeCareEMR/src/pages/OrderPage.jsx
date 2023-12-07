/* eslint-disable react/jsx-key */
import { Typography, Container} from "@mui/material";
import { Button } from "semantic-ui-react";
import {useNavigate, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { PatientsContext } from "../context/PatientsContext";
import {Box, Textarea } from '@mui/joy'
import { createOrder } from "../API/orders";

export default function OrderPage() {
  const patients = useContext(PatientsContext);
  const {id} = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.username);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (value) => {
    console.log(value);
    const patient = patients.find((patient) => patient.id === id);
    try {
      const payload = {
        ...value,
        user: user.username,
        patientId: id,
        status: false,
        patientName: `${patient.firstName} ${patient.lastName}`,
        createDateTime: new Date().toISOString(),
      };
      await createOrder(payload);
      alert("Order Created Successfully");

    } catch (error) {
        console.log(error);
        // message.error(error.message);
    }
    };


  return (
<Container className="flex justify-center items-center form-container" sx={{ width: '50%' }}>
      <div className="form-wrapper">
        <div className="form-column">
          <Typography variant="h5" className="h5">
            Supplies/Medication Order
          </Typography>


          <form onSubmit={handleSubmit(onSubmit)}   className="p-2">
            {patients.map((patient) => {
              if(patient.id === id){
                return(
                  <Typography variant="h6" className="h6">
                    Patient Name: {patient.firstName} {patient.lastName}
                  </Typography>
                  )
                }
              })
            }

            <Box
              sx={{
                py: 2,
                display: 'grid',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '100%',
                
              }}
            >
                <Textarea
                  minRows={10}
                  placeholder="Enter Medication/Supply Name here"
                  required
                  sx={{ mb: 1, ml:20, mr:20}}
                  type="text"
                  {...register("supplyName", { required: true })}
                />

            </Box>
            
            {errors.username && <span className="error-text">Username is required</span>}
            {errors.password && <span className="error-text">Password is required</span>}
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </Container>
  )
}
