import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import CanvassingVehicleCard from '../pure/CanvassingVehicleCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookContext from '../../context/contexts/BookContext';
import { useContext } from 'react';
import VehicleContext from '../../context/contexts/VehiclesContext';
import StockerRoomContext from '../../context/contexts/StockerRoomContext';
import StockerRoomCard from '../pure/StockerRoomCard';


const StockerRoomContainer = () => {

    const [roomsList, setRoomsList] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const {rooms, getRooms} = useContext(StockerRoomContext);

    useEffect(()=>{
      if(rooms.length === 0){
        getRooms();
      }
      console.log(rooms)
      setRoomsList(rooms); 
      setLoading(false);
    },[rooms])


    const {books, getBooks} = useContext(BookContext)

    useEffect(()=>{
      console.log(books)
    },[])

    const handleRoom = (room) => {
        navigate('/editroom', {
            state: room
        })
    }

    if (loading) {return (
        <div>LOADINGGGGG</div>
    )}  
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
              Stocker Rooms
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {roomsList.map((room, index) => (
                <StockerRoomCard key={index} room={room} handleRoom={handleRoom}></StockerRoomCard>
            ))}
          </Grid>
        </Container>
      </main>  
  )
}

export default StockerRoomContainer; 