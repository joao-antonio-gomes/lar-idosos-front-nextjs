import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import PatientService from '../../../src/service/PatientService';
import {Container, Typography} from '@mui/material';
import {useSnackbar} from '../../../src/context/snackbar';
import dayjs from 'dayjs';
import UserService from '../../../src/service/UserService';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {PatientForm} from '../../../src/components/patientForm';

function PacienteEdicao() {
  const minDate = dayjs().subtract(60, 'years');
  const maxDate = dayjs().subtract(110, 'years');

  const snackbar = useSnackbar();
  const router = useRouter();
  const [patient, setPatient] = useState(null);
  const [genderList, setGenderList] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string().required('CPF é obrigatório'),
    birthDate: Yup.date()
        .required('Data de nascimento é obrigatório')
        .max(minDate, `Data mínima ${minDate.format('DD/MM/YYYY')}`)
        .min(maxDate, `Data máxima ${maxDate.format('DD/MM/YYYY')}`)
        .typeError('Data inválida'),
    phone: Yup.string().required('Celular é obrigatório'),
    gender: Yup.string().required('Gênero é obrigatório'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
  }, []);

  useEffect(() => {
    if(router.isReady){
      const { id } = router.query;
      if (!id) return null;
      UserService.getGender()
          .then(({ data }) => setGenderList(data));
      PatientService.getById(id)
          .then(({ data }) => {
            setPatient(data);
          });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (patient === null || genderList === null) return;
    reset(patient);
    setIsLoaded(true);
  }, [patient, genderList]);

  const onSubmit = handleSubmit((data) => {
    PatientService.patch(data)
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
  });

  return (
      <Container>
        <Typography variant={'h5'} textAlign={'center'} className={'mb-10'}>
          Edição de Paciente
        </Typography>
        {isLoaded &&
            <PatientForm genderList={genderList} useForm={{
              register,
              handleSubmit,
              control,
              formState: { errors },
              reset,
            }} onSubmit={onSubmit} />
        }
      </Container>
  );
}

export default PacienteEdicao;
