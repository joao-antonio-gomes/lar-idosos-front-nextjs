import { InputText } from '../inputText';
import { InputMaskApp } from '../inputMaskApp';
import { SelectApp } from '../selectApp';
import { DatePickerApp } from '../datePickerApp';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import Enum from '../../interface/Enum';
import React, { useEffect, useState } from 'react';
import AutocompleteApp from '../autocompleteApp';
import UserService from '../../service/UserService';
import User from '../../interface/User';
import * as Yup from 'yup';
import { useSnackbar } from '../../context/snackbar';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import FormPatientEdicaoValues from '../../interface/FormPatientEdicaoValues';
import { yupResolver } from '@hookform/resolvers/yup';
import PersonService from '../../service/PersonService';
import PatientService from '../../service/PatientService';
import Patient from '../../interface/Patient';
import { AxiosResponse } from 'axios';
import SelectOption from '../../interface/SelectOption';

const initialValues: FormPatientEdicaoValues = {
  id: 0,
  name: '',
  cpf: '',
  birthDate: new Date(),
  gender: '',
  maritalStatus: '',
  responsible: { value: 1, label: 'Responsável' }
}

export const FormPatientEdicao = () => {
  const minDate = dayjs().subtract(60, 'years');
  const maxDate = dayjs().subtract(110, 'years');

  const snackbar = useSnackbar();
  const router: NextRouter = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);
  const [responsibleOptions, setResponsibleOptions] = useState<SelectOption[]>([]);
  const [genderList, setGenderList] = useState<Enum[]>([]);
  const [maritalStatusList, setMaritalStatusList] = useState<Enum[]>([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string().required('CPF é obrigatório'),
    birthDate: Yup.date()
      .required('Data de nascimento é obrigatório')
      .max(minDate, `Data mínima ${minDate.format('DD/MM/YYYY')}`)
      .min(maxDate, `Data máxima ${maxDate.format('DD/MM/YYYY')}`)
      .typeError('Data inválida'),
    gender: Yup.string().required('Gênero é obrigatório'),
    maritalStatus: Yup.string().required('Estado civil é obrigatório')
  });

  const {
    handleSubmit,
    control,
    reset
  } = useForm<FormPatientEdicaoValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  });

  function fetchAllResponsible(value: string) {
    UserService.getAllResponsible({ page: 0, size: 10, name: value, sort: 'name' }).then((response) => {
      setResponsibleOptions(response.data.content.map((user: User) => {
        return {
          value: user.id,
          label: `${user.name}`
        };
      }));
    });
  }

  function handleChangeAutoComplete(event: React.SyntheticEvent<Element, Event>, value: string) {
    fetchAllResponsible(value);
  }

  function fetchDefaultResponsible(patient: Patient, response: AxiosResponse<any>) {
    if (!patient || patient.responsibleId == undefined) return;

    UserService.getResponsibleById(patient.responsibleId).then(({ data }) => {
      const responsible: SelectOption = {
        value: Number(data.id),
        label: data.name
      };

      const formValue: FormPatientEdicaoValues = {
        ...patient,
        responsible: responsible
      };

      reset(formValue);
    });
  }

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    if (!id) return;

    fetchAllResponsible('');
    PersonService.getGender().then(({ data }) => setGenderList(data));
    PersonService.getMaritalStatus().then(({ data }) => setMaritalStatusList(data));
    PatientService.getById(id).then((response) => {
      const patient: Patient = response.data;

      fetchDefaultResponsible(patient, response);
      setIsLoaded(true);
    });
  }, [router.isReady]);

  const onSubmit = (data: FormPatientEdicaoValues): void => {
    const patient: Patient = {
      ...data,
      responsibleId: data.responsible?.value ? Number(data.responsible.value) : null
    }
    PatientService.patch(data.id, patient)
      .then((response) => {
        snackbar.showSnackBar('Paciente atualizado com sucesso', 'success');
        router.push('/paciente');
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          snackbar.showSnackBar(response.data.message, 'error');
          return;
        }
        snackbar.showSnackBar('Houve um erro ao atualizar o paciente, atualize a página e tente novamente', 'error');
      });
  };

  return (
    <>
      {isLoaded && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'md:flex w-full'}>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <InputText
                label={'Nome'}
                name={'name'}
                control={control}
              />
            </div>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <InputMaskApp
                mask={'999.999.999-99'}
                label={'CPF'}
                name={'cpf'}
                control={control}
              />
            </div>
            <div className={'mb-5 w-full'}>
              <AutocompleteApp
                control={control}
                options={responsibleOptions}
                name={`responsible`}
                label='Responsável'
                onInputChange={handleChangeAutoComplete}
              />
            </div>
          </div>
          <div className={'md:flex w-full'}>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <SelectApp
                label={'Gênero'}
                name={'gender'}
                options={genderList}
                control={control}
              />
            </div>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <DatePickerApp
                minDate={minDate.toDate()}
                maxDate={maxDate.toDate()}
                name={'birthDate'}
                label={'Nascimento'}
                control={control}
              />
            </div>
            <div className={'mb-5 w-full'}>
              <SelectApp
                label={'Estado civil'}
                name={'maritalStatus'}
                options={maritalStatusList}
                control={control}
              />
            </div>
          </div>

          <Button
            variant='contained'
            type={'submit'}>
            Atualizar
          </Button>
        </form>
      )}
    </>
  );
};
