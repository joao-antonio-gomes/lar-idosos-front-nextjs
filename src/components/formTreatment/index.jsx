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
    watch,
    register,
    getValues,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm;


  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
  } = useFieldArray({
    control,
    name: 'medicines',
    rules: {
    }
  });

  useEffect(() => {
    let subscribe = watch((value, { name, type }) => {
      if (name !== 'quantidade-remedios') return;
      setNumeroRemedios(value['quantidade-remedios']);
    });
  }, [watch]);

  const [numeroRemedios, setNumeroRemedios] = useState(0);
  const handleNumeroRemedios = (e) => {
    setNumeroRemedios(e.target.value);
  };

  const containerRemedio = (id) => {
    return (
        <div id={`container-remedio-${id}`}>
          <Divider />
          <Typography marginTop={1}>Remédio {id + 1}</Typography>
          <div className={'mt-3 md:flex w-full'}>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <AutocompleteApp
                  register={register}
                  control={control}
                  options={medicinesList}
                  name={`medicine-${id}`}
                  errors={errors}
                  label='Remédios' />
            </div>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <InputText label={'Intervalo (horas)'}
                         name={`hourInterval-${id}`}
                         propsInput={{ type: 'number' }}
                         register={register}
                         control={control} />
            </div>
          </div>
          <div className={'md:flex w-full'}>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <InputText label={'Dosagem'}
                         name={`dosage-${id}`}
                         propsInput={{ type: 'number' }}
                         register={register}
                         control={control} />
            </div>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <SelectApp label={'Tipo da Dosagem'}
                         name={`dosageType-${id}`}
                         options={dosageType}
                         register={register}
                         control={control} />
            </div>
          </div>
          <Divider />
        </div>
    );
  };

  const renderContainerRemedio = () => {
    let remediosArrayTemp = [];
    for (let i = 0; i < numeroRemedios; i++) {
      remediosArrayTemp.push(containerRemedio(i));
    }
    return remediosArrayTemp;
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
        <div className={'md:flex w-full'}>
          <div className={'mb-5 w-full md:mr-2.5'}>
            <InputText label={'Quantidade de remédios'}
                       name={`quantidade-remedios`}
                       defaultValue={'0'}
                       helperText='Por favor, escolha no máximo 10 remédios'
                       propsInput={{ type: 'number', InputProps: { inputProps: { min: 0, max: 10 } } }}
                       register={register}
                       control={control} />
          </div>
        </div>
        {renderContainerRemedio()}
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type='submit' autoFocus>Cadastrar</Button>
        </DialogActions>
      </form>
  );
}

export default FormTreatment;
