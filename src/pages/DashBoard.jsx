import React from 'react';
import BookListContainer from '../components/container/BookListContainer';
import AppBarComponent from '../components/container/AppBarComponent';
function DashBoard() {
  return (
    <AppBarComponent prop={<BookListContainer/>}/>
  );
}

export default DashBoard;
