import { useForm } from "react-hook-form"
import { Container, Typography, TextField, Stack, Button, Box, FormControl, FormGroup, FormControlLabel, Checkbox, InputLabel, Select, MenuItem } from "@mui/material"
import { addNurse } from "../API/users";
import "../CSS/Map.css"
import '../CSS/PatientTableComponent.css';
import '../CSS/CreatePatient.css';
import MasksTwoToneIcon from '@mui/icons-material/MasksTwoTone'; 
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';

export default function CreateNurse() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        } = useForm()

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

        const onSubmit = async(data) => {
        try {
            const payload = {
                ...data,
                userId: user.userId,
            }
            await addNurse(payload);
            alert("Nurse created successfully");
            // if(response.sucess){
            //     message.success(response.message);
            // }else{
            //     message.error(response.message);
            // }
            //navigate('/createnurse');
        } catch (error) {
            console.log(error);
            // message.error(error.message);
        }
        }

  return (
    <>        
    <Typography variant="h5" className="h5"> <em> <b> <MasksTwoToneIcon></MasksTwoToneIcon> Create Nurse <GroupAddTwoToneIcon></GroupAddTwoToneIcon></b> </em></Typography>
        <Container className="form-container" >
        <form onSubmit={handleSubmit(onSubmit)} >
          <Stack spacing={1} direction="row" sx={{ marginBottom: -1, marginTop: 1}}>
            <TextField
              size="medium"
              type="text"
              variant='outlined'
              color='secondary'
              label="First Name"
              fullWidth
              required
              {...register("firstName", { required: true })}
            />
            <br></br>
            <TextField
                size="medium"
                type="text"
                variant='outlined'
                color='secondary'
                label="Last Name"
                fullWidth
                required
                {...register("lastName", { required: true })}
            />
            <br></br>
            <TextField
                fullWidth
                select            
                label="Select"
                defaultValue=''
                inputProps={register('gender', {
                    required: 'Please enter the gender',
                })}
                error={errors.gender}
                helperText={errors.gender?.message}
                >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
            </TextField>

            </Stack>

            <br></br>
                
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1 }} >
                    <TextField
                        size="medium"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Position"
                        {...register("position", { required: true })}
                        fullWidth
                        required
                    />
                    <TextField
                        size="medium"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Phone"
                        {...register("phone", { required: true })}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1 }}>
                    <TextField
                        size="medium"
                        type="address"
                        variant='outlined'
                        color='secondary'
                        label="Address"
                        {...register("address", { required: true })}
                        fullWidth
                        required
                    />
                </Stack>
               

                <br></br>

                
                <br></br>
                
                <Button className="btn-homepage" type="submit">Submit</Button>
                
            </form>
        </Container>
    </>
  )
}
