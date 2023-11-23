import { useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom"
// import Select from "react-select"
import { TextField, MenuItem, Stack, Typography, Container } from '@mui/material'
import Button from '@mui/material/Button';
import "../CSS/Map.css"
import '../CSS/PatientTableComponent.css';
import '../CSS/CreatePatient.css';
import { createUser } from "../API/users"
export default function CreateUserPage() {
    const navigate = useNavigate();
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    } = useForm()


    const onSubmit = async(values) => {
    try {
        const response = await createUser(values);
        console.log(response.data.id);
        if(response.success){
            localStorage.setItem(
            "user",
            JSON.stringify({
            ...response.data,
            password: "",
            })
        );
        }
        //alert("User created successfully");
        // if(response.sucess){
        //     message.success(response.message);
        // }else{
        //     message.error(response.message);
        // }
        navigate("/createnurse");
    } catch (error) {
        console.log(error);
        // message.error(error.message);
    }
    };


    

    console.log(watch("example")) // watch input value by passing the name of it

    return (
    <Container className="flex justify-center items-cengter form-container" sx={{width:'50%'}}>
        <Typography variant="h5" className="h5"> Create User</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className=" p-2 ">
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input defaultValue="test" {...register("example")} /> */}
        <Stack sx={{marginBottom:'10px'}}>
            <TextField
                label="Username"
                variant="outlined"
                type="text"
                required
                {...register("username", { required: true })}
                />
        </Stack>
        <Stack sx={{marginBottom:'10px'}}>
                        <TextField
            label="Passward"
            variant="outlined"
            type="password"
            required
            {...register("password", { required: true })}
            />
        </Stack>
        <Stack sx={{marginBottom:'10px'}}>
            <TextField
                fullWidth
                select            
                label="Select"
                defaultValue=''
                inputProps={register('role', {
                    required: 'Please enter the role',
                })}
                error={errors.role}
                helperText={errors.role?.message}
                >
                <MenuItem value='nurse'>Nurse</MenuItem>
                <MenuItem value='assistant'>Assistant</MenuItem>
                <MenuItem value='manager'>Manager</MenuItem>
            </TextField>
        </Stack>

        {/* include validation with required or other standard HTML validation rules */}
        {/* <input {...register("exampleRequired", { required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <Button className="btn-homepage" type="submit">Submit</Button>
        </form>
    </Container>

    )

}
