import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function BoosReportTable(rows) {
 
  return (
    <TableContainer >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Libro</TableCell>
            <TableCell align="right">Cantidad en bags</TableCell>
            <TableCell align="right">Cantidad en vehículos</TableCell>
            <TableCell align="right">Cantidad en Stocker Rooms</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.bagsQuantity}</TableCell>
              <TableCell align="right">{row.vehiclesQuantity}</TableCell>
              <TableCell align="right">{row.roomsQuantity}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BoosReportTable;