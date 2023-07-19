import { TableRow, Radio, TableCell } from '@mui/material';

function BooksTable({bookId, radioStatus, handleRadios, bookName}) {

  const handleChecked = (e) => {
    handleRadios(e.target.id)
  }

  return (
    <TableRow>
      <TableCell>{bookName}</TableCell>
        <TableCell><Radio checked={radioStatus[0].radioStatus} id={bookId + 'A'} onClick={handleChecked}></Radio></TableCell>
        <TableCell><Radio checked={radioStatus[1].radioStatus} id={bookId + 'B'} onClick={handleChecked}></Radio></TableCell>
        <TableCell><Radio checked={radioStatus[2].radioStatus} id={bookId + 'C'} onClick={handleChecked}></Radio></TableCell>
        <TableCell><Radio checked={radioStatus[3].radioStatus} id={bookId + 'D'} onClick={handleChecked}></Radio></TableCell>
        <TableCell><Radio checked={radioStatus[4].radioStatus} id={bookId + 'E'} onClick={handleChecked}></Radio></TableCell>
        <TableCell><Radio checked={radioStatus[5].radioStatus} id={bookId + 'F'} onClick={handleChecked}></Radio></TableCell>
    </TableRow>

  );
}

export default BooksTable;