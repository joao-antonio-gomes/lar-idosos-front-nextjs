import {TextField} from '@mui/material';
import {Controller} from 'react-hook-form';

export function InputText({ label, name, control, defaultValue, propsInput, helperText }) {
  return (
      <Controller name={name}
                  defaultValue={defaultValue ? defaultValue : null}
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                        <TextField className={'w-full'}
                                   id='outlined-basic'
                                   label={label}

                                   {...propsInput}
                                   variant='outlined'
                                   {...field}
                                   error={!!error}
                                   helperText={error ? error.message : helperText ? helperText : null} />);
                  }} />
  );
}
