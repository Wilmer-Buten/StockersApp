import React from 'react';
import { GET_VEHICLES } from '../types/vehiclesTypes';

function VehicleReducer(state, action) {
  
  const {type, payload} = action;

  switch(type){
    case GET_VEHICLES: 
    return {
        ...state,
        vehiclesList: payload
    }
    default: 
    return state;
  }
}

export default VehicleReducer;
