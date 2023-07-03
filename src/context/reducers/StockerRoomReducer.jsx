import { GET_ROOMS } from '../types/stockerRoomTypes';

function StockerRoomReducer(state, action) {
  
  const {type, payload} = action;

  switch(type){
    case GET_ROOMS: 
    return {
        ...state,
        roomsList: payload
    }
    default: 
    return state;
  }
}

export default StockerRoomReducer;
