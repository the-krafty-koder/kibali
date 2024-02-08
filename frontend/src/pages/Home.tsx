import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import * as styles from "./Home.css";
import { startButton as buttonStyle } from "./Navigation.css";
import Navigation from "./Navigation";
import Features from "./Features";

const Landing = () => {
  return (
    <div style={styles.topContainer}>
      <Navigation />
      <Grid container style={styles.descriptions}>
        <Grid item xs={6}>
          <Box style={styles.description}>
            <Typography variant="h2" style={styles.tagLine}>
              Terms Redefined, <br />
              Service Refined
            </Typography>
            <Typography style={styles.tagLine}>
              Unlock compliance barriers while empowering your business to
              thrive in a complex regulatory landscape.
            </Typography>
            <Button href="/signup" variant="contained" style={buttonStyle}>
              Get Started
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box style={styles.descriptionImage}></Box>
        </Grid>
      </Grid>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Landing />
      <Features />
    </>
  );
};

export default Home;
