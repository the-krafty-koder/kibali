import * as styles from "./Navigation.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Button, Stack, Typography } from "@mui/material";

const Navigation = () => {
  return (
    <Stack direction="row" style={styles.navBar}>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        display="flex"
        alignItems="center"
        sx={{ background: "white", padding: "15px" }}
      >
        <ClearAllIcon style={styles.logo} />
        <Typography style={styles.logoTitle} variant="h5" fontFamily="Outfit">
          {" "}
          lilac{" "}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          href="/login"
          size="large"
          sx={{ borderColor: "#350182", color: "#350182" }}
        >
          Login
        </Button>
        <Button
          href="/signup"
          variant="contained"
          style={styles.startButton}
          size="large"
        >
          Get Started
        </Button>
      </Stack>
    </Stack>
  );
};

export default Navigation;
