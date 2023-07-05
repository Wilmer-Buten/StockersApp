import React from 'react';
import CanvassingVehicleContainer from '../components/container/CanvassingVehicleContainer';
import AppBarComponent from '../components/container/AppBarComponent';

function CanvassingVehicle() {
  return (
    <div>
      <AppBarComponent prop={<CanvassingVehicleContainer/>}/>
    </div>
  );
}

export default CanvassingVehicle;
