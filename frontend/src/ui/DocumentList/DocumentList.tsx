import {
  Stack,
  Typography,
  Chip,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import { TermsOfService } from "../../app/types";
import ArticleSharpIcon from "@mui/icons-material/ArticleSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./DocumentList.css";

interface Props {
  termsOfService: TermsOfService;
}

const DocumentList = ({ termsOfService }: Props) => {
  return (
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
        <Stack spacing={1}>
          <Typography variant="subtitle1">{termsOfService.name}</Typography>
          <Typography className="date">{termsOfService.createdAt}</Typography>
        </Stack>
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
  );
};

export default DocumentList;
