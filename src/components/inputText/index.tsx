import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

interface Props {
  label: string;
  name: string;
  helperText?: string;
  defaultValue?: string;
  propsInput?: any;
  control: Control<any, any>;
}

export function InputText({ label, name, control, defaultValue, propsInput, helperText }: Props) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue ? defaultValue : ''}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...propsInput}
            {...field}
            className={'w-full'}
            id="outlined-basic"
            label={label}
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : helperText ? helperText : null}
          />
        );
      }}
    />
  );
}
