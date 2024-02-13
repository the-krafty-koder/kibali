import {
  Stack,
  Typography,
  Chip,
  Button,
  IconButton,
  Grid,
  Box,
  Link,
} from "@mui/material";
import { TermsOfService, TermsOfServiceVersion } from "../../app/types";
import ArticleSharpIcon from "@mui/icons-material/ArticleSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./DocumentList.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  link: string;
}

const DocumentList = ({ children, link }: Props) => {
  return (
    <Box component={Link} href={link} underline="none">
      <Stack
        className="documentList"
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        component={Grid}
      >
        <Grid item xs={2}>
          <ArticleSharpIcon
            className="icon"
            fontSize="large"
            sx={{ color: "grey" }}
          />
        </Grid>
        <Grid item xs={6}>
          {children}
        </Grid>
        <Grid item xs={2}>
          <Chip label="33 MB" />
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            {" "}
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Stack>
    </Box>
  );
};

export default DocumentList;
