import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import logo from "../assets/spotify_logo.png";
import { useParams } from "react-router-dom";
import "./DisplayTos.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const DisplayTos = () => {
  const { termsOfServiceName } = useParams();

  return (
    <div style={{ position: "relative" }}>
      <Stack className="topHeader" direction="row">
        <Box className="organizationLogo">
          <img
            src={
              "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen-1920x706.jpg"
            }
          />
        </Box>
      </Stack>
      <Grid container className="tosContentWrapper">
        <Grid item xs={2} />

        <Grid className="tosContent" item xs={7}>
          <Typography sx={{ color: "rgb(0, 0, 0, 0.5)", marginBottom: "10px" }}>
            Last updated: <span>4/5/2023</span>
          </Typography>

          <Typography variant="h4" marginBottom="50px" fontFamily="Outfit">
            <b>{termsOfServiceName}</b>
          </Typography>
          <Typography className="textContent">
            As a consumer who resides in the EEA you can access the European
            Commission’s online dispute resolution platform here:
            https://ec.europa.eu/consumers/odr. Please note that Airbnb is not
            committed nor obliged to use an alternative dispute resolution
            entity within the meaning of Directive 2013/11 EU to resolve
            disputes with consumers. The European Commission’s online dispute
            resolution platform is not available for residents of Switzerland or
            the United Kingdom. Section 25 of these Terms contains an
            arbitration agreement and class action waiver that applies to all
            claims brought against Airbnb in the United States.Please read them
            carefully. Last Updated: 25 January 2024 Thank you for using Airbnb!
            <br />
            <br />
            These Terms of Service for European Users (“Terms”) are a binding
            legal agreement between you and Airbnb that govern your right to use
            the websites, applications, and other offerings from Airbnb
            (collectively, the “Airbnb Platform”). When used in these Terms,
            “Airbnb,” “we,” “us,” or “our” refers to the Airbnb entity set out
            on Schedule 1 with whom you are contracting. The Airbnb Platform
            offers an online venue that enables users (“Members”) to publish,
            offer, search for, and book services. Members who publish and offer
            services are “Hosts” and Members who search for, book, or use
            services are “Guests.” Hosts offer accommodations
            (“Accommodations”), activities, excursions and events
            (“Experiences”), and a variety of travel and other services
            (collectively, “Host Services,” and each Host Service offering, a
            “Listing”). As the provider of the Airbnb Platform, Airbnb does not
            own, control, offer or manage any Listings, Host Services, or
            tourism services.
            <br /> <br />
            Airbnb is not a party to the contracts entered into directly between
            Hosts and Guests, nor is Airbnb a real estate broker, travel agency,
            insurer or an organiser or retailer of travel packages under
            Directive (EU) 2015/2302. Airbnb is not acting as an agent in any
            capacity for any Member, except as specified in the Payments Terms
            of Service (“Payment Terms”). To learn more about Airbnb’s role see
            Section 17. We maintain other terms and policies that supplement
            these Terms like our Privacy Policy, which describes our collection
            and use of personal data, and our Payments Terms, which govern any
            payment services provided to Members by the Airbnb payment entities
            (collectively "Airbnb Payments").
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
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
            Kibali{" "}
          </Link>
        </Stack>

        {/* <Box className="hostLogo">
          <Typography color="white">Powered By: </Typography>
          <img
            src={
              "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen-1920x706.jpg"
            }
          />
        </Box> */}
      </Stack>
    </div>
  );
};

export default DisplayTos;
