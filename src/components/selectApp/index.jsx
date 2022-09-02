import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {Controller} from 'react-hook-form';

export function SelectApp({ label, control, name, options, props }) {
  const labelId = `${name}-label`;
  return (
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Controller
            name={name}
            control={control}
            defaultValue={null}
            {...props}
            render={({ field, ...props }) => {
              return (
                  <Select
                      labelId={labelId}
                      label={label}
                  >
                    {options.map((option) => <MenuItem key={option.value} value={10}>{option.label}</MenuItem>)}
                  </Select>
              );
            }}
        />
      </FormControl>
  );
}
