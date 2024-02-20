import {
  Box,
  Breadcrumbs,
  Link,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  Typography,
} from "@mui/material";
import Sidebar from "../ui/Sidebar/Sidebar";
import { TermsOfService } from "./types";
import { useState } from "react";
import DocumentList from "../ui/DocumentList/DocumentList";
import { useParams } from "react-router-dom";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { styled } from "@mui/material/styles";

const StyledToggle = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "#350182",
    color: "white",
  },
});

const TermsOfServiceDetails = () => {
  const { tosId } = useParams();
  const tos = {
    name: "Terms of Service Final Version",
    createdAt: "12 years ago",
    versions: [
      {
        id: "12345566",
        versionNumber: 1,
        storagePath: "/path1",
        url: "https:boto/path1",
      },
      {
        id: "12345900",
        versionNumber: 2,
        storagePath: "/path1",
        url: "https:boto/path1",
      },
    ],
    active: true,
    description:
      "Terms of service are the legal agreements between a service provider and a person who wants to use that service",
  };
  const url = window.location.href;

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [activeSelected, setActiveSelected] = useState(false);

  const handleChange = (event: any, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Sidebar>
      <Stack spacing={3} sx={{ "&.Mui-selected": {} }}>
        <Breadcrumbs>
          <Link underline="hover" href="/app/terms-of-service">
            {" "}
            Terms of Service{" "}
          </Link>
          <Typography>{tos.name}</Typography>
        </Breadcrumbs>
        <Typography variant="h5">
          <b>{tos.name}</b>
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography>{tos.description}</Typography>
          <StyledToggle
            value="check"
            selected={activeSelected}
            onChange={() => setActiveSelected(!activeSelected)}
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

        <Box>
          <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="Document"></Tab>
            <Tab label="Versions"></Tab>
          </Tabs>
          {tabIndex === 0 && (
            <iframe
              src={
                "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
              }
              height="800"
              width="100%"
              style={{ marginTop: "20px" }}
            />
          )}
          {tabIndex === 1 && (
            <div>
              {tos.versions.map((version) => (
                <DocumentList
                  key={version.id}
                  link={`${url}/versions/${version.versionNumber}`}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      {version.versionNumber}
                    </Typography>
                    <Typography className="date">{version.url}</Typography>
                  </Stack>
                </DocumentList>
              ))}
            </div>
          )}
        </Box>
      </Stack>
    </Sidebar>
  );
};

export default TermsOfServiceDetails;
