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
  firstAction?: ReactNode;
  secondAction?: ReactNode;
}

const DocumentList = ({ children, link, firstAction, secondAction }: Props) => {
  return (
    <Box component={Link} href={link} underline="none" color="black">
      <Grid container className="documentList">
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
          {firstAction}
        </Grid>
        <Grid item xs={2}>
          {secondAction}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentList;
