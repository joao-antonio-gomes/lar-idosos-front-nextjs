import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { Control } from 'react-hook-form/dist/types';
import { TimePicker } from '@mui/x-date-pickers';

interface Props {
  label: string;
  name: string;
  helperText?: string;
  defaultValue?: string;
  propsInput?: any;
  control: Control<any, any>;
}

export function TimePickerApp({
                                propsInput, label, control, name
                              }: Props) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={''}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                {...propsInput}
                className={'w-full'}
                label={label}
                value={dayjs(value, 'HH:mm')}
                ampm={false}
                ampmInClock={false}
                // @ts-ignore
                onChange={(value) => onChange(dayjs(value, 'HH:mm'))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </LocalizationProvider>
          );
        }}
      />
    </>
  );
}
