import {
  Box,
  Breadcrumbs,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Sidebar from "../ui/Sidebar/Sidebar";
import { TermsOfService, TermsOfServiceVersion } from "./types";
import { useState } from "react";
import DocumentList from "../ui/DocumentList/DocumentList";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  version: TermsOfServiceVersion;
}

const TermsOfServiceVersionDetails = () => {
  const { tosId, versionId } = useParams();
  const navigate = useNavigate();

  const { versionNumber, url } = {
    versionNumber: 2,
    url: "https:boto/path1",
  };
  return (
    <Sidebar>
      <Stack spacing={3}>
        <Breadcrumbs>
          <Link underline="hover" href="/app/terms-of-service">
            {" "}
            Terms of Service{" "}
          </Link>
          <Link
            underline="hover"
            onClick={() => navigate(-1)}
            sx={{ cursor: "pointer" }}
          >
            {" "}
            Versions{" "}
          </Link>
          <Typography>Version {versionNumber}</Typography>
        </Breadcrumbs>
        <Typography variant="h5">
          <b>Version {versionNumber}</b>
        </Typography>
        <Box>
          <Tabs>
            <Tab label="Document"></Tab>
          </Tabs>
          <iframe
            src={
              "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
            }
            height="800"
            width="100%"
            style={{ marginTop: "20px" }}
          />
        </Box>
      </Stack>
    </Sidebar>
  );
};

export default TermsOfServiceVersionDetails;
