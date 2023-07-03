import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BoosReportTable from '../pure/BooksReportTable';
import { Box, Typography } from '@mui/material';
import BookContext from '../../context/contexts/BookContext';

function BooksReportContainer() {

    const location = useLocation();
    const state = location.state;
    const [rows, setRows] = useState([])
    const {books, getBooks} = useContext(BookContext); 

    useEffect(()=>{
      if(books.length === 0){
       getBooks()
      }
      let f = books.map((book, index) => {
        console.log(book)
        return {
          name: book.name, 
          bagsQuantity: state.books_in_bags_quantity.quantity_per_book[index].quantity,
          vehiclesQuantity: state.books_in_vehicles_quantity.quantity_per_book[index].quantity,
          roomsQuantity: state.books_in_rooms_quantity.quantity_per_book[index].quantity,
          total: book.quantity 
               }
      })
      setRows(f)
      console.log(f)
    },[books])


    return (
    <div>
    {console.log(rows)}
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
              {rows.length !== 0 && <BoosReportTable rows={rows}></BoosReportTable> }
    </div>
  );
}

export default BooksReportContainer;
