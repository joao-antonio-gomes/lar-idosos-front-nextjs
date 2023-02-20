import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

interface Props {
  mask: string;
  control: any;
  propsInput?: any;
  name: string;
  label: string;
}

export function InputMaskApp({ mask, name, label, control, propsInput }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field, fieldState: { error } }) => {
        return (
          <InputMask
            mask={mask}
            {...propsInput}
            {...field}>
            <TextField
              className={'w-full'}
              id='outlined-basic'
              label={label}
              variant='outlined'
              error={!!error}
              helperText={error ? error.message : null}
            />
          </InputMask>
        );
      }}
    />
  );
}
