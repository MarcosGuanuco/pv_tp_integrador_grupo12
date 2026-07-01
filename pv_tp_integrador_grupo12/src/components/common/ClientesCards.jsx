import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";

const ClienteCard = ({ cliente, onVerDetalle }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
  📧 {cliente.email}
</Typography>

<Typography variant="body2" sx={{ color: "text.secondary" }}>
  📞 {cliente.phone}
</Typography>

<Typography variant="body2" sx={{ color: "text.secondary" }}>
  📍 {cliente.address?.city}
</Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => onVerDetalle(cliente.id)}
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClienteCard;