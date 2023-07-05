import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';

export default function AppCircularProgress({text, loading, setSuccess, setLoading, success}) {
 

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
    <Button
      type='submit'
      variant="contained"
      sx={buttonSx}
      disabled={loading}
      onClick={handleButtonClick}
    >
      {text}
    </Button>
    {loading && (
      <CircularProgress
        size={24}
        sx={{
          color: green[500],
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
        }}
      />
    )}
    </Box>
  )
}