import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import * as styles from "./Home.css";
import { startButton as buttonStyle } from "./Navigation.css";
import Navigation from "./Navigation";
import Features from "./Features";
import appScreenshot from "../assets/app_screenshot_2.png";
import line from "../assets/line.jpg";

const Landing = () => {
  return (
    <div style={styles.topContainer}>
      <Stack spacing={15}>
        <Navigation />
        <Grid container style={styles.descriptions}>
          <Grid item xs={6} style={{ height: "71vh" }}>
            <Box style={styles.description}>
              <Typography
                variant="h2"
                style={styles.tagLine}
                fontWeight="450"
                color="rgb(0,0,0,.9)"
              >
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
            <Box
              style={{
                ...styles.descriptionImage,
                // backgroundImage: `url(${process.env.PUBLIC_URL + "/line.jpg"})`,
              }}
            >
              <img
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                src={appScreenshot}
              />
            </Box>
          </Grid>
        </Grid>
      </Stack>
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
