import {
  Box,
  Button,
  Card,
  Modal,
  Stack,
  Step,
  StepIcon,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "../ui/Sidebar/Sidebar";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import "./Share.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DocumentList from "../ui/DocumentList/DocumentList";
import { useShallow } from "zustand/react/shallow";
import useStore from "../store/store";
import { useState } from "react";

const Share = () => {
  const { termsOfServices, fetchTermsOfService, credentials } = useStore(
    useShallow((state) => ({
      termsOfServices: state.termsOfServices,
      fetchTermsOfService: state.fetchTermsOfService,
      credentials: state.credentials,
    }))
  );

  const [openShareModal, setOpenShareModal] = useState(false);

  return (
    <Sidebar>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        component={Stack}
        direction="column"
        spacing={7}
      >
        <Card
          className="shareWrapper"
          sx={{
            backgroundColor: "rgba(53, 1, 130, .8)",
            color: "white",
          }}
        >
          <Stepper
            activeStep={0}
            alternativeLabel
            sx={{
              width: "100%",
              "& .MuiStepLabel-label": {
                color: "white",
              },
            }}
          >
            <Step active={false}>
              <StepLabel>Upload</StepLabel>
            </Step>
            <Step>
              <StepLabel color="white">Preview</StepLabel>
            </Step>
            <Step>
              <StepLabel color="white">Share!</StepLabel>
            </Step>
          </Stepper>
        </Card>
        <Box width="70vw">
          <div>
            {termsOfServices.map((termsOfService, index) => {
              const background =
                index % 2 == 0 ? "rgba(255, 236, 228, .4)" : "inherit";

              const shareUrl = termsOfService.versions.at(0)?.shareUrl;
              const tosName = termsOfService.name
                .toLowerCase()
                .split(" ")
                .join("-");

              const orgName = termsOfService.organization?.user.firstName
                .toLowerCase()
                .split(" ")
                .join("-");

              return (
                <Box sx={{ background, paddingLeft: "10px" }}>
                  <DocumentList
                    key={termsOfService.name}
                    link={`/app/terms-of-service/${termsOfService.id}`}
                    firstAction={
                      <Button
                        variant="text"
                        sx={{
                          //   borderColor: "#350182",
                          color: "#350182",
                          //   ":hover": {
                          //     borderColor: "#350182",
                          //     color: "#350182",
                          //   },
                        }}
                        href={`view/${orgName}/${tosName}`}
                      >
                        {" "}
                        Preview
                      </Button>
                    }
                    secondAction={
                      <>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "#350182",
                            color: "#350182",
                            ":hover": {
                              borderColor: "#350182",
                              color: "#350182",
                            },
                          }}
                          onClick={(event) => {
                            event.preventDefault();
                            setOpenShareModal(true);
                          }}
                        >
                          {" "}
                          Share
                        </Button>
                        <Modal
                          open={openShareModal}
                          onClose={() => setOpenShareModal(false)}
                          className="uploadForm"
                        >
                          <Card className="uploadCard">
                            <form>
                              <Stack spacing={2}>
                                <Typography variant="h5" fontFamily="Outfit">
                                  Share Terms of Service
                                </Typography>
                                <Typography variant="subtitle2">
                                  Share your file on socials or embed on your
                                  site
                                </Typography>
                                <TextField value={shareUrl} />
                                <Box
                                  sx={{
                                    background: "black",
                                    color: "white",
                                    padding: "10px",
                                  }}
                                >
                                  <code>
                                    {`
                                    <iframe src=${shareUrl}/>

                                    `}
                                  </code>
                                </Box>
                              </Stack>
                            </form>
                          </Card>
                        </Modal>
                      </>
                    }
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">
                        {termsOfService.name}
                      </Typography>
                    </Stack>
                  </DocumentList>
                </Box>
              );
            })}
          </div>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default Share;
