import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { Control } from 'react-hook-form/dist/types';

interface Props {
  label: string;
  name: string;
  helperText?: string;
  errorMessage?: string;
  error?: string;
  defaultValue?: string;
  propsInput?: any;
  control: Control<any, any>;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePickerApp({ label, control, name, minDate, maxDate, errorMessage, error }: Props) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={''}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className={'w-full'}
                disableFuture
                label={label}
                openTo={'year'}
                inputFormat={'DD/MM/YYYY'}
                // @ts-ignore
                name={name}
                maxDate={minDate}
                minDate={maxDate}
                mask={'__/__/____'}
                value={value}
                onChange={(value) => onChange(dayjs(value))}
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
