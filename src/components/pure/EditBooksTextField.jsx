import { Box, Container, TextField } from '@mui/material';
import React from 'react';

function EditBooksTextField({index, book, storeBooksQuantity}) {
  return (
    <Container maxWidth="sm">
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
  <TextField
        label={book.name}
        id={index}
        type='number'
        variant="filled"
        size="Normal"
        onChange={(e)=>{storeBooksQuantity(e, book)}}
      />   
    </Box>
  </Container>
      
  );
}

export default EditBooksTextField;
