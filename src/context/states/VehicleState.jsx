import { useReducer } from "react";
import BookContext from "../contexts/BookContext";
import { GET_BOOKS } from "../types/bookTypes";
import BookReducer from "../reducers/BookReducer";
import VehicleReducer from "../reducers/VehicleReducer";
import { GET_VEHICLES } from "../types/vehiclesTypes";
import VehicleContext from "../contexts/VehiclesContext";

function VehicleState(props) {
  const initialState = {
    vehiclesList: []
  };

  const [state, dispatch] = useReducer(VehicleReducer, initialState);

  const fetchVehicles = async () => {
    const res = await fetch('http://localhost:4000/vehicles') 
    const vehicles = await res.json();
    return vehicles
}
  const getVehicles = async () => {
        
    const vehicles = await fetchVehicles();
    dispatch({
        type: GET_VEHICLES,
        payload: vehicles
    });
    return vehicles
};

  return (
    <VehicleContext.Provider
      value={{
        vehicles: state.vehiclesList,
        getVehicles
      }}
    >
      {props.children}
    </VehicleContext.Provider>
  );
}

export default VehicleState;