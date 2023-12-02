import { useForm } from "react-hook-form";
import "../CSS/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { TextField, Stack, Typography, Container } from "@mui/material";
import { loginUser } from "../API/users";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const response = await loginUser(values);
      if (response.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data,
            password: "",
          })
        );
        const userInfo = JSON.parse(localStorage.getItem('user'));
      
        if(userInfo.role === 'admin' || userInfo.role === 'manager'){
          console.log("yes");
          window.location.reload();
          navigate("/");
        }else if(userInfo.role === 'nurse'){
          
          navigate("/direction");
        }else if(userInfo.role === 'assistant'){
          
          navigate("/supplies");
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container  sx={{ width: '100%' }}>
      {/* <div className="form-wrapper">
        <div className="form-column"> */}
          {/* <Typography variant="h5" className="h5">
            <em><b>Login</b></em>
          </Typography> */}
          {/* <form onSubmit={handleSubmit(onSubmit)} className="p-2">
            <Stack className="TextField">
              <TextField
                label="Username"
                variant="outlined"
                type="text"
                required
                {...register("username", { required: true })}
              />

            </Stack>
            <br></br>
            <br></br>
            <Stack className="TextField">
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required
                {...register("password", { required: true })}
              />
            </Stack>
            {errors.username && <span className="error-text">Username is required</span>}
            {errors.password && <span className="error-text">Password is required</span>}
            <button type="submit">Submit</button>
          </form> */}
          <div className="container">      
            <div className="screen">
              <div className="screen__content">
                <form onSubmit={handleSubmit(onSubmit)}  className="login">
                  <div className="login__field">
                    <i className="login__icon fas fa-user"></i>
                    <input {...register("username", { required: true })} type="text" className="login__input" placeholder="User name" />
                  </div>
                  <div className="login__field">
                    <i className="login__icon fas fa-lock"></i>
                    <input {...register("password", { required: true })} type="password" className="login__input" placeholder="Password" />
                  </div>
                  <button className="button login__submit">
                    <span className="button__text">Log In Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                  </button>
                  {errors.username && <span className="error-text">Username is required</span>}
                  {errors.password && <span className="error-text">Password is required</span>}
                </form>
                <div className="social-login">
                  <h3>log in via</h3>
                  <div className="social-icons">
                    <a href="#" className="social-login__icon fab fa-instagram"></a>
                    <a href="#" className="social-login__icon fab fa-facebook"></a>
                    <a href="#" className="social-login__icon fab fa-twitter"></a>
                  </div>
                </div>
              </div>
              <div className="screen__background">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
              </div>
            </div>
          </div>
        {/* </div>
      </div> */}



    </Container>



  );
}
