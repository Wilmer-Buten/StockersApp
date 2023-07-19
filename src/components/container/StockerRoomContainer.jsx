import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import StockerRoomContext from '../../context/contexts/StockerRoomContext';
import StockerRoomCard from '../pure/StockerRoomCard';
import AppSkeleton from '../pure/loadings/AppSkeleton';


const StockerRoomContainer = () => {

    const [roomsList, setRoomsList] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const {rooms, getRooms} = useContext(StockerRoomContext);

    useEffect(()=>{
      if(rooms.length === 0){
        getRooms();
      }
      setRoomsList(rooms); 
      setLoading(false);
    },[rooms])

    
    const handleRoom = (room) => {
        navigate('/editroom', {
            state: room
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
              Stocker Rooms
            </Typography>
          </Container>
        </Box>
       {loading ? 
       <AppSkeleton/> :
       <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {roomsList.map((room, index) => (
                <StockerRoomCard key={index} room={room} handleRoom={handleRoom}></StockerRoomCard>
            ))}
          </Grid>
        </Container>}
      </main>  
  )
}

export default StockerRoomContainer; 