import { InputText } from '../inputText';
import { InputMaskApp } from '../inputMaskApp';
import { SelectApp } from '../selectApp';
import { DatePickerApp } from '../datePickerApp';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import Enum from '../../interface/Enum';
import AutocompleteApp from '../autocompleteApp';
import React, { useState } from 'react';
import UserService from '../../service/UserService';
import User from '../../interface/User';

interface Props {
  onSubmit: () => void;
  useForm: any;
  genderList: Enum[];
  maritalStatusList: Enum[];
}

export const FormPatientCadastro = ({ onSubmit, useForm, genderList, maritalStatusList }: Props) => {
  const minDate = dayjs().subtract(60, 'years').toDate();
  const maxDate = dayjs().subtract(110, 'years').toDate();

  const {
    control,
    formState: { errors },
  } = useForm;

  const [responsableOptions, setResponsableOptions] = useState([]);

  function handleChangeAutoComplete(event: React.SyntheticEvent<Element, Event>, value: string) {
    UserService.getAllResponsible({ page: 0, size: 10, name: value, sort: 'name' }).then((response) => {
      setResponsableOptions(response.data.content.map((user: User) => {
        return {
          value: user.id,
          label: `${user.name}`
        };
      }));
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={'md:flex w-full'}>
        <div className={'mb-5 w-full md:mr-2.5'}>
          <InputText
            label={'Nome'}
            name={'name'}
            control={control}
          />
        </div>
        <div className={'mb-5 w-full '}>
          <InputMaskApp
            mask={'999.999.999-99'}
            label={'CPF'}
            name={'cpf'}
            control={control}
          />
        </div>
        <div className={'mb-5 w-full md:ml-2.5'}>
          <AutocompleteApp
            control={control}
            options={responsableOptions}
            name={`userId`}
            label='Responsável'
            onInputChange={handleChangeAutoComplete}
          />
        </div>
      </div>
      <div className={'md:flex w-full'}>
        <div className={'mb-5 w-full'}>
          <DatePickerApp
            minDate={minDate}
            maxDate={maxDate}
            name={'birthDate'}
            label={'Nascimento'}
            control={control}
          />
        </div>
        <div className={'mb-5 w-full md:ml-2.5'}>
          <SelectApp
            label={'Gênero'}
            name={'gender'}
            options={genderList}
            control={control}
          />
        </div>
        <div className={'mb-5 w-full md:ml-2.5'}>
          <SelectApp
            label={'Estado civil'}
            name={'marital_status'}
            options={maritalStatusList}
            control={control}
          />
        </div>
      </div>

      <Button
        variant='contained'
        type={'submit'}>
        Cadastrar
      </Button>
    </form>
  );
};
