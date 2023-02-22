import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';
import SelectOption from '../../interface/SelectOption';

interface Props {
  label: string;
  name: string;
  options: SelectOption[];
  control: Control<any>;
  onInputChange: (e: React.SyntheticEvent<Element, Event>, value: string) => void;
}

export default function AutocompleteApp({ options, onInputChange, control, name, label }: Props) {

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error }, field: { ref, onChange, value, ...field } }) => {
        return (
          <Autocomplete
            value={value || null}
            options={options}
            onChange={(event, value) => {
              onChange(value);
              return value;
            }}
            onInputChange={onInputChange}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option) => {
              return option.label || '';
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  inputRef={ref}
                  label={label}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              );
            }}
            sx={{ width: '100%' }}
            noOptionsText="Nenhum resultado encontrado"
          />
        );
      }}
    />
  );
}
