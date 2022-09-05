import {TextField} from '@mui/material';
import {Controller} from 'react-hook-form';

export function InputText({ label, name, control }) {
  return (
      <Controller name={name}
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                        <TextField className={'w-full'}
                                   id='outlined-basic'
                                   label={label}
                                   variant='outlined'
                                   {...field}
                                   error={!!error}
                                   helperText={error ? error.message : null} />);
                  }} />
  );
}
