import React, {useEffect, useState} from 'react';
import {InputText} from '../inputText';
import {DatePickerApp} from '../datePickerApp';
import AutocompleteApp from '../autocompleteApp';
import {SelectApp} from '../selectApp';
import {Button, DialogActions} from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {useFieldArray} from 'react-hook-form';

function FormTreatment({ onSubmit, useForm, medicinesList, dosageType, patient, handleClose }) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm;

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'medicines',
    rules: {
    },
  });

  const appendRemedio = () => {
    append({
      medicine: "",
      hourInterval: "",
      dosage: "",
      dosageType: "",
    });
  };

  return (
      <form onSubmit={onSubmit} className='mx-5'>
        <div className={'md:flex w-full'}>
          <div className={'mb-5 w-full md:mr-2.5'}>
            <InputText label={'Nome Paciente'}
                       name={'name'}
                       propsInput={{ disabled: true }}
                       defaultValue={patient.name}
                       register={register}
                       control={control} />
          </div>
          <div className={'mb-5 w-full md:mr-2.5'}>
            <InputText label={'Doença'}
                       name={'disease'}
                       register={register}
                       control={control} />
          </div>
        </div>
        <div className={'md:flex w-full'}>
          <div className={'mb-5 w-full md:mr-2.5'}>
            <DatePickerApp label={'Inicio do Tratamento'}
                           name={'beginDate'}
                           register={register}
                           control={control} />
          </div>
          <div className={'mb-5 w-full md:mr-2.5'}>
            <DatePickerApp label={'Fim do Tratamento'}
                           name={'endDate'}
                           register={register}
                           control={control} />
          </div>
        </div>
        <Button variant='contained' className='mb-4' onClick={() => appendRemedio()}>Adicionar Remédio</Button>
        {fields.map((field, index) => {
          return (
              <div key={`container-remedio-${index}`}>
                <Divider />
                <div className='flex justify-between mt-3'>
                  <Typography marginTop={1}>Remédio {index + 1}</Typography>
                  <Button variant='contained' color='error' onClick={() => remove(index)}>Remover</Button>
                </div>
                <div className={'mt-3 md:flex w-full'}>
                  <div className={'mb-5 w-full md:mr-2.5'}>
                    <AutocompleteApp
                        register={register}
                        control={control}
                        options={medicinesList}
                        name={`medicines.${index}.medicine`}
                        errors={errors}
                        label='Remédios' />
                  </div>
                  <div className={'mb-5 w-full md:mr-2.5'}>
                    <InputText label={'Intervalo (horas)'}
                               name={`medicines.${index}.hourInterval`}
                               propsInput={{ type: 'number' }}
                               register={register}
                               control={control} />
                  </div>
                </div>
                <div className={'md:flex w-full'}>
                  <div className={'mb-5 w-full md:mr-2.5'}>
                    <InputText label={'Dosagem'}
                               name={`medicines.${index}.dosage`}
                               propsInput={{ type: 'number' }}
                               register={register}
                               control={control} />
                  </div>
                  <div className={'mb-5 w-full md:mr-2.5'}>
                    <SelectApp label={'Tipo da Dosagem'}
                               name={`medicines.${index}.dosageType`}
                               options={dosageType}
                               register={register}
                               control={control} />
                  </div>
                </div>
                <Divider />
              </div>
          )
        })}
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type='submit' autoFocus>Cadastrar</Button>
        </DialogActions>
      </form>
  );
}

export default FormTreatment;
