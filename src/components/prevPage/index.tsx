import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import Link from 'next/link';

const PrevPage = ({ url }) => {
  return (
    <div style={{ cursor: 'pointer', display: 'flex', width: '100px' }}>
      <Link href={url}>
        <Button
          color={'inherit'}
          variant={'text'}
          startIcon={<ArrowBackIcon />}>
          Voltar
        </Button>
      </Link>
    </div>
  );
};

export default PrevPage;
