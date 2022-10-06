import {createContext, useContext, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarContext = createContext({});

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [typeColor, setTypeColor] = useState();

  const showSnackBar = (text, color) => {
    setMessage(text);
    setTypeColor(color);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <SnackbarContext.Provider value={{ showSnackBar }}>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={handleClose}>
          <MuiAlert onClose={handleClose} severity={typeColor} elevation={6} variant={"filled"}>
            {message}
          </MuiAlert>
        </Snackbar>
        {children}
      </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackBar must be used within an SnackBarProvider');
  }

  return context;
};

export { SnackbarProvider, useSnackbar };
