import { InputText } from '../inputText';
import { InputMaskApp } from '../inputMaskApp';
import { SelectApp } from '../selectApp';
import { DatePickerApp } from '../datePickerApp';
import { Button } from '@mui/material';
import dayjs from 'dayjs';

export const FormPatient = ({ onSubmit, useForm, genderList }) => {
  const minDate = dayjs().subtract(60, 'years');
  const maxDate = dayjs().subtract(110, 'years');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm;

  return (
    <form onSubmit={onSubmit}>
      <div className={'md:flex w-full'}>
        <div className={'mb-5 w-full md:mr-2.5'}>
          <InputText
            label={'Nome'}
            name={'name'}
            register={register}
            control={control}
          />
        </div>
        <div className={'mb-5 w-full md:ml-2.5'}>
          <InputMaskApp
            mask={'999.999.999-99'}
            label={'CPF'}
            name={'cpf'}
            control={control}
          />
        </div>
        <div className={'mb-5 w-full md:ml-2.5'}>
          <SelectApp
            label={'Gênero'}
            name={'gender'}
            options={genderList}
            register={register}
            control={control}
          />
        </div>
      </div>
      <div className={'md:flex w-full'}>
        <div className={'mb-5 w-full md:mr-2.5'}>
          <DatePickerApp
            minDate={minDate}
            maxDate={maxDate}
            name={'birthDate'}
            label={'Nascimento'}
            control={control}
          />
        </div>
        <div className={'mb-5 w-full md:ml-2.5'}>
          <InputMaskApp
            mask={'(99) 9 9999-9999'}
            label={'Celular'}
            name={'phone'}
            control={control}
          />
        </div>
      </div>

      <Button
        variant="contained"
        type={'submit'}>
        Cadastrar
      </Button>
    </form>
  );
};
