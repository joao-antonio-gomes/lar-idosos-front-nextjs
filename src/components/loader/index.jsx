import React from 'react';
import {CircularProgress} from '@mui/material';

function Loader(props) {
  return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
        <CircularProgress size={50} />
      </div>
  );
}

export default Loader;
