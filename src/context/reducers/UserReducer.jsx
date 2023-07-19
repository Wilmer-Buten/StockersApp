import { GET_USERS, SET_LOGGED_USER_ID } from '../types/userTypes';

function UserReducer(state, action) {
  
  const {type, payload} = action;

  switch(type){
    case GET_USERS: 
    return {
        ...state,
        usersList: payload
    }
    case SET_LOGGED_USER_ID:
        return {
            ...state,
            loggedUserId: payload
        }
    default: 
    return state;
  }
}

export default UserReducer;
