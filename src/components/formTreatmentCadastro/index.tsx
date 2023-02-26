import React, { useEffect, useState } from 'react';
import { InputText } from '../inputText';
import { DatePickerApp } from '../datePickerApp';
import AutocompleteApp from '../autocompleteApp';
import { Button, DialogActions } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useFieldArray, useForm } from 'react-hook-form';
import Medicine from '../../interface/Medicine';
import Patient from '../../interface/Patient';
import SelectOption from '../../interface/SelectOption';
import MedicineService from '../../service/MedicineService';
import DiseaseService from '../../service/DiseaseService';
import { useSnackbar } from '../../context/snackbar';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TreatmentService from '../../service/TreatmentService';
import { TimePickerApp } from '../timePickerApp';
import dayjs from 'dayjs';
import Disease from '../../interface/Disease';
import moment from 'moment';

interface Props {
  patient: Patient | undefined;
  handleClose: () => void;
}

function FormTreatmentCadastro({ patient, handleClose }: Props) {

  const [medicinesOptions, setMedicinesOptions] = useState<SelectOption[]>([]);
  const [diseaseOptions, setDiseaseOptions] = useState<SelectOption[]>([]);
  const snackbar = useSnackbar();
  const [isLoaded, setIsLoaded] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    disease: Yup.object().required('Doença é obrigatório').nullable(),
    beginDate: Yup.date()
      .required('Data do início do tratamento é obrigatório')
      .nullable()
      .typeError('Data do início do tratamento inválida'),
    endDate: Yup.date()
      .required('Data do fim do tratamento é obrigatório')
      .typeError('Data do fim do tratamento inválida'),
    treatmentMedicines: Yup.array().of(
      Yup.object().shape({
        medicine: Yup.object().required('Remédio é obrigatório').nullable(),
        dosage: Yup.number().required('Dosagem é obrigatório').typeError('Dosagem deve ser um número inteiro!'),
        minutesInterval: Yup.number()
          .required('Intervalo (minutos) é obrigatório')
          .typeError('Intervalo (minutos) deve ser um número inteiro!'),
        beginHour: Yup.string().nullable()
          .required('Hora de início é obrigatório')
          .test('is-valid', 'Hora de início inválida', (value) => {
            return dayjs(value, 'HH:mm').isValid();
          }),
        beginDate: Yup.date()
          .required('Data do início da medicação é obrigatória')
          .nullable()
          .typeError('Data do início da medicação inválida'),
        endDate: Yup.date()
          .required('Data do fim da medicação é obrigatória')
          .typeError('Data do fim da medicação inválida'),
      })
    )
  });

  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'treatmentMedicines',
    rules: {}
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    data = {
      ...data,
      beginDate: moment(data.beginDate).format('YYYY-MM-DD'),
      endDate: moment(data.endDate).format('YYYY-MM-DD'),
      diseaseId: data.disease?.value,
      patientId: patient?.id,
      treatmentMedicines: data.treatmentMedicines.map((medicine: any) => ({
        ...medicine,
        medicineId: medicine.medicine?.value,
        beginDate: moment(data.beginDate).format('YYYY-MM-DD'),
        endDate: moment(data.endDate).format('YYYY-MM-DD'),
        beginHour: moment(medicine.beginHour).format('HH:mm'),
      }))
    };
    console.log(data);
    TreatmentService.create(data)
      .then(() => {
        snackbar.showSnackBar('Tratamento criado com sucesso', 'success');
        handleClose();
      })
      .catch(({ response }) => {
        if (response.data.message) {
          snackbar.showSnackBar(response.data.message, 'error');
          return;
        }
        snackbar.showSnackBar('Houve um erro ao criar o tratamento, atualize a página e tente novamente', 'error');
      });
  });

  const fetchMedicines = (value: string|undefined) => {
    MedicineService.getAll({ page: 0, size: 10, name: value, sort: 'name' }).then((response) => {
      setMedicinesOptions(response.data.content.map((medicine: Medicine) => {
        return {
          value: medicine.id,
          label: `${medicine.name} - ${medicine.concentration}mg - ${medicine.type}`
        };
      }));
    });
  }

  const handleChangeAutoCompleteMedicine = (event: React.SyntheticEvent<Element, Event>, value: string) => {
    fetchMedicines(value);
  }

  const fetchDiseases = (value: string|undefined) => {
    DiseaseService.getAll({ page: 0, size: 10, name: value, sort: 'name' }).then((response) => {
      setDiseaseOptions(response.data.content.map((disease: Disease) => {
        return {
          value: disease.id,
          label: `${disease.name}`
        };
      }));
    });
  }

  const handleChangeAutoCompleteDisease = (event: React.SyntheticEvent<Element, Event>, value: string) => {
    fetchDiseases(value);
  }

  useEffect(() => {
    fetchMedicines(undefined);
    fetchDiseases(undefined);
  }, [fields]);

  useEffect(() => {
    if (!medicinesOptions || !diseaseOptions) return;
    setIsLoaded(true);
  }, [medicinesOptions]);

  const appendRemedio = () => {
    append({
      medicine: '',
      minutesInterval: '',
      dosage: '',
    });
  };

  return (
    <>
      {isLoaded && (
        <form
          onSubmit={onSubmit}
          className='mx-5'>
          <div className={'md:flex w-full'}>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <InputText
                label={'Nome Paciente'}
                name={'name'}
                propsInput={{ disabled: true }}
                defaultValue={patient?.name}
                control={control}
              />
            </div>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <AutocompleteApp
                control={control}
                options={diseaseOptions}
                name={`disease`}
                label='Doença'
                onInputChange={handleChangeAutoCompleteDisease}
              />
            </div>
          </div>
          <div className={'md:flex w-full'}>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <DatePickerApp
                disableFuture={false}
                openTo='day'
                label={'Inicio do Tratamento'}
                name={'beginDate'}
                control={control}
              />
            </div>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <DatePickerApp
                disableFuture={false}
                openTo='day'
                label={'Fim do Tratamento'}
                name={'endDate'}
                control={control}
              />
            </div>
          </div>
          <Button
            variant='contained'
            className='mb-4'
            onClick={() => appendRemedio()}>
            Adicionar Remédio
          </Button>
          {fields.map((field, index) => {
            return (
              <div key={`container-remedio-${index}`}>
                <Divider />
                <div className='flex justify-between mt-3'>
                  <Typography marginTop={1}>Remédio {index + 1}</Typography>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => remove(index)}>
                    Remover
                  </Button>
                </div>
                <div className={'mt-3 md:flex w-full'}>
                  <div className={'mb-5 w-full md:mr-2.5'}>
                    <AutocompleteApp
                      control={control}
                      options={medicinesOptions}
                      name={`treatmentMedicines.${index}.medicine`}
                      label='Remédio'
                      onInputChange={handleChangeAutoCompleteMedicine}
                    />
                  </div>
                  <div className={'mb-5 w-1/2 md:mr-2.5'}>
                    <InputText
                      label={'Dosagem'}
                      name={`treatmentMedicines.${index}.dosage`}
                      propsInput={{ type: 'number' }}
                      control={control}
                    />
                  </div>
                </div>
                <div className={'md:flex w-full'}>
                  <div className={'mb-5 w-full md:mr-2.5'}>
                    <InputText
                      label={'Intervalo (minutos)'}
                      name={`treatmentMedicines.${index}.minutesInterval`}
                      propsInput={{ type: 'number' }}
                      control={control}
                    />
                  </div>
                  <div className={'mb-5 w-full md:mr-2.5'}>
                    <TimePickerApp
                      label={'Hora Inicial'}
                      name={`treatmentMedicines.${index}.beginHour`}
                      control={control}
                    />
                  </div>
                </div>
                <div className={'md:flex w-full'}>
                  <div className={'mb-5 w-full md:mr-2.5'}>
                    <DatePickerApp
                      disableFuture={false}
                      openTo='day'
                      label={'Data Início Medicação'}
                      name={`treatmentMedicines.${index}.beginDate`}
                      control={control}
                    />
                  </div>
                  <div className={'mb-5 w-full md:mr-2.5'}>
                    <DatePickerApp
                      disableFuture={false}
                      openTo='day'
                      label={'Data Fim Medicação'}
                      name={`treatmentMedicines.${index}.endDate`}
                      control={control}
                    />
                  </div>
                </div>
                <Divider />
              </div>
            );
          })}
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              type='submit'
              autoFocus>
              Cadastrar
            </Button>
          </DialogActions>
        </form>
      )}
    </>
  );
}

export default FormTreatmentCadastro;
