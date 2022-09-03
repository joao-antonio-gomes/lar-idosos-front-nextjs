import InputMask from 'react-input-mask';
import {TextField} from '@mui/material';

export function InputMaskApp({ mask, label, error, errorMessage, register, name, props }) {
  return (
      <InputMask mask={mask}>
        {() => <TextField className={'w-full'}
                          id='outlined-basic'
                          inputProps={register(name)}
                          label={label}
                          error={error}
                          helperText={errorMessage}
                          variant='outlined' />}
      </InputMask>
  );
}
