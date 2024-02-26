import { Grid, Stack, Typography } from "@mui/material";
import Sidebar from "../ui/Sidebar/Sidebar";
import TosThumbnail from "../ui/TosThumbnail/TosThumbnail";
import useStore from "../store/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

const TermsOfServiceList = () => {
  const { termsOfServices, fetchOrganization, fetchTermsOfService } = useStore(
    useShallow((state) => ({
      organization: state.organization,
      termsOfServices: state.termsOfServices,
      fetchOrganization: state.fetchOrganization,
      fetchTermsOfService: state.fetchTermsOfService,
      credentials: state.credentials,
    }))
  );

  useEffect(() => {
    fetchTermsOfService();
  }, []);

  return (
    <Sidebar>
      <Typography variant="h5">My Terms of Service</Typography>
      <Typography className="created">
        {" "}
        {termsOfServices.length} Terms of Service{" "}
      </Typography>
      <Grid container spacing={5} marginTop={1}>
        {termsOfServices.map((termsOfService) => (
          <Grid item>
            <TosThumbnail
              termsOfService={termsOfService}
              setTerms={fetchTermsOfService}
              link={`/app/terms-of-service/${termsOfService.id}`}
            />
          </Grid>
        ))}
      </Grid>
    </Sidebar>
  );
};

export default TermsOfServiceList;
