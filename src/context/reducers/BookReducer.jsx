import { GET_BOOKS } from '../types/bookTypes';

function BookReducer(state, action) {
  
    const {type, payload} = action;

    switch(type){
        case GET_BOOKS:
            return {
                ...state,
                    booksList: payload
            }
            default: 
            return state;
    } 
}

export default BookReducer;
