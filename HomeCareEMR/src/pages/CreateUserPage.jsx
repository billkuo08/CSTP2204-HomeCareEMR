import { useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom"
// import Select from "react-select"
import { TextField, MenuItem, Stack, Typography, Container } from '@mui/material'
import Button from '@mui/material/Button';
import '../CSS/PatientTableComponent.css';
import '../CSS/CreateUserPage.css';
import { createUser } from "../API/users"
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import AccessibilityNewTwoToneIcon from '@mui/icons-material/AccessibilityNewTwoTone';
import DrawTwoToneIcon from '@mui/icons-material/DrawTwoTone';
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import SupervisorAccountTwoToneIcon from '@mui/icons-material/SupervisorAccountTwoTone';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
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
        console.log(response.data);
        if(response.success){
            localStorage.setItem(
            "user",
            JSON.stringify({
            ...response.data,
            password: "",
            })
        );
        alert("User created successfully");
        }

        if(response.data.role === 'nurse'){
            navigate("/createnurse");
        }else{
            navigate("/login");
        }
    } catch (error) {
        console.log(error);
        // message.error(error.message);
    }
    };


    

    console.log(watch("example")) // watch input value by passing the name of it

    return (
    <Container className="flex justify-center items-cengter form-container" sx={{width:'50%'}}>
        <Typography variant="h5" className="h5"> <em><b> <AdminPanelSettingsTwoToneIcon></AdminPanelSettingsTwoToneIcon> Create User <AccessibilityNewTwoToneIcon></AccessibilityNewTwoToneIcon></b></em></Typography>
        <form onSubmit={handleSubmit(onSubmit)} className=" p-2 ">
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input defaultValue="test" {...register("example")} /> */}
        <br></br>
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
            label="Password"
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
                label="Role (Select)"
                defaultValue=''
                inputProps={register('role', {
                    required: 'Please enter the role',
                })}
                error={errors.role}
                helperText={errors.role?.message}
                >
                <MenuItem value='nurse'>Nurse <MedicalInformationTwoToneIcon></MedicalInformationTwoToneIcon></MenuItem>
                <MenuItem value='assistant'>Assistant <SupervisorAccountTwoToneIcon></SupervisorAccountTwoToneIcon></MenuItem>
                <MenuItem value='manager'>Manager <SupervisedUserCircleTwoToneIcon></SupervisedUserCircleTwoToneIcon></MenuItem>
            </TextField>
        </Stack>

        {/* include validation with required or other standard HTML validation rules */}
        {/* <input {...register("exampleRequired", { required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <Button className="btn-homepage" type="submit"><DrawTwoToneIcon></DrawTwoToneIcon>Submit</Button>
        </form>
    </Container>

    )

}
