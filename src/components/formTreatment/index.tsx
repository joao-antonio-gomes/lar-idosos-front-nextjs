import React, { useEffect, useState } from 'react';
import { InputText } from '../inputText';
import { DatePickerApp } from '../datePickerApp';
import AutocompleteApp from '../autocompleteApp';
import { Button, DialogActions } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useFieldArray } from 'react-hook-form';
import Medicine from '../../interface/Medicine';
import Patient from '../../interface/Patient';
import SelectOption from '../../interface/SelectOption';
import MedicineService from '../../service/MedicineService';

interface Props {
  onSubmit: () => void;
  useForm: any;
  medicinesList: Medicine[];
  patient: Patient | undefined;
  handleClose: () => void;
}

function FormTreatment({ onSubmit, useForm, patient, handleClose }: Props) {

  const [medicinesOptions, setMedicinesOptions] = useState<SelectOption[]>([]);

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

  const handleChangeAutoComplete = (event: React.SyntheticEvent<Element, Event>, value: string) => {
    fetchMedicines(value);
  }

  useEffect(() => {
    fetchMedicines(undefined);
  }, []);


  const {
    control,
    formState: { errors }
  } = useForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medicines',
    rules: {}
  });

  const appendRemedio = () => {
    append({
      medicine: '',
      hourInterval: '',
      dosage: '',
      dosageType: ''
    });
  };

  return (
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
          <InputText
            label={'Doença'}
            name={'disease'}
            control={control}
          />
        </div>
      </div>
      <div className={'md:flex w-full'}>
        <div className={'mb-5 w-full md:mr-2.5'}>
          <DatePickerApp
            label={'Inicio do Tratamento'}
            name={'beginDate'}
            control={control}
          />
        </div>
        <div className={'mb-5 w-full md:mr-2.5'}>
          <DatePickerApp
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
                  name={`medicines.${index}.medicine`}
                  label='Remédios'
                  onInputChange={handleChangeAutoComplete}
                />
              </div>
              <div className={'mb-5 w-full md:mr-2.5'}>
                <InputText
                  label={'Intervalo (horas)'}
                  name={`medicines.${index}.hourInterval`}
                  propsInput={{ type: 'number' }}
                  control={control}
                />
              </div>
            </div>
            <div className={'md:flex w-full'}>
              <div className={'mb-5 w-full md:mr-2.5'}>
                <InputText
                  label={'Dosagem'}
                  name={`medicines.${index}.dosage`}
                  propsInput={{ type: 'number' }}
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
  );
}

export default FormTreatment;
