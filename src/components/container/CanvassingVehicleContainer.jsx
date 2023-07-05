import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CanvassingVehicleCard from '../pure/CanvassingVehicleCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookContext from '../../context/contexts/BookContext';
import { useContext } from 'react';
import VehicleContext from '../../context/contexts/VehiclesContext';
import AppSkeleton from '../pure/loadings/AppSkeleton';


const CanvassingVehicleContainer = () => {

    const [vehiclesList, setVehiclesList] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const {vehicles, getVehicles} = useContext(VehicleContext);
    useEffect(()=>{
      if(vehicles.length === 0){
        getVehicles();
      }
      console.log(vehicles)
      setVehiclesList(vehicles); 
      setLoading(false);
    },[vehicles])


    const {books, getBooks} = useContext(BookContext)

    useEffect(()=>{
      console.log(books)
    },[])

    const handleVehicle = (vehicle) => {
        navigate('/editvehicle', {
            state: vehicle
        })
    }
 
    return (
     
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Canvassing Vehicles
            </Typography>
          </Container>
        </Box>
       {loading ? <AppSkeleton/>
       :  <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {vehiclesList.map((vehicle, index) => (
                <CanvassingVehicleCard key={index} vehicle={vehicle} handleVehicle={handleVehicle}></CanvassingVehicleCard>
            ))}
          </Grid>
        </Container>}
      </main>  
  )
}

export default CanvassingVehicleContainer; 