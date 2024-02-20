import "./Login.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import {
  Box,
  Button,
  Card,
  FormLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { startButton as buttonStyle } from "./Navigation.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { ZodError, z } from "zod";
import useStore from "../store/store";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({
    email: [],
    password: [],
  });

  const navigate = useNavigate();

  const { setCredentials } = useStore();

  const handleSubmit = async () => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/login`;
    const validation = LoginSchema.safeParse(values);
    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        username: values.email,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (response.status === 200) {
        const { token } = await response.json();
        setCredentials({
          token,
          email: values.email,
        });
        return navigate("/app/dashboard");
      }
    });
  };

  return (
    <div
      className="authContainer"
      style={{
        backgroundColor: "#f7f5fa",
      }}
    >
      <Card className="loginWrapper" component={Stack} spacing={3}>
        <Stack spacing={1} className="loginHeader">
          <ClearAllIcon
            className="LoginLogo"
            fontSize="large"
            style={{
              color: "#350182",
            }}
          />
          <Typography variant="h4"> Welcome back!</Typography>
          <Typography className="tagLine">
            Glad to see you again <WavingHandIcon fontSize="small" />
          </Typography>
          <Typography className="tagLine">
            Login to your account below
          </Typography>
        </Stack>

        <Stack
          className="form"
          component="form"
          spacing={3}
          sx={{
            "& .MuiTextField-root": { width: "25vw" },
          }}
        >
          <Stack spacing={1}>
            <FormLabel>Email</FormLabel>
            <TextField
              label="example@gmail.com"
              variant="outlined"
              value={values.email}
              onChange={({ target: { value } }) =>
                setValues({ ...values, email: value })
              }
            />
            {errors.email?.map((error) => (
              <Typography variant="subtitle1" key={error} color="error">
                {error}
              </Typography>
            ))}
          </Stack>
          <Stack spacing={1}>
            <FormLabel>Password</FormLabel>
            <TextField
              variant="outlined"
              value={values.password}
              onChange={({ target: { value } }) =>
                setValues({ ...values, password: value })
              }
            />
            {errors.password?.map((error) => (
              <Typography variant="subtitle1" key={error} color="error">
                {error}
              </Typography>
            ))}
          </Stack>
          <Button
            variant="contained"
            style={buttonStyle}
            sx={{ width: "25vw" }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Typography>
            Dont have an account? <Link to="/signup">Sign up for free</Link>
          </Typography>
        </Stack>
      </Card>
    </div>
  );
};

export default Login;
