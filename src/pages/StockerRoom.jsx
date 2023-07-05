import React from 'react';
import StockerRoomContainer from '../components/container/StockerRoomContainer';
import AppBarComponent from '../components/container/AppBarComponent';

function StockerRoom() {
  return (
    <AppBarComponent prop={<StockerRoomContainer/>}/>
  );
}

export default StockerRoom;
