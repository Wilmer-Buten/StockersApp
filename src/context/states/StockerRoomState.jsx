import { useReducer } from "react";
import StockerRoomReducer from "../reducers/StockerRoomReducer";
import { GET_ROOMS } from "../types/stockerRoomTypes";
import StockerRoomContext from "../contexts/StockerRoomContext";

function StockerRoomState(props) {
  const initialState = {
    roomsList: []
  };

  const [state, dispatch] = useReducer(StockerRoomReducer, initialState);

  const fetchRooms = async () => {
    const res = await fetch('http://localhost:4000/stockerrooms') 
    const rooms = await res.json();
    return rooms
}
  const getRooms = async () => {
        
    const rooms = await fetchRooms();
    dispatch({
        type: GET_ROOMS,
        payload: rooms
    });
    return rooms
};

  return (
    <StockerRoomContext.Provider
      value={{
        rooms: state.roomsList,
        getRooms
      }}
    >
      {props.children}
    </StockerRoomContext.Provider>
  );
}

export default StockerRoomState;