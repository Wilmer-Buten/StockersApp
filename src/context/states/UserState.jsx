import { useReducer } from "react";
import { GET_USERS, SET_LOGGED_USER_ID } from "../types/userTypes";
import UserContext from "../contexts/UserContext";
import UserReducer from "../reducers/UserReducer";
import jwt from 'jsonwebtoken'

function UserState(props) {
  const initialState = {
    usersList: [],
    loggedUserId: ''
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const fetchUsers = async () => {
    const res = await fetch(process.env.REACT_APP_API_LINK + '/users') 
    const users = await res.json();
    return users
}
  const getUsers = async () => {
        
    const users = await fetchUsers();
    dispatch({
        type: GET_USERS,
        payload: users
    });
    return users
};

  const setLoggedUserId = (userId) => {

    const decoded = jwt.decode(userId)
    if(decoded){
      userId = decoded.id
        }

        dispatch({
            type: SET_LOGGED_USER_ID,
            payload: userId
        })

  }

  return (
    <UserContext.Provider
      value={{
        users: state.usersList,
        loggedUserId: state.loggedUserId,
        getUsers,
        setLoggedUserId
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;