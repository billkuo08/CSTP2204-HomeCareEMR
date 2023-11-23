import React from "react";
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
        navigate("/patients");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="flex justify-center items-center form-container" sx={{ width: '100%' }}>
      <div className="form-wrapper">
        <div className="form-column">
          <Typography variant="h5" className="h5">
            <em><b>Login</b></em>
          </Typography>
          <br></br>
          <br></br>
          <br></br>
          <form onSubmit={handleSubmit(onSubmit)} className="p-2">
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
          </form>
        </div>
      </div>
    </Container>
  );
}
