import { createContext, ReactNode, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertColor } from '@mui/material/Alert/Alert';
import * as React from 'react';

interface SnackBarContextActions {
  showSnackBar: (text: string, typeColor: AlertColor) => void;
}

const SnackbarContext = createContext({} as SnackBarContextActions);

interface SnackbarProps {
  children?: React.ReactNode | React.ReactNode[];
}

const SnackbarProvider = ({ children }: SnackbarProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [typeColor, setTypeColor] = useState<AlertColor>();

  const showSnackBar = (text: string, color: AlertColor) => {
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
        <MuiAlert
          onClose={handleClose}
          severity={typeColor}
          elevation={6}
          variant={'filled'}>
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
