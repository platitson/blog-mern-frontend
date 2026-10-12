import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RegistrationSchemaType } from "../types";
import { Button, Paper, styled, TextField, Typography } from "@mui/material";
import { fetchAuth, fetchRegister, isAuthSelector } from "../redux/slices/auth";
import type { AppDispatch } from "../redux/store";
import { Navigate } from "react-router";

function useRegistrationForm() {
  return useForm<RegistrationSchemaType>({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });
}

export const Registration = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRegistrationForm();

  const onSubmit = async (values: RegistrationSchemaType) => {
    const data = await dispatch(fetchRegister(values));
    if (fetchAuth.fulfilled.match(data) && "token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <StyledPaper>
      <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
        Registration
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <TextField
            label="Full Name"
            helperText={errors.fullName?.message}
            error={Boolean(errors.fullName)}
            fullWidth
            {...register("fullName", { required: true })}
          />
          <TextField
            label="Email"
            type="email"
            helperText={errors.email?.message}
            error={Boolean(errors.email)}
            fullWidth
            {...register("email", { required: true })}
          />
          <TextField
            label="Password"
            type="password"
            helperText={errors.password?.message}
            error={Boolean(errors.password)}
            fullWidth
            {...register("password", { required: true })}
          />
          <Button variant="contained" fullWidth type="submit">
            Create account
          </Button>
        </FormWrapper>
      </form>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)(() => ({
  width: "400px",
  margin: "0 auto",
  padding: "1.6rem",
}));

const FormWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  marginTop: "1.6rem",
}));
