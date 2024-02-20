import {
  Box,
  Button,
  Card,
  Stack,
  Step,
  StepIcon,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Sidebar from "../ui/Sidebar/Sidebar";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import "./Share.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DocumentList from "../ui/DocumentList/DocumentList";

const Share = () => {
  const termsOfServices = [
    {
      id: 1,
      name: "Website Terms of Service Final Version",
      createdAt: "March 10th - 5.35pm",
      versions: [
        {
          id: 1,
          versionNumber: 1,
          storagePath: "/path1",
          url: "https:boto/path1",
        },
      ],
    },
    {
      id: 2,
      name: "Website Terms of Service First Draft",
      createdAt: "March 10th - 5.35pm",
      versions: [
        {
          id: 1,
          versionNumber: 1,
          storagePath: "/path1",
          url: "https:boto/path1",
        },
      ],
    },
    {
      id: 3,
      name: "API Terms of Service Final",
      createdAt: "March 10th - 5.35pm",
      versions: [
        {
          id: 1,
          versionNumber: 1,
          storagePath: "/path1",
          url: "https:boto/path1",
        },
      ],
    },
    {
      id: 4,
      name: "API Terms of Service Initial Draft",
      createdAt: "March 10th - 5.35pm",
      versions: [
        {
          id: 1,
          versionNumber: 1,
          storagePath: "/path1",
          url: "https:boto/path1",
        },
      ],
    },
  ];
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
              const background = index % 2 == 0 ? "rgba(255, 236, 228, .4)" : "inherit";
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
                        href={`/orgName/${termsOfService.name}`}
                      >
                        {" "}
                        Preview
                      </Button>
                    }
                    secondAction={
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
                      >
                        {" "}
                        Generate url
                      </Button>
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
