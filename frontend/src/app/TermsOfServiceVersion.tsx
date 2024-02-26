import {
  Box,
  Breadcrumbs,
  Button,
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
import useStore from "../store/store";
import { useShallow } from "zustand/react/shallow";

const TermsOfServiceVersionDetails = () => {
  const { tosId, versionId } = useParams();

  const navigate = useNavigate();

  const { termsOfServices } = useStore(
    useShallow((state) => ({
      termsOfServices: state.termsOfServices,
    }))
  );

  const version = termsOfServices
    .find((termsOfService) => termsOfService.id === parseInt(tosId!))
    ?.versions.find(
      (version) => version.versionNumber === parseInt(versionId!)
    );

  return (
    <Sidebar>
      <Stack spacing={3}>
        <Breadcrumbs>
          <Link
            underline="hover"
            href="/app/terms-of-service"
            sx={{ color: "rgba(53, 1, 130, .7)" }}
          >
            {" "}
            Terms of Service{" "}
          </Link>
          <Link
            underline="hover"
            onClick={() => navigate(-1)}
            sx={{ cursor: "pointer", color: "rgba(53, 1, 130, .7)" }}
          >
            {" "}
            Versions{" "}
          </Link>
          <Typography>Version {version?.versionNumber}</Typography>
        </Breadcrumbs>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">
            <b>Version {version?.versionNumber}</b>
          </Typography>
        </Stack>

        <Box>
          <Tabs>
            <Tab label="Document"></Tab>
          </Tabs>
          <iframe src={version?.shareUrl} height="800" width="100%" />
        </Box>
      </Stack>
    </Sidebar>
  );
};

export default TermsOfServiceVersionDetails;
