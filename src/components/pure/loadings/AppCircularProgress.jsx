import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export default function AppCircularProgress({text, loading, setSuccess, setLoading, success}) {
 
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
    {console.log(loading)}
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