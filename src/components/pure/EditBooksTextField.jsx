import { TextField } from '@mui/material';
import React from 'react';

function EditBooksTextField({index, book, storeBooksQuantity}) {
  return (
    <>
        <TextField
        label={book.name}
        id={index}
        type='number'
        variant="filled"
        size="Normal"
        onChange={(e)=>{storeBooksQuantity(e, book)}}
      />
    </>
  );
}

export default EditBooksTextField;
