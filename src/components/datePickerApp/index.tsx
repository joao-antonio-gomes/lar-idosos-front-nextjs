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
  defaultValue?: string;
  control: Control<any, any>;
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  openTo?: 'day' | 'month' | 'year';
  propsInput?: any;
}

export function DatePickerApp({
                                propsInput,
                                label,
                                control,
                                name,
                                minDate,
                                maxDate,
                                disableFuture = true,
                                openTo = 'year'
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
              <DatePicker
                {...propsInput}
                className={'w-full'}
                disableFuture={disableFuture}
                label={label}
                openTo={openTo}
                inputFormat={'DD/MM/YYYY'}
                maxDate={minDate}
                minDate={maxDate}
                mask={'__/__/____'}
                value={value}
                // @ts-ignore
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
