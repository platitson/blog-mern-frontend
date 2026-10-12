import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import type { LoginSchemaType } from "../types";
import { Button, Paper, styled, TextField, Typography } from "@mui/material";
import { fetchAuth } from "../redux/slices/auth";
import type { AppDispatch } from "../redux/store";

function useLoginForm() {
  return useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
}

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const onSubmit = (values: LoginSchemaType) => {
    dispatch(fetchAuth(values));
  };

  return (
    <StyledPaper>
      <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
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
            Login
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
