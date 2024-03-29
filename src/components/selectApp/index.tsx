import { MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

interface Props {
  label: string;
  name: string;
  options: { label: string, value: string }[];
  control: Control<any>;
  defaultValue?: string;
}

export function SelectApp({ label, control, options, name, defaultValue }: Props) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue ? defaultValue : ''}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            select
            fullWidth
            label={label}
            {...field}
            error={!!error}
            helperText={error ? error.message : null}>
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
}
