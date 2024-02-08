import Sidebar from "../ui/Sidebar/Sidebar";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DocumentList from "../ui/DocumentList/DocumentList";
import { TermsOfService } from "./types";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

const Dashboard = () => {
  const [termsOfServices, setTermsOfServices] = useState<TermsOfService[]>([
    {
      name: "Website Terms of Service Final Version",
      createdAt: "March 10th - 5.35pm",
      versions: [
        {
          id: "12345566",
          versionNumber: 1,
          storagePath: "/path1",
          url: "https:boto/path1",
        },
      ],
    },
    {
      name: "Website Terms of Service First Draft",
      createdAt: "March 10th - 5.35pm",
      versions: [
        {
          id: "12345566",
          versionNumber: 1,
          storagePath: "/path1",
          url: "https:boto/path1",
        },
      ],
    },
    {
      name: "API Terms of Service Final",
      createdAt: "March 10th - 5.35pm",
      versions: [
        {
          id: "12345566",
          versionNumber: 1,
          storagePath: "/path1",
          url: "https:boto/path1",
        },
      ],
    },
    {
      name: "API Terms of Service Initial Draft",
      createdAt: "March 10th - 5.35pm",
      versions: [
        {
          id: "12345566",
          versionNumber: 1,
          storagePath: "/path1",
          url: "https:boto/path1",
        },
      ],
    },
  ]);
  console.log("tos", termsOfServices);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service`;
    const token = localStorage.getItem("kibaliToken");
    fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        setTermsOfServices(data);
      }
    });
  }, []);

  return (
    <Sidebar>
      <Grid container className="dashboard" spacing={5}>
        <Grid item xs={6}>
          <Typography
            component="div"
            className="headers"
            sx={{ fontFamily: "Montserrat", borderBottom: 0 }}
          >
            <b>UPLOAD</b>
          </Typography>
          <div className="uploadContainer">
            <Box
              className="upload"
              component={Button}
              sx={{
                background: "#350182",
                width: "60%",
                color: "white",
              }}
            >
              <Typography>Upload a terms of service file</Typography>
            </Box>
          </div>

          <Typography
            component="div"
            className="headers"
            sx={{ fontFamily: "Montserrat" }}
          >
            <b>TERMS OF SERVICE</b>
          </Typography>
          <div>
            {termsOfServices.map((termsOfService) => (
              <DocumentList
                key={termsOfService.name}
                termsOfService={termsOfService}
              />
            ))}
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
          <Box sx={{ background: "#FFECE4", minHeight: "70%", width: "100%" }}>
            <Typography
              component="div"
              className="analytics-header"
              sx={{ fontFamily: "Montserrat" }}
            >
              <b>ANALYTICS</b>
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={3}
            sx={{ minHeight: "20%" }}
            justifyContent="space-between"
          >
            <Card
              sx={{
                padding: "10px",
                background: "#F4F1F8",
                width: "50%",
              }}
            >
              <Stack className="share" spacing={2} direction="row">
                <ShareIcon fontSize="large" />
                <Typography component="div" sx={{ fontFamily: "Montserrat" }}>
                  <b>Share your TOS</b>
                </Typography>
              </Stack>
              <Stack className="socials" spacing={2} direction="row">
                <IconButton sx={{ color: "#350182" }}>
                  {" "}
                  <FacebookOutlinedIcon />
                </IconButton>
                <IconButton sx={{ color: "#350182" }}>
                  <XIcon />
                </IconButton>
                <IconButton sx={{ color: "#350182" }}>
                  <LanguageIcon />
                </IconButton>
              </Stack>
            </Card>
            <Card
              sx={{
                padding: "10px",
                background: "#E7D7FE",
                width: "50%",
              }}
            >
              <Typography variant="h6">Legal Review</Typography>
              <Typography>
                Ensure your terms of service agreements are legally sound.
              </Typography>
              <Button
                variant="contained"
                sx={{ background: "#350182", color: "white", marginTop: "2px" }}
              >
                Get Started
              </Button>
            </Card>
          </Stack>
        </Stack>
      </Grid>
    </Sidebar>
  );
};

export default Dashboard;
