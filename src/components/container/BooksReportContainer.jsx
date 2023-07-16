import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BoosReportTable from '../pure/BooksReportTable';
import { Box, Divider, Typography } from '@mui/material';
import BookContext from '../../context/contexts/BookContext';

function BooksReportContainer() {

    const location = useLocation();
    const state = location.state;
    const [rows, setRows] = useState([])
    const {books, getBooks} = useContext(BookContext); 
    const [updatedBooks, setUpdatedBooks] = useState(false)

    useEffect(()=>{
      if(books.length === 0){
        getBooks()
       } else if(!updatedBooks) {
          getBooks()
          setUpdatedBooks(!updatedBooks)
       }
 
       let row = books.map((book, index) => {
        let bagsQuantityArr = state.books_in_bags_quantity.quantity_per_book[index];
        let vehiclesQuantityArr = state.books_in_vehicles_quantity.quantity_per_book[index];
        let roomsQuantityArr = state.books_in_rooms_quantity.quantity_per_book[index];
        let bookTotal = 0;
        bagsQuantityArr && (bookTotal = bookTotal + bagsQuantityArr.quantity);
        vehiclesQuantityArr && (bookTotal = bookTotal + vehiclesQuantityArr.quantity);
        roomsQuantityArr && (bookTotal = bookTotal + roomsQuantityArr.quantity); 

        return {
          name: book.name, 
          bagsQuantity: state.books_in_bags_quantity.quantity_per_book[index] ? state.books_in_bags_quantity.quantity_per_book[index].quantity : 0,
          vehiclesQuantity: state.books_in_vehicles_quantity.quantity_per_book[index] ? state.books_in_vehicles_quantity.quantity_per_book[index].quantity : 0,
          roomsQuantity: state.books_in_rooms_quantity.quantity_per_book[index] ? state.books_in_rooms_quantity.quantity_per_book[index].quantity : 0,
          total: bookTotal
               }
      })
      setRows(row)
    },[books, updatedBooks])


    return (
    <div>
    <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h4"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Reporte {state.date}
            </Typography>
          </Box>
            <Divider/>
              {rows.length !== 0 && <BoosReportTable rows={rows}></BoosReportTable> }
    </div>
  );
}

export default BooksReportContainer;
