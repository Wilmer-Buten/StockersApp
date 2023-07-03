import { useReducer } from "react";
import BookContext from "../contexts/BookContext";
import { GET_BOOKS } from "../types/bookTypes";
import BookReducer from "../reducers/BookReducer";

function BookState(props) {
  const initialState = {
    booksList: [],
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const fetchBooks = async () => {
    const res = await fetch('http://localhost:4000/books') 
    const books = await res.json();
    return books
}
  const getBooks = async () => {

    const books = await fetchBooks();
    dispatch({
        type: GET_BOOKS,
        payload: books
    });
    return books
};

  return (
    <BookContext.Provider
      value={{
        books: state.booksList,
        getBooks
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
}

export default BookState;