import * as styles from "./Navigation.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Button, Stack, Typography } from "@mui/material";

const Navigation = () => {
  return (
    <Stack direction="row" style={styles.navBar}>
      <Stack direction="row" spacing={1}>
        <ClearAllIcon style={styles.logo} />
        <Typography style={styles.logoTitle}> Kibali </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button href="/login" color="inherit">
          Login
        </Button>
        <Button href="/signup" variant="contained" style={styles.startButton}>
          Get Started
        </Button>
      </Stack>
    </Stack>
  );
};

export default Navigation;
