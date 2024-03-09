import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import tosImage from "../../assets/tosImage.png";
import "./TosThumbnail.css";
import { TermsOfService } from "../../app/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { format } from "date-fns";
import { useState } from "react";
import useStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";

interface Props {
  termsOfService: TermsOfService;
  link: string;
  onDelete: () => void;
}
const TosThumbnail = ({ termsOfService, link, onDelete }: Props) => {
  const { credentials } = useStore(
    useShallow((state) => ({
      credentials: state.credentials,
    }))
  );

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [tos, setTos] = useState<TermsOfService>(termsOfService);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editValues, setEditValues] = useState<{
    name: string;
    description: string;
  }>({
    name: tos.name,
    description: tos.description,
  });

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    setAnchorEl(null);
    setOpenEditModal(true);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    setOpenDeleteModal(true);
  };

  const editTermsOfService = async () => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service/${tos.slug}`;
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Token ${credentials.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...editValues,
        organizationId: tos.organization?.id,
      }),
    });
    if (response.status === 200) {
      const newTos = await response.json();

      setTos(newTos);
    }

    setOpenEditModal(false);
  };

  const deleteTermsOfService = async () => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service/${tos.slug}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${credentials.token}`,
        "Content-Type": "application/json",
      },
    });
    onDelete();
    setOpenDeleteModal(false);
  };

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
          marginRight="auto"
          spacing={1}
        >
          <span className="created">
            Created : {format(tos.createdAt, "d-MM-yyyy")}
          </span>
          <Chip
            size="small"
            label={tos.active ? "Live" : "Inactive"}
            color={tos.active ? "success" : "default"}
          />
          <IconButton onClick={handleClick}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete} disabled>
              Delete
            </MenuItem>
          </Menu>
          <Modal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            className="uploadForm"
          >
            <Card className="uploadCard">
              <form>
                <Stack spacing={2}>
                  <Typography variant="h5">Edit a terms of service</Typography>
                  <TextField
                    label="Name"
                    value={editValues?.name}
                    onChange={({ target: { value } }) =>
                      setEditValues({ ...editValues!, name: value })
                    }
                  />
                  <TextField
                    multiline
                    maxRows={7}
                    label="Description"
                    value={editValues?.description}
                    onChange={({ target: { value } }) =>
                      setEditValues({ ...editValues!, description: value })
                    }
                  />

                  <br />
                  <Button
                    variant="contained"
                    sx={{
                      background: "#350182",
                      color: "white",
                      width: "25%",
                      ":hover": {
                        background: "inherit",
                        border: " solid #350182",
                        color: "#350182",
                      },
                    }}
                    onClick={editTermsOfService}
                  >
                    Save
                  </Button>
                </Stack>
              </form>
            </Card>
          </Modal>
          <Modal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            className="uploadForm"
          >
            <Card className="uploadCard">
              <form>
                <Stack spacing={4}>
                  <Typography variant="h5">
                    Are you sure you want to delete?
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={deleteTermsOfService}
                    fullWidth={false}
                  >
                    Delete
                  </Button>
                </Stack>
              </form>
            </Card>
          </Modal>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TosThumbnail;
