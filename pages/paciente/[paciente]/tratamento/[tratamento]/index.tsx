import * as React from 'react';
import { useEffect, useState } from 'react';
import Loader from '../../../../../src/components/loader';
import { useSnackbar } from '../../../../../src/context/snackbar';
import { useRouter } from 'next/router';
import PrevPage from '../../../../../src/components/prevPage';
import TreatmentService from '../../../../../src/service/TreatmentService';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../../../src/components/inputText';
import { DatePickerApp } from '../../../../../src/components/datePickerApp';
import { InputMaskApp } from '../../../../../src/components/inputMaskApp';
import PersonPinSharpIcon from '@mui/icons-material/PersonPinSharp';
import VaccinesSharpIcon from '@mui/icons-material/VaccinesSharp';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TreatmentCompleteGet from '../../../../../src/interface/TreatmentCompleteGet';
import FormTreatmentMedicineEdicao from '../../../../../src/components/formTreatmentMedicineEdicao';

function TratamentoDetalhe() {
  const snackbar = useSnackbar();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [patientId, setPatientId] = useState('');
  const [treatment, setTreatment] = useState<TreatmentCompleteGet>();
  const [isEdicaoBlocked, setIsEdicaoBlocked] = useState(true);

  /** form **/
  const { control, reset } = useForm({});

  const fetchData = async (tratamentoId: number) => {
    await TreatmentService.getById(tratamentoId).then(({ data }) => {
      setTreatment(data);
      reset(data);
    }).catch(() => {
      snackbar.showSnackBar('Erro ao buscar tratamento', 'error');
    }).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (router.isReady) {
      const { paciente: pacienteId, tratamento: tratamentoId } = router.query;
      setPatientId(pacienteId?.[0] ?? '');
      setIsLoading(true);
      if (!tratamentoId) return;
      fetchData(Number(tratamentoId[0]));
    }
  }, [router.isReady]);

  return (
    <>
      <PrevPage url={`/paciente/${patientId}`} />
      {isLoading ?
        <Loader /> :
        <div className='mt-5'>
          <form className='w-full'>
            <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
              <PersonPinSharpIcon sx={{ width: 25, height: 25, marginRight: 1 }} />
              <Typography>Paciente</Typography>
            </div>
            <Divider className='mb-5 mt-2 md:mr-2.5' />
            <div className={'md:flex w-full'}>
              <div className={'mb-5 w-full md:mr-2.5'}>
                <InputText
                  label={'Paciente'}
                  propsInput={{ disabled: true }}
                  name={'patient.name'}
                  control={control}
                />
              </div>
              <div className={'mb-5 w-full md:mr-2.5'}>
                <DatePickerApp
                  name={'patient.birthDate'}
                  propsInput={{ disabled: true }}
                  label={'Nascimento'}
                  control={control}
                />
              </div>
              <div className={'mb-5 w-full md:mr-2.5'}>
                <InputMaskApp
                  mask={'999.999.999-99'}
                  propsInput={{ disabled: true }}
                  label={'CPF'}
                  name={'patient.cpf'}
                  control={control}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
              <VaccinesSharpIcon sx={{ width: 25, height: 25, marginRight: 1 }} />
              <Typography>Tratamento</Typography>
            </div>
            <Divider className='mb-5 mt-2 md:mr-2.5' />
            <div className={'md:flex w-full'}>
              <div className={'mb-5 w-full md:mr-2.5'}>
                <InputText
                  label={'Doença'}
                  name={'disease.name'}
                  control={control}
                  propsInput={{ disabled: isEdicaoBlocked }}
                />
              </div>
              <div className={'mb-5 w-full md:mr-2.5'}>
                <DatePickerApp
                  label={'Data inicial'}
                  name={'beginDate'}
                  control={control}
                  propsInput={{ disabled: isEdicaoBlocked }}
                />
              </div>
              <div className={'mb-5 w-full md:mr-2.5'}>
                <DatePickerApp
                  label={'Data final'}
                  name={'endDate'}
                  control={control}
                  propsInput={{ disabled: isEdicaoBlocked }}
                />
              </div>
            </div>
            {treatment?.treatmentMedicines.map((treatmentMedicine, index) => {
              return (
                <FormTreatmentMedicineEdicao key={treatmentMedicine.id}
                  {...{
                    treatmentMedicine,
                    index,
                    control,
                    isEdicaoBlocked,
                  }}
                />
              );
            })}
          </form>
        </div>
      }
    </>
  );
}

export default TratamentoDetalhe;
