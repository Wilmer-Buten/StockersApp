import React from 'react';
import AppBarComponent from '../components/container/AppBarComponent';
import StockerRoomComponent from '../components/container/StockerRoomComponent';

function StockerRoomsListPage() {
  return (
        <AppBarComponent prop={<StockerRoomComponent/>}></AppBarComponent>
  );
}

export default StockerRoomsListPage;
