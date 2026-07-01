import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Stack
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ClienteCard = ({ cliente, onVerDetalle }) => {
  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ mb: 2, p: 2, borderRadius: 2, backgroundColor: "#c9e2fc",}}>
          <PersonIcon sx={{ fontSize: 32 }} color="action" />
          <Typography variant="subtitle1" fontWeight="bold">
            {cliente.name?.firstname} {cliente.name?.lastname}
            </Typography>
            </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <EmailIcon fontSize="small" color="primary" />
          <Typography variant="body2">{cliente.email}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <PhoneIcon fontSize="small" color="success" />
          <Typography variant="body2">{cliente.phone}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <LocationOnIcon fontSize="small" color="error" />
          <Typography variant="body2">{cliente.address?.city}</Typography>
        </Stack>

      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => onVerDetalle(cliente.id)}
        >
          Ver Ficha
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClienteCard;