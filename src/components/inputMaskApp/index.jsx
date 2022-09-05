import InputMask from 'react-input-mask';
import {TextField} from '@mui/material';
import {Controller} from 'react-hook-form';

export function InputMaskApp({ mask, name, label, control }) {
  return (
      <Controller name={name}
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                        <InputMask mask={mask} {...field} >
                          {() => <TextField className={'w-full'}
                                            id='outlined-basic'
                                            label={label}
                                            variant='outlined'
                                            error={!!error}
                                            helperText={error ? error.message : null} />}
                        </InputMask>);
                  }} />
  );
}
