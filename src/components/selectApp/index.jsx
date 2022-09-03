import {MenuItem, TextField} from '@mui/material';

export function SelectApp({ label, options, error, errorMessage, register, name, props }) {
  return (
      <TextField
          select
          fullWidth
          label={label}
          defaultValue=''
          inputProps={register(name)}
          error={error}
          helperText={errorMessage}
          {...props}
      >
        {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
        ))}
      </TextField>
  );
}
