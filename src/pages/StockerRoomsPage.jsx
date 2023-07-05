import React from 'react';
import AppBarComponent from '../components/container/AppBarComponent';
import StockerRoomContainer from '../components/container/StockerRoomContainer';

function StockerRoomsPage() {
  return (
    <AppBarComponent prop={<StockerRoomContainer/>}></AppBarComponent>
  );
}

export default StockerRoomsPage;
