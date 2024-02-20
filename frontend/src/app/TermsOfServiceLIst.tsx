import { Grid, Stack, Typography } from "@mui/material";
import Sidebar from "../ui/Sidebar/Sidebar";
import TosThumbnail from "../ui/TosThumbnail/TosThumbnail";

const TermsOfServiceList = () => {
  const tos = {
    id: 1,
    name: "Terms of Service Final Version",
    createdAt: new Date(),
    versions: [
      {
        id: 1,
        versionNumber: 1,
        storagePath: "/path1",
        url: "https:boto/path1",
      },
    ],
    active: true,
    totalFileSize: 30,
  };

  return (
    <Sidebar>
      <Typography variant="h5">My Terms of Service</Typography>
      <Typography className="created"> 23 Terms of Service </Typography>
      <Grid container spacing={5} marginTop={1}>
        <Grid item>
          <TosThumbnail tos={tos} link="/app/terms-of-service/1" />
        </Grid>
        <Grid item>
          <TosThumbnail tos={tos} link="/app/terms-of-service/2" />
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default TermsOfServiceList;
