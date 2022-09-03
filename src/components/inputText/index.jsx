import {TextField} from '@mui/material';

export function InputText({ label, error, errorMessage, register, name, props }) {
  return (
      <TextField inputProps={register(name)}
                 className={'w-full'}
                 id='outlined-basic'
                 label={label}
                 variant='outlined'
                 helperText={errorMessage}
                 error={error}
                 {...props} />
  );
}
