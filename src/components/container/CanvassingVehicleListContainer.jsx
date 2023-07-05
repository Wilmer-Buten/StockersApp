import React, { useContext, useEffect, useState } from "react";
import CanvassingVehicleList from "../pure/CanvassingVehicleList";
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
import VehicleContext from "../../context/contexts/VehiclesContext";
import AppSkeleton from "../pure/loadings/AppSkeleton";
import AppAlert from "../pure/loadings/AppAlert";

function CanvassingVehicleListContainer() {
  const location = useLocation();
  const state = location.state;
  const [editBooks, setEditBooks] = useState(false);

  const handleEditBooks = (bool) => {
    setEditBooks(bool);
  };
  const [booksQuantityList, setBooksQuantityList] = useState([]);
  const [booksList, setBooksList] = useState([]);
  const {books, getBooks} = useContext(BookContext);
  const {vehicles, getVehicles} = useContext(VehicleContext); 
  const [loading, setLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false);

  useEffect(()=>{
    if(books.length !==0){
      setBooksList(books)
    } else {
      fetchBooks()
    }
    setLoading(false)
  },[])

  const fetchBooks = async () => {
    const res = await getBooks()
    setBooksList(res); 
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
  let date = "2023-06-27"
  const index = vehicles.findIndex((vehicle) => {return vehicle._id === state._id})
  vehicles[index].quantity_per_book.find((obj) => {return Date.parse(obj.date) === Date.parse(date)}) && (foundDate = true)
  if (foundDate){
     overwriteConfirm() &&  (overwrite = true)
  }

  if(overwrite || !foundDate){
    try{
      setLoading(true)
      const res = await fetch('http://localhost:4000/vehicles/saveBooks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
          overwrite: overwrite, 
          vehicleId: state._id,
          date: date,
          quantity: booksQuantityList
        })
    })
    
    res.status === 200 && setShowAlert(true)
    getVehicles()
    setLoading(false);
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
              alt={state.vehicle_name}
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
              {state.vehicle_name}
            </Typography>
            <AppAlert open={showAlert} setOpen={setShowAlert}/>
            {loading ? 
            <AppSkeleton/>
            : editBooks ? (
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

export default CanvassingVehicleListContainer;
