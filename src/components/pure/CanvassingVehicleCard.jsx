import { Grid, Card, CardMedia,CardContent, Typography} from '@mui/material';

function CanvassingVehicleCard({vehicle, handleVehicle}) {

    
  return (
    <Grid item xs={12} sm={6} md={4}>
    <Card
      onClick={() => handleVehicle(vehicle)}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      style={{cursor: 'pointer'}} 
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: '56.25%',
        }}
        image="https://source.unsplash.com/random?wallpapers"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {vehicle.vehicle_name}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  );
}

export default CanvassingVehicleCard;
