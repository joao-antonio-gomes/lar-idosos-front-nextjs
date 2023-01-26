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
  control: Control<any, any>;
  defaultValue?: SelectOption;
  onInputChange: (e: React.SyntheticEvent<Element, Event>, value: string) => void;
}

export default function AutocompleteApp({ options, onInputChange, control, name, defaultValue = undefined, label }: Props) {

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ fieldState: { error }, field: { value, ref, onChange, ...field } }) => {
        return (
          <Autocomplete
            id='multiple-limit-tags'
            options={options}
            value={value}
            onChange={onChange}
            onInputChange={onInputChange}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  {...field}
                  inputRef={ref}
                  label={label}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              );
            }}
            sx={{ width: '100%' }}
          />
        );
      }}
    />
  );
}

//https://github.com/ant-design/ant-design/issues/21882
