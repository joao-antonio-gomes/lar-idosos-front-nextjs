import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export function ControllerApp({ mask, control, name, label, errorMessage, component }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <InputMask
            mask={mask}
            value={value}>
            {() => (
              <TextField
                className={'w-full'}
                id="outlined-basic"
                label={label}
                onChange={onChange}
                error={error}
                helperText={errorMessage}
                variant="outlined"
              />
            )}
          </InputMask>
        );
      }}
    />
  );
}
