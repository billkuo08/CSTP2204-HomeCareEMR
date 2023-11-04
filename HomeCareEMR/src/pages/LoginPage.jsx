import { useForm} from "react-hook-form"
import "./CreateUserPage.css"
import { useNavigate } from "react-router-dom"
// import Select from "react-select"
import { TextField, Stack, Typography, Container } from '@mui/material'
import { Button } from "semantic-ui-react"
import { loginUser } from "../API/users"

export default function LoginPage() {
        const navigate = useNavigate();
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    } = useForm()


    const onSubmit = async(values) => {
        try {
            const response = await loginUser(values);
            console.log(response.data.id);
            if(response.success){
                localStorage.setItem(
                "user",
                JSON.stringify({
                ...response.data,
                password: "",
                })
            );
            navigate("/patients");
            }else{
                throw new Error(response.message);
            }        
            
        } catch (error) {
            console.log(error);
        }
    }    

    console.log(watch("example")) // watch input value by passing the name of it
  return (
    <Container className="flex justify-center items-cengter form-container" sx={{width:'50%'}}>
        <Typography variant="h5" className="h5"> Login</Typography>
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

        {/* include validation with required or other standard HTML validation rules */}
        {/* <input {...register("exampleRequired", { required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <Button type="submit">Submit</Button>
        </form>
    </Container>

    )
}
