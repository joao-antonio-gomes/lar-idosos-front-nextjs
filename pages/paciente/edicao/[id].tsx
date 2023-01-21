import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PatientService from '../../../src/service/PatientService';
import { Button, Container, Typography } from '@mui/material';
import { useSnackbar } from '../../../src/context/snackbar';
import dayjs from 'dayjs';
import UserService from '../../../src/service/UserService';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import Enum from '../../../src/interface/Enum';
import FormPatientEdicaoValues from '../../../src/interface/FormPatientEdicaoValues';
import { InputText } from '../../../src/components/inputText';
import { InputMaskApp } from '../../../src/components/inputMaskApp';
import { SelectApp } from '../../../src/components/selectApp';
import { DatePickerApp } from '../../../src/components/datePickerApp';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormPatientEdicao } from '../../../src/components/formPatient/FormPatientEdicao';

function PacienteEdicao() {
  const minDate = dayjs().subtract(60, 'years');
  const maxDate = dayjs().subtract(110, 'years');

  const snackbar = useSnackbar();
  const router: NextRouter = useRouter();
  const [patient, setPatient] = useState(null);
  const [genderList, setGenderList] = useState<Enum[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string().required('CPF é obrigatório'),
    birthDate: Yup.date()
      .required('Data de nascimento é obrigatório')
      .max(minDate, `Data mínima ${minDate.format('DD/MM/YYYY')}`)
      .min(maxDate, `Data máxima ${maxDate.format('DD/MM/YYYY')}`)
      .typeError('Data inválida'),
    gender: Yup.string().required('Gênero é obrigatório')
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormPatientEdicaoValues>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    if (!id) return;

    UserService.getGender().then(({ data }) => setGenderList(data));
    PatientService.getById(id).then(({ data }) => {
      setPatient(data);
    });
  }, [router.isReady]);

  useEffect(() => {
    if (patient === null || genderList === null) return;
    reset(patient);
    setIsLoaded(true);
  }, [patient, genderList]);

  const onSubmit = (data: FormPatientEdicaoValues): void => {
    console.log(data);
    // PatientService.patch(data)
    //   .then((response) => {
    //     snackbar.showSnackBar('Paciente atualizado com sucesso', 'success');
    //     router.push('/paciente');
    //   })
    //   .catch(({ response }) => {
    //     if (response.status === 400) {
    //       snackbar.showSnackBar(response.data.message, 'error');
    //       return;
    //     }
    //     snackbar.showSnackBar('Houve um erro ao atualizar o paciente, atualize a página e tente novamente', 'error');
    //   });
  };

  return (
    <Container>
      <Typography
        variant={'h5'}
        textAlign={'center'}
        className={'mb-10'}>
        Edição de Paciente
      </Typography>
      {isLoaded && (
        <FormPatientEdicao
          genderList={genderList}
          useForm={{
            register,
            control,
            formState: { errors },
            reset
          }}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
    </Container>
  );
}

export default PacienteEdicao;
