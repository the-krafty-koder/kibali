import {
  Avatar,
  Box,
  Button,
  Card,
  FormLabel,
  Stack,
  TextField,
  Typography,
  Modal,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../ui/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { startButton as buttonStyle } from "../pages/Navigation.css";
import { useShallow } from "zustand/react/shallow";
import useStore from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(4),
  phoneNumber: z.string().min(11),
});

const Profile = () => {
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [uploadValues, setUploadValues] = useState<{ file: File }>();
  const { organization, credentials, fetchOrganization } = useStore(
    (state) => ({
      organization: state.organization,
      credentials: state.credentials,
      fetchOrganization: state.fetchOrganization,
    })
  );

  useEffect(() => {
    if (backdrop === false) {
      fetchOrganization(organization?.user.email!);
    }
  }, [backdrop]);

  const [values, setValues] = useState({
    fullName: organization?.user.firstName || "",
    email: organization?.user.email,
    country: organization?.country,
    phoneNumber: organization?.phoneNumber,
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
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/organizations/${organization?.id}`;
    const validation = ProfileSchema.safeParse(values);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    await fetch(endpoint, {
      method: "PUT",
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
        Authorization: `$Token ${credentials.token}`,
      },
    }).then((response) => {
      if (response.status === 201) {
        window.location.href = "/login";
      }
    });

    fetchOrganization(values.email!);
  };

  const handleUploadedFile = () => {
    setOpenUploadModal(false);
    setBackdrop(true);
    const uploadEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/organizations/${organization?.id}/upload-logo`;
    const formData = new FormData();

    formData.append("file", uploadValues?.file!);

    fetch(uploadEndpoint, {
      headers: {
        Authorization: `Token ${credentials.token}`,
      },
      method: "POST",
      body: formData,
    }).then(async (response) => {
      if (response.status === 201) {
        toast.success("Upload successful!", {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setBackdrop(false);
      } else {
        toast.error("Upload failed, please try again later", {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
            component={Stack}
            spacing={5}
            direction="row"
            alignItems="center"
            padding="20px"
          >
            <Avatar
              className="organizationLogo"
              sx={{
                height: "100px",
                width: "100px",
                marginTop: "20px",
              }}
            >
              <img src={organization?.logoUrl} />
            </Avatar>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ color: "black" }}
              onClick={() => setOpenUploadModal(true)}
            >
              {" "}
              Change Logo
            </Button>
            <Modal
              open={openUploadModal}
              onClose={() => setOpenUploadModal(false)}
              className="uploadForm"
            >
              <Card className="uploadCard">
                <form>
                  <Stack spacing={2}>
                    <Typography variant="h5">Upload a logo</Typography>
                    <TextField
                      type="file"
                      onChange={(event) => {
                        const { files } = event.target as HTMLInputElement;
                        setUploadValues({
                          file: files![0],
                        });
                      }}
                    />
                    <br />
                    <Button
                      variant="contained"
                      sx={{
                        background: "#350182",
                        color: "white",
                        width: "25%",
                        ":hover": {
                          background: "inherit",
                          border: " solid #350182",
                          color: "#350182",
                        },
                      }}
                      onClick={handleUploadedFile}
                    >
                      Upload
                    </Button>
                  </Stack>
                </form>
              </Card>
            </Modal>
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
                  variant="outlined"
                  color="inherit"
                  sx={{ color: "black", width: "20vw" }}
                  onClick={() =>
                    setValues({
                      fullName: "",
                      email: "",
                      country: "",
                      phoneNumber: "",
                    })
                  }
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
      <Backdrop open={backdrop} invisible={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Sidebar>
  );
};

export default Profile;
