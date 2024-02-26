import {
  Backdrop,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  CircularProgress,
  Grid,
  Link,
  Modal,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import Sidebar from "../ui/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DocumentList from "../ui/DocumentList/DocumentList";
import { useParams } from "react-router-dom";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { styled } from "@mui/material/styles";
import useStore from "../store/store";
import { useShallow } from "zustand/react/shallow";
import { format } from "date-fns";
import { z } from "zod";
import { MAX_FILE_SIZE } from "./Dashboard/Dashboard";

const StyledToggle = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "#350182",
    color: "white",
  },
});

const UploadFileSchema = z.object({
  file: z
    .instanceof(File, { message: "A file has to be chosen" })
    .refine((file) => {
      return file.size >= MAX_FILE_SIZE;
    }, `File size should be less than 5MB.`),
});

const TermsOfServiceDetails = () => {
  const { tosId } = useParams();
  const url = window.location.href;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [uploadValues, setUploadValues] = useState<{
    file: File;
  }>();
  const [uploadErrors, setUploadErrors] = useState<{
    name?: string[];
    description?: string[];
    file?: string[];
  }>();
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const { termsOfServices, fetchTermsOfService, credentials } = useStore(
    useShallow((state) => ({
      termsOfServices: state.termsOfServices,
      fetchTermsOfService: state.fetchTermsOfService,
      credentials: state.credentials,
    }))
  );

  const termsOfService = termsOfServices.find(
    (tos) => tos.id === parseInt(tosId!)
  );

  const latestTermsOfServiceVersion = termsOfService?.versions.at(0);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [activeSelected, setActiveSelected] = useState(termsOfService?.active);

  useEffect(() => {
    if (backdrop === false) {
      fetchTermsOfService();
    }
  }, [backdrop]);

  const handleChange = (event: any, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const addTermsOfServiceVersion = () => {
    const validation = UploadFileSchema.safeParse(uploadValues);
    if (!validation.success) {
      setUploadErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setOpenAddModal(false);
    setBackdrop(true);
    const uploadEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service/${termsOfService?.organization?.id}/upload`;
    const formData = new FormData();

    formData.append("name", termsOfService?.name!);
    formData.append("description", termsOfService?.description!);
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

  const deleteTermsOfServiceVersion = async (versionId: number) => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service-version/${versionId}`;
    await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${credentials.token}`,
        "Content-Type": "application/json",
      },
    });
    fetchTermsOfService();
    setOpenDeleteModal(false);
  };

  const toggleLive = async (active: boolean) => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service/${termsOfService?.id}`;

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Token ${credentials.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active,
        name: termsOfService?.name,
        organizationId: termsOfService?.organization?.id,
      }),
    });

    fetchTermsOfService();
  };

  return (
    <Sidebar>
      <Stack spacing={3}>
        <Breadcrumbs sx={{ color: "rgba(53, 1, 130, .7)" }}>
          <Link
            underline="hover"
            href="/app/terms-of-service"
            sx={{ cursor: "pointer", color: "rgba(53, 1, 130, .7)" }}
          >
            {" "}
            Terms of Service{" "}
          </Link>
          <Typography>{termsOfService?.name}</Typography>
        </Breadcrumbs>
        <Typography variant="h5">
          <b>{termsOfService?.name}</b>
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid item xs={9}>
            <Typography>{termsOfService?.description}</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => setOpenAddModal(true)}
                sx={{
                  background: "#350182",
                  color: "white",
                  ":hover": {
                    background: "inherit",
                    border: "2px solid #350182",
                    color: "#350182",
                  },
                }}
              >
                {" "}
                Add version{" "}
              </Button>
              <Modal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                className="uploadForm"
              >
                <Card className="uploadCard">
                  <form>
                    <Stack spacing={2}>
                      <Typography variant="h5">
                        Upload a terms of service file (pdf)
                      </Typography>

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
                        onClick={addTermsOfServiceVersion}
                      >
                        Upload
                      </Button>
                    </Stack>
                  </form>
                </Card>
              </Modal>
              <StyledToggle
                value="check"
                selected={activeSelected}
                onChange={() => {
                  setActiveSelected(!activeSelected);
                  toggleLive(!activeSelected);
                }}
                size="small"
              >
                <Typography variant="caption" sx={{ mr: 1 }}>
                  {" "}
                  Live
                </Typography>{" "}
                {activeSelected ? (
                  <ToggleOnIcon sx={{ color: "white" }} />
                ) : (
                  <ToggleOffIcon />
                )}
              </StyledToggle>
            </Stack>
          </Grid>
        </Grid>

        <Box>
          <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="Document"></Tab>
            <Tab label="Versions"></Tab>
          </Tabs>
          {tabIndex === 0 && (
            <iframe
              src={latestTermsOfServiceVersion?.shareUrl}
              height="800"
              width="100%"
            />
          )}
          {tabIndex === 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "flex",
                justifyContent: "center",
              }}
            >
              <Box width="70%" marginTop="30px">
                {termsOfService?.versions.map((version) => (
                  <DocumentList
                    key={version.id}
                    link={`${url}/versions/${version.versionNumber}`}
                    firstAction={
                      latestTermsOfServiceVersion?.id === version.id && (
                        <Chip
                          label="Version to display"
                          sx={{ background: "rgba(255, 236, 228, .7)" }}
                        />
                      )
                    }
                    secondAction={
                      <>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={(event) => {
                            event.preventDefault();
                            setOpenDeleteModal(true);
                          }}
                        >
                          Delete
                        </Button>
                        <Modal
                          open={openDeleteModal}
                          onClose={() => setOpenDeleteModal(false)}
                          className="uploadForm"
                        >
                          <Card className="uploadCard">
                            <form>
                              <Stack spacing={4}>
                                <Typography variant="h5">
                                  Are you sure you want to delete?
                                </Typography>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    deleteTermsOfServiceVersion(version?.id!)
                                  }
                                  fullWidth={false}
                                >
                                  Delete
                                </Button>
                              </Stack>
                            </form>
                          </Card>
                        </Modal>
                      </>
                    }
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">
                        Version {version.versionNumber}
                      </Typography>
                      <Typography className="date">
                        {" "}
                        {format(version.createdAt, "do MMMM yyyy")}
                      </Typography>
                    </Stack>
                  </DocumentList>
                ))}
              </Box>
            </div>
          )}
        </Box>
        <ToastContainer />
        <Backdrop open={backdrop} invisible={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Stack>
    </Sidebar>
  );
};

export default TermsOfServiceDetails;
