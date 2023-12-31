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
import VehicleContext from "../../context/contexts/VehiclesContext";
import AppSkeleton from "../pure/loadings/AppSkeleton";
import AppAlert from "../pure/loadings/AppAlert";
import WeeklyReportGrid from "../pure/WeeklyReportGrid";

function CanvassingVehicleListContainer() {
  const location = useLocation();
  const state = location.state;
  const [editBooks, setEditBooks] = useState(false);

  const handleEditBooks = (bool) => {
    setEditBooks(bool);
  };
  const [booksQuantityList, setBooksQuantityList] = useState([]);
  const [booksList, setBooksList] = useState([]);
  const { books, getBooks } = useContext(BookContext);
  const { vehicles, getVehicles } = useContext(VehicleContext);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [gridRows, setGridRows] = useState([]);
  const [lastReportDate, setLastReportDate] = useState('');

  useEffect(() => {

    if(vehicles.length === 0){
      getVehicles();
    }
    if (books.length === 0) {
 
      getBooks();

    } else {
      const vehicleReportsLength = state.quantity_per_book.length;
      const latestQuantityPerBook = state.quantity_per_book[vehicleReportsLength-1];
      setLastReportDate(latestQuantityPerBook.date)
      let newGridRows = books.map((book, index) => {
                  
        const i = latestQuantityPerBook.quantity.findIndex((obj) => {return obj.bookId === book.id})
        
        return {
    
          id: index,
          bookName: book.name,
          bookQuantity: latestQuantityPerBook.quantity[i].quantity
        };
      
      });
      
      setGridRows(newGridRows);
    }
    setBooksList(books);
    let prevBookQuantityList = [...booksQuantityList];
    books.forEach((book) => {
      prevBookQuantityList.push({
        bookId: book.id,
        quantity: 0,
      });
    });
    setBooksQuantityList(prevBookQuantityList);
    setLoading(false);
  }, [books]);

  const gridColumns = [
    { field: "bookName", headerName: "Libro", width: 350 },
    { field: "bookQuantity", headerName: "Cantidad", width: 130 },
  ];

  const overwriteConfirm = () => {
    return window.confirm(
      "'Existe un reporte realizado del día de hoy, ¿Quieres sobrescribirlo?'"
    );
  };

  const submitBooks = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("credentials");
    let overwrite = false;
    const nowDate = new Date();
    const date =
      nowDate.getFullYear() +
      "-" +
      (nowDate.getMonth() + 1) +
      "-" +
      nowDate.getDate();
    let foundDate = false;
    const index = vehicles.findIndex((vehicle) => {
      return vehicle._id === state._id;
    });
    vehicles[index].quantity_per_book.find((obj) => {
      return Date.parse(obj.date) === Date.parse(date);
    }) && (foundDate = true);
    if (foundDate) {
      overwriteConfirm() && (overwrite = true);
    }

    if (overwrite || !foundDate) {
      try {
        setLoading(true);
        const res = await fetch(
          process.env.REACT_APP_API_LINK + "/vehicles/savebooks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
            body: JSON.stringify({
              overwrite: overwrite,
              vehicleId: state._id,
              date: date,
              quantity: booksQuantityList,
            }),
          }
        );

        res.status === 200 && setShowAlert(true);
        getVehicles();
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const storeBooksQuantity = async (e, book) => {
    e.preventDefault();
    let value = e.target.value;
    if (e.target.value.length === 0) {
      value = 0;
    }
    let prevBookQuantityList = [...booksQuantityList];
    let newBookQuantity = { bookId: book.id, quantity: value };

    prevBookQuantityList.forEach((obj, index) => {
      if (obj.bookId === book.id) {
        prevBookQuantityList[index] = newBookQuantity;
        setBooksQuantityList(prevBookQuantityList);
      }
    });
  };

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
              alignItems: "center",
            }}
          >
            <Avatar
              alt={state.vehicle_name}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 80, height: 80, margin: 'auto'}}
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
            <AppAlert open={showAlert} setOpen={setShowAlert} />
            {loading ? (
              <AppSkeleton />
            ) : editBooks ? (
              <Stack
                component="form"
                
                spacing={2}
                noValidate
                autoComplete="off"
              >
                {booksList.map((book, index) => {
                  return (
                    <EditBooksTextField
                      key={index}
                      storeBooksQuantity={storeBooksQuantity}
                      book={book}
                    />
                  );
                })}
                <Button
                  type="submit"
                  variant="contained"
                  onClick={(e) => {
                    submitBooks(e);
                  }}
                >
                  Save
                </Button>
              </Stack>
            ) : (
              <>
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
                <Box sx={{ pt: 3 }} >
                <p style={{color: 'grey', fontStyle: "italic"}}>*Last report in {lastReportDate}</p>
                  <WeeklyReportGrid columns={gridColumns} rows={gridRows} />
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default CanvassingVehicleListContainer;
