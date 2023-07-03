import { Box } from '@mui/material';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function WeeklyReportGrid({columns, rows, handleRowClick}) {



  return (
    <div>
           <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onCellClick={handleRowClick}
                initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>      
    </div>
  );
}

export default WeeklyReportGrid;
