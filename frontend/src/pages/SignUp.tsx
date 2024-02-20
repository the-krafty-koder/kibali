import "./SignUp.css";
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
import { Link } from "react-router-dom";
import { z } from "zod";

const SignUpSchema = z
  .object({
    fullName: z.string().min(2),
    email: z.string().email(),
    country: z.string().min(4),
    phoneNumber: z.string().min(11),
    password1: z.string().min(8).max(20),
    password2: z.string().min(8).max(20),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords dont match",
  });

const SignUp = () => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    country: "",
    phoneNumber: "",
    password1: "",
    password2: "",
  });

  const [errors, setErrors] = useState<{
    fullName?: string[];
    email?: string[];
    country?: string[];
    phoneNumber?: string[];
    password1?: string[];
    password2?: string[];
  }>({
    fullName: [],
    email: [],
    country: [],
    phoneNumber: [],
    password1: [],
    password2: [],
  });

  const handleSubmit = async () => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/organizations`;
    const validation = SignUpSchema.safeParse(values);
    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        user: {
          first_name: values.fullName,
          email: values.email,
          username: values.fullName.split(" ").join("-"),
          password: values.password1,
        },
        phone_number: values.phoneNumber,
        country: values.country,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 201) {
        window.location.href = "/login";
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
      <Card className="signupWrapper" component={Stack} spacing={3}>
        <Stack spacing={1} className="signUpHeader">
          <ClearAllIcon
            className="signUpLogo"
            fontSize="large"
            style={{
              color: "#350182",
            }}
          />
          <Typography variant="h4"> Sign up</Typography>
          <Typography className="tagLine">
            {" "}
            Enter your details below to start your account and get started
          </Typography>
        </Stack>

        <Stack
          className="form"
          component="form"
          spacing={3}
          sx={{
            "& .MuiTextField-root": { width: "20vw" },
          }}
        >
          <Stack spacing={2} direction="row">
            <Stack spacing={1}>
              <FormLabel>Full Name</FormLabel>
              <TextField
                label="Enter name.."
                variant="outlined"
                value={values.fullName}
                onChange={({ target: { value } }) =>
                  setValues({ ...values, fullName: value })
                }
              />
              {errors.fullName?.map((error) => (
                <Typography variant="subtitle1" key={error} color="error">
                  {error}
                </Typography>
              ))}
            </Stack>
            <Stack spacing={1}>
              <FormLabel>Email</FormLabel>
              <TextField
                variant="outlined"
                label="example@gmail.com"
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
          </Stack>
          <Stack spacing={2} direction="row">
            <Stack spacing={1}>
              <FormLabel>Country</FormLabel>
              <TextField
                variant="outlined"
                value={values.country}
                onChange={({ target: { value } }) =>
                  setValues({ ...values, country: value })
                }
              />
              {errors.country?.map((error) => (
                <Typography variant="subtitle1" key={error} color="error">
                  {error}
                </Typography>
              ))}
            </Stack>
            <Stack spacing={1}>
              <FormLabel>Phone number</FormLabel>
              <TextField
                variant="outlined"
                label="+1-212-456-7890"
                value={values.phoneNumber}
                onChange={({ target: { value } }) =>
                  setValues({ ...values, phoneNumber: value })
                }
              />
              {errors.phoneNumber?.map((error) => (
                <Typography variant="subtitle1" key={error} color="error">
                  {error}
                </Typography>
              ))}
            </Stack>
          </Stack>
          <Stack spacing={2} direction="row">
            <Stack spacing={1}>
              <FormLabel>Password</FormLabel>
              <TextField
                variant="outlined"
                value={values.password1}
                onChange={({ target: { value } }) =>
                  setValues({ ...values, password1: value })
                }
              />
              {errors.password1?.map((error) => (
                <Typography variant="subtitle1" key={error} color="error">
                  {error}
                </Typography>
              ))}
            </Stack>
            <Stack spacing={1}>
              <FormLabel>Confirm password</FormLabel>
              <TextField
                variant="outlined"
                value={values.password2}
                onChange={({ target: { value } }) =>
                  setValues({ ...values, password2: value })
                }
              />
              {errors.password2?.map((error) => (
                <Typography variant="subtitle1" key={error} color="error">
                  {error}
                </Typography>
              ))}
            </Stack>
          </Stack>
          <Stack spacing={2} direction="row">
            <Button
              href="/signup"
              variant="outlined"
              color="inherit"
              sx={{ color: "black", width: "20vw" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={buttonStyle}
              sx={{ width: "20vw" }}
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </Stack>
          <div className="loginLink">
            <Typography>
              Already have an account? <Link to="/login"> Login</Link>
            </Typography>
          </div>
        </Stack>
      </Card>
    </div>
  );
};

export default SignUp;
