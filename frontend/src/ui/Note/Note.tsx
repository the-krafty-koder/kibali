import { Box, Stack, Typography } from "@mui/material";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import "./Note.css";

interface Props {
  index: number;
  title: string;
  description: string;
}

const Note = ({ index, title, description }: Props) => {
  return (
    <Stack className="boxContainer" spacing={1}>
      <Stack direction="column" spacing={6}>
        <Typography className="index">{`0${index}.`}</Typography>
        <OfflineBoltOutlinedIcon
          sx={{
            color: "#350182",
          }}
        />
      </Stack>
      <Stack spacing={1} className="descriptionContainer">
        <Typography variant="subtitle1">
          <b>{title}</b>
        </Typography>
        <Typography className="description">{description}</Typography>
      </Stack>
    </Stack>
  );
};

export default Note;
