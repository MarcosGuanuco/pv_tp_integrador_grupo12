import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Stack,
  Box,
  Avatar,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ClienteCard = ({ cliente, onVerDetalle }) => {
  return (
    <Card
        sx={{
      width: "210px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: 4,
      boxShadow: 3,
      minHeight: 240, 
      background: "linear-gradient(to right, #ffffff, #d4d3d3)",
       animation: "fadeIn 0.4s ease-in-out",
       "@keyframes fadeIn": {
        from: { opacity: 0, transform: "scale(0.95)" },to: { opacity: 1, transform: "scale(1)" },}
        }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          
          <Avatar
            src={`https://randomuser.me/api/portraits/men/${cliente.id % 100}.jpg`}
            sx={{ width: 56, height: 56}}
          />

          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {cliente.name?.firstname} {cliente.name?.lastname}
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={1.2}>

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
            <Typography variant="body2">
              {cliente.address?.city}
            </Typography>
          </Stack>

        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onVerDetalle(cliente.id)}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            background:"#2c4766",
             transition: "0.5s",
             "&:hover": {transform: "scale(1.02)",filter: "brightness(1.1)",}
          }}>
          Ver ficha
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClienteCard;