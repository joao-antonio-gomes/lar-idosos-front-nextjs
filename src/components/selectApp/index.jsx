import {MenuItem, TextField} from '@mui/material';
import {Controller} from 'react-hook-form';

export function SelectApp({ label, control, options, name }) {
  return (
      <Controller name={name}
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                        <TextField
                            select
                            fullWidth
                            label={label}
                            {...field}
                            error={!!error}
                            helperText={error ? error.message : null}
                        >
                          {options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                          ))}
                        </TextField>);
                  }} />
  );
}
