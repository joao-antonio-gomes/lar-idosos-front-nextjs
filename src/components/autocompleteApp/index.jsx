import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form';

export default function AutocompleteApp({ options, control, name, defaultValue = null, label, errors }) {
  return (<Controller name={name}
                      control={control}
                      defaultValue={defaultValue}
                      render={({fieldState: { error }, field: { value, ref, onChange, ...field } }) => {
                        return (<Autocomplete
                            onChange={(e, data) => onChange(data)}
                            id='multiple-limit-tags'
                            options={options}
                            value={value}
                            renderInput={(params) => {
                              return <TextField {...params}
                                                {...field}
                                                inputRef={ref}
                                                label={label}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                              />;
                            }
                            }
                            sx={{ width: '100%' }}
                        />);
                      }} />);
}
