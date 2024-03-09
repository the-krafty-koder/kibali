import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import logo from "../assets/spotify_logo.png";
import { useParams } from "react-router-dom";
import "./DisplayTos.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import useStore from "../store/store";
import { format } from "date-fns";
import pdfToText from "react-pdftotext";
import { useEffect, useState } from "react";
import { TermsOfService } from "./types";

function render_page(pageData: any) {
  let render_options = {
    normalizeWhitespace: false,
    disableCombineTextItems: false,
  };

  return pageData.getTextContent(render_options);
}

const DisplayTos = () => {
  const [backdrop, setBackdrop] = useState<boolean>(true);
  // const [textContent, setTextContent] = useState({});
  const { termsOfServiceName, orgName } = useParams();

  const [termsOfService, setTermsOfService] = useState<TermsOfService>();

  const latestVersion = termsOfService?.versions.at(0);

  useEffect(() => {
    const fetchTos = async () => {
      const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service/${termsOfServiceName}`;
      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const termsOfServices = await response.json();
        setTermsOfService(termsOfServices);
      }
    };
    fetchTos();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Stack className="topHeader" direction="row">
        <Box className="displayLogo">
          <img src={termsOfService?.organization?.logoUrl} />
        </Box>
      </Stack>
      {termsOfService && (
        <Grid container className="tosContentWrapper">
          <Grid item xs={2} />

          <Grid className="tosContent" item xs={9}>
            <Typography
              sx={{ color: "rgb(0, 0, 0, 0.5)", marginBottom: "10px" }}
            >
              Last updated:{" "}
              <span> {format(termsOfService.createdAt, "do MMMM yyyy")}</span>
            </Typography>

            <Typography variant="h4" marginBottom="50px" fontFamily="Outfit">
              <b>{termsOfService.name}</b>
            </Typography>
            <iframe
              src={latestVersion?.shareUrl}
              height="800"
              width="100%"
              onLoad={() => setBackdrop(false)}
            />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      )}

      <Stack
        className="bottomFooter"
        direction="row"
        alignItems="center"
        paddingRight={20}
      >
        <Stack
          spacing={1}
          direction="row"
          sx={{ marginLeft: "auto" }}
          alignItems="center"
        >
          <Typography variant="subtitle2">Powered by </Typography>
          <ClearAllIcon fontSize="large" sx={{ color: "#350182" }} />
          <Link href="/" color="#350182" underline="hover">
            {" "}
            lilac{" "}
          </Link>
        </Stack>
      </Stack>
      <Backdrop open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default DisplayTos;
