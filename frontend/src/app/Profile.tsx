import {
  Avatar,
  Box,
  Button,
  Card,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "../ui/Sidebar/Sidebar";
import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { startButton as buttonStyle } from "../pages/Navigation.css";

const ProfileSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(4),
  phoneNumber: z.string().min(11),
});

const Profile = () => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    country: "",
    phoneNumber: "",
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
  });

  const handleSubmit = async () => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/organizations`;
    const validation = ProfileSchema.safeParse(values);
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
    <Sidebar>
      <Stack
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            padding: "20px",
            width: "60vw",
          }}
        >
          <Box>
            <Typography
              sx={{
                borderBottom: "solid 1px rgb(28, 28, 28, 0.5)",
                paddingBottom: "20px",
              }}
              variant="h5"
            >
              {" "}
              Organization Profile{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              borderBottom: "solid 1px rgb(28, 28, 28, 0.5)",
              paddingBottom: "20px",
            }}
          >
            <Avatar
              sx={{
                height: "100px",
                width: "100px",
                marginTop: "20px",
              }}
            ></Avatar>
          </Box>
          <Box
            sx={{
              paddingTop: "20px",
            }}
          >
            <Stack
              spacing={3}
              sx={{
                "& .MuiTextField-root": { width: "100%" },
              }}
            >
              <Stack spacing={2} direction="row">
                <Stack spacing={1} sx={{ width: "50%" }}>
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
                <Stack spacing={1} sx={{ width: "50%" }}>
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
                <Stack spacing={1} sx={{ width: "50%" }}>
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
                <Stack spacing={1} sx={{ width: "50%" }}>
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
              <Stack spacing={2} direction="row" justifyContent="center">
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
                  Save
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Card>
      </Stack>
    </Sidebar>
  );
};

export default Profile;
