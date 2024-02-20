import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import tosImage from "../../assets/tosImage.png";
import "./TosThumbnail.css";
import { TermsOfService } from "../../app/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { format } from "date-fns";

interface Props {
  tos: TermsOfService;
  link: string;
}
const TosThumbnail = ({ tos, link }: Props) => {
  return (
    <Card className="thumbnail">
      <CardActionArea href={link}>
        <CardContent className="content">
          <img src={tosImage} className="thumbnailImage" />
        </CardContent>
      </CardActionArea>
      <Stack className="details">
        <Typography variant="subtitle2">
          <b>{tos.name}</b>
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <span className="created">
            Created : {format(tos.createdAt, "do MMMM yyyy")}
          </span>
          <Chip
            size="small"
            label={tos.active ? "Active" : "Pending"}
            color={tos.active ? "success" : "default"}
          />
          <IconButton>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TosThumbnail;
