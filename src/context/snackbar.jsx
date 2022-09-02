import {createContext, useContext, useState} from 'react';
import {Alert, Snackbar} from '@mui/material';

const SnackbarContext = createContext({});

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [typeColor, setTypeColor] = useState('info');

  const showSnackBar = (text, color) => {
    setMessage(text);
    setTypeColor(color);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTypeColor('info');
  };

  return (
      <SnackbarContext.Provider value={{ showSnackBar }}>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={handleClose}>
          <Alert onClose={handleClose} severity={typeColor}>
            {message}
          </Alert>
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
