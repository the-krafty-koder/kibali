import Note from "../ui/Note/Note";
import "./Features.css";
import { Chip, Grid, Stack, Typography } from "@mui/material";

const Features = () => {
  return (
    <Stack direction="column" className="featuresContainer">
      <Stack className="header" spacing={4}>
        <Chip
          className="chip"
          label="Features"
          variant="filled"
          sx={{
            backgroundColor: "#350182",
            color: "#f4f2f7",
          }}
        />
        <Typography variant="h4">
          The ultimate sidekick <br />
          for streamlined terms of service <br />
          management
        </Typography>
      </Stack>
      <Grid container spacing={15}>
        <Grid item xs={4}>
          <Note
            index={1}
            title="Hosting"
            description="Our user-friendly interface streamlines the entire process, allowing you to  create, edit, and store your terms of service documents with ease."
          ></Note>
        </Grid>
        <Grid item xs={4}>
          <Note
            index={2}
            title="Version Control"
            description="Easily compare different versions, revert to previous iterations, and maintain a detailed audit trail of all modifications for enhanced transparency."
          ></Note>
        </Grid>
        <Grid item xs={4}>
          <Note
            index={3}
            title="Email Notifications"
            description="Keep your customers informed and engaged  whenever there's a change, update, or revision to your terms of service."
          ></Note>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Features;
