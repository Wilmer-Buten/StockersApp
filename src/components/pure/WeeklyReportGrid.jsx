
import { Box } from '@mui/material';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function WeeklyReportGrid({columns, rows, handleRowClick, handleRowSelection}) {

  return (
    <div>
           <Box sx={{ height: 430, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onCellDoubleClick={handleRowClick}
                initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 6,
                  },
                },
              }}
              pageSizeOptions={[6]}
              checkboxSelection={ handleRowSelection ? true : false}
              onRowSelectionModelChange={handleRowSelection ? (e)=> {handleRowSelection(e,columns[0].field)} : ''}
            />
          </Box>      
    </div>
  );
}

export default WeeklyReportGrid;
