import React from 'react';
import AppBarComponent from '../components/container/AppBarComponent';
import CanvassingVehicleListContainer from '../components/container/CanvassingVehicleListContainer';

function CanvassingVehiclesListPage() {
  return (
    <AppBarComponent prop={<CanvassingVehicleListContainer/>}></AppBarComponent>
  );
}

export default CanvassingVehiclesListPage;
