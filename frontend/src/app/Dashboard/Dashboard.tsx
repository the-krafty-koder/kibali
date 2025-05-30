import Sidebar from "../../ui/Sidebar/Sidebar";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Chart from "react-apexcharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DocumentList from "../../ui/DocumentList/DocumentList";
import MoreVert from "@mui/icons-material/MoreVert";
import useStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { chartOptions, chartSeries } from "./chart";
import { format } from "date-fns";
import { z } from "zod";

export const MAX_FILE_SIZE = 5120;

const UploadFileSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(10).max(500),
  file: z
    .instanceof(File, { message: "A file has to be chosen" })
    .refine((file) => {
      return file.size >= MAX_FILE_SIZE;
    }, `File size should be less than 5MB.`),
});

const Dashboard = () => {
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [uploadValues, setUploadValues] = useState<{
    name: string;
    description: string;
    file: File;
  }>();
  const [uploadErrors, setUploadErrors] = useState<{
    name?: string[];
    description?: string[];
    file?: string[];
  }>();
  const [backdrop, setBackdrop] = useState<boolean>(false);

  const {
    organization,
    termsOfServices,
    credentials,
    fetchOrganization,
    fetchTermsOfService,
  } = useStore(
    useShallow((state) => ({
      organization: state.organization,
      termsOfServices: state.termsOfServices,
      fetchOrganization: state.fetchOrganization,
      fetchTermsOfService: state.fetchTermsOfService,
      credentials: state.credentials,
    }))
  );

  const totalStorageUsed = termsOfServices?.reduce(
    (sum, tos) => sum + tos.totalFileSize,
    0
  );

  useEffect(() => {
    if (backdrop === false && organization === undefined) {
      fetchOrganization(credentials?.email!);
    }
    if (backdrop === false && organization !== undefined) {
      fetchTermsOfService();
    }
  }, [backdrop, organization]);

  const handleUploadedFile = () => {
    const validation = UploadFileSchema.safeParse(uploadValues);
    if (!validation.success) {
      setUploadErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setOpenUploadModal(false);
    setBackdrop(true);
    const uploadEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service/${organization?.id}/upload`;
    const formData = new FormData();

    formData.append("name", uploadValues?.name!);
    formData.append("description", uploadValues?.description!);
    formData.append("file", uploadValues?.file!);

    fetch(uploadEndpoint, {
      headers: {
        Authorization: `Token ${credentials.token}`,
      },
      method: "POST",
      body: formData,
    }).then(async (response) => {
      setBackdrop(false);
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
    <>
      <Sidebar>
        <Grid container className="dashboard" spacing={5}>
          <Grid item xs={6}>
            <Typography
              component="div"
              className="headers"
              sx={{
                fontFamily: "Outfit",
                borderBottom: 0,
                color: "rgba(0,0,0,.7)",
              }}
            >
              <b>Upload</b>
            </Typography>
            <div className="uploadContainer">
              <Box
                className="upload"
                component={Button}
                sx={{
                  background: "#350182",
                  width: "60%",
                  color: "white",
                  ":hover": {
                    background: "inherit",
                    border: "2px solid #350182",
                    color: "#350182",
                  },
                }}
                onClick={() => setOpenUploadModal(true)}
              >
                <Typography>Upload a terms of service file</Typography>
              </Box>
              <Modal
                open={openUploadModal}
                onClose={() => setOpenUploadModal(false)}
                className="uploadForm"
              >
                <Card className="uploadCard">
                  <form>
                    <Stack spacing={2}>
                      <Typography variant="h5">
                        Upload a terms of service file (pdf)
                      </Typography>
                      <TextField
                        label="Name"
                        value={uploadValues?.name}
                        onChange={({ target: { value } }) =>
                          setUploadValues({ ...uploadValues!, name: value })
                        }
                      />
                      {uploadErrors?.name && (
                        <Typography color="error">
                          {uploadErrors.name}
                        </Typography>
                      )}

                      <TextField
                        multiline
                        label="Description"
                        value={uploadValues?.description}
                        onChange={({ target: { value } }) =>
                          setUploadValues({
                            ...uploadValues!,
                            description: value,
                          })
                        }
                      />
                      {uploadErrors?.description && (
                        <Typography color="error">
                          {uploadErrors.description}
                        </Typography>
                      )}
                      <TextField
                        type="file"
                        onChange={(event) => {
                          const { files } = event.target as HTMLInputElement;
                          setUploadValues({
                            ...uploadValues!,
                            file: files![0],
                          });
                        }}
                        inputProps={{ accept: "application/pdf" }}
                      />
                      {uploadErrors?.file && (
                        <Typography color="error">
                          {uploadErrors.file}
                        </Typography>
                      )}

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
            </div>

            <Typography
              component="div"
              className="headers"
              sx={{ fontFamily: "Outfit", color: "rgba(0,0,0,.7)" }}
            >
              <b>Terms of Service</b>
            </Typography>
            <div className="tosContainer">
              {termsOfServices
                .reverse()
                .slice(0, 4)
                .map((termsOfService) => {
                  return (
                    <DocumentList
                      key={termsOfService.name}
                      link={`/app/terms-of-service/${termsOfService.id}`}
                      firstAction={
                        <Chip label={`${termsOfService.totalFileSize} MB`} />
                      }
                      secondAction={
                        <IconButton sx={{ marginRight: 0 }}>
                          {" "}
                          <MoreVert />
                        </IconButton>
                      }
                    >
                      <Stack spacing={1}>
                        <Typography variant="subtitle1">
                          {termsOfService.name}
                        </Typography>
                        <Typography className="date">
                          {format(termsOfService.createdAt, "do MMMM yyyy")}
                        </Typography>
                      </Stack>
                    </DocumentList>
                  );
                })}
            </div>
          </Grid>
          <Grid item xs={1} className="dividerContainer">
            <div className="divider" />
          </Grid>
          <Stack
            item
            xs={5}
            className="dividerContainer"
            component={Grid}
            direction="column"
            spacing={2}
            justifyContent="space-between"
          >
            <Box
              sx={{ background: "#FFECE4", minHeight: "60vh", width: "100%" }}
            >
              <Typography
                component="div"
                className="analytics-header"
                sx={{ fontFamily: "Outfit", color: "rgba(0,0,0,.7)" }}
              >
                <b>Storage</b>
              </Typography>
              <Box
                sx={{
                  justifyContent: "center",
                  alignContent: "center",
                  display: "flex",
                }}
              >
                <Chart
                  options={chartOptions}
                  series={chartSeries(totalStorageUsed)}
                  type="radialBar"
                  width="450"
                />
              </Box>
            </Box>
            <Card
              sx={{
                padding: "10px",
                background: "#f7f5fa",
                width: "100%",
                minHeight: "150px",
                justifyContent: "center",
              }}
              component={Stack}
              spacing={1}
            >
              <Typography fontFamily="Outfit">
                <b>Legal Review</b>
              </Typography>
              <Typography>
                Ensure your terms of service agreements are legally sound.
              </Typography>
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
              >
                Learn more
              </Button>
            </Card>
          </Stack>
        </Grid>
      </Sidebar>
      <ToastContainer />
      <Backdrop open={backdrop} invisible={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Dashboard;
