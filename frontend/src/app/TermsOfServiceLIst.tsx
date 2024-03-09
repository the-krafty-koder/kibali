import { Grid, Stack, Typography } from "@mui/material";
import Sidebar from "../ui/Sidebar/Sidebar";
import TosThumbnail from "../ui/TosThumbnail/TosThumbnail";
import useStore from "../store/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { TermsOfService } from "./types";
import { useNavigate } from "react-router-dom";

const TermsOfServiceList = () => {
  const {
    termsOfServices,
    fetchOrganization,
    setTermsOfServices,
    credentials,
    organization,
  } = useStore(
    useShallow((state) => ({
      organization: state.organization,
      termsOfServices: state.termsOfServices,
      fetchOrganization: state.fetchOrganization,
      setTermsOfServices: state.setTermsOfServices,
      credentials: state.credentials,
    }))
  );
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState<boolean>(false);

  const fetchTermsOfServices = async (
    token: string,
    organizationId: string
  ): Promise<TermsOfService[]> => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service/${organizationId}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const termsOfServices = await response.json();
      setTermsOfServices(termsOfServices);
      return termsOfServices;
    }
    return [];
  };

  useEffect(() => {
    if (deleted === false) {
      fetchTermsOfServices(credentials?.token!, organization?.id!);
      setDeleted(true);
    }
  }, [deleted]);

  return (
    <Sidebar>
      <Typography variant="h5">My Terms of Service</Typography>
      <Typography className="created">
        {" "}
        {termsOfServices.length} Terms of Service{" "}
      </Typography>
      <Grid container spacing={5} marginTop={1}>
        {termsOfServices.map((termsOfService, index) => (
          <Grid item>
            <TosThumbnail
              termsOfService={termsOfService}
              onDelete={async () => {
                // const newTos = tos.filter(
                //   (tos, ind) => tos.id !== termsOfService.id
                // );
                // console.log(newTos);
                // setTos(newTos);

                // const newTos = await fetchTermsOfServices(
                //   credentials?.token!,
                //   organization?.id!
                // );
                setDeleted(false);
              }}
              link={`/app/terms-of-service/${termsOfService.id}`}
            />
          </Grid>
        ))}
      </Grid>
    </Sidebar>
  );
};

export default TermsOfServiceList;
