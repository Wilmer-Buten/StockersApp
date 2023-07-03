import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Stack,
  Avatar,
  Button,
} from "@mui/material";
import BookContext from "../../context/contexts/BookContext";
import EditBooksTextField from "../pure/EditBooksTextField";
import StockerRoomContext from "../../context/contexts/StockerRoomContext";

function StockerRoomComponent() {
  
  const location = useLocation();
  const state = location.state;
  const [editBooks, setEditBooks] = useState(false);

  const handleEditBooks = (bool) => {
    setEditBooks(bool);
  };
  const [booksQuantityList, setBooksQuantityList] = useState([]);
  const [booksList, setBooksList] = useState([]);
  const {books, getBooks} = useContext(BookContext);
  const {rooms, getRooms} = useContext(StockerRoomContext); 
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
   if(books.length === 0){
    getBooks()
   }
   setBooksList(books); 
    setLoading(false)
  },[books])

  const fetchBooks = async () => {
    const res = await getBooks()
    setBooksList(res); 
    console.log(res)
}

const overwriteConfirm = () => {
  return window.confirm("'Existe un reporte realizado del día de hoy, ¿Quieres sobrescribirlo?'")
}
 
const submitBooks = async (e) => {
  
  e.preventDefault()
  const token = localStorage.getItem('credentials');
  let overwrite = false;
  let nowDate = new Date(); 
  let foundDate = false
  let date = "2023-07-01"
  console.log(state._id)
  const index = rooms.findIndex((room) => {return room._id === state._id})
  rooms[index].quantity_per_book.find((obj) => {return Date.parse(obj.date) === Date.parse(date)}) && (foundDate = true)
  if (foundDate){
     overwriteConfirm() &&  (overwrite = true)
  }

  if(overwrite || !foundDate){
    try{
      setLoading(true)
      const res = await fetch('http://localhost:4000/stockerrooms/saveBooks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
          overwrite: overwrite, 
          roomId: state._id,
          date: date,
          quantity: booksQuantityList
        })
    })
    
    const data = await res.json();
    getRooms();
    setLoading(false);
    console.log(data)
  }
    catch(err){
      console.log(err)
    }
 
  }
} 

const storeBooksQuantity = async (e, book) => {
  e.preventDefault();
  let found = false
  let prevBookQuantityList = [...booksQuantityList]
  let newBookQuantity = { bookId: book.id,
    quantity: e.target.value }
 
    
  if (prevBookQuantityList.length === 0){
    prevBookQuantityList.push(newBookQuantity)
    return setBooksQuantityList(prevBookQuantityList);
  }

  prevBookQuantityList.forEach((obj, index) => {
    if(obj.bookId === book.id){
    found = true
    prevBookQuantityList[index] = newBookQuantity
    setBooksQuantityList(prevBookQuantityList)
    }
  })
  if(!found){
    
    prevBookQuantityList.push(newBookQuantity)
    setBooksQuantityList(prevBookQuantityList);

  }
    
  const token = localStorage.getItem('credentials');
} 

  if(loading) return (
    <div>
      LOADINGGG
    </div>
  )

  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={state.room_name}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 80, height: 80 }}
            />
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {state.room_name}
            </Typography>
            {editBooks ? (
              <Stack
                component="form"
                sx={{
                  width: "45ch",
                }}
                spacing={2}
                noValidate
                autoComplete="off"
              >
                  {booksList.map((book, index) => {
                     return (<EditBooksTextField key={index} storeBooksQuantity={storeBooksQuantity} book={book}/>)
                  })}
                  <Button type="submit" variant="contained" onClick={(e)=>{submitBooks(e)}}>Save</Button>
              </Stack>
            ) : (
              <Stack
                sx={{ pt: 1 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">Editar nombre</Button>
                <Button variant="outlined">Editar Imagen</Button>
                <Button
                  onClick={() => handleEditBooks(true)}
                  variant="contained"
                >
                  Editar Libros
                </Button>
              </Stack>
            )}
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default StockerRoomComponent;
