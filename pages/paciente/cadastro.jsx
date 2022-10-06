import {Container, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import PatientService from '../../src/service/PatientService';
import {useEffect, useState} from 'react';
import UserService from '../../src/service/UserService';
import {useSnackbar} from '../../src/context/snackbar';
import {useRouter} from 'next/router';
import {FormPatient} from '../../src/components/formPatient';

function PacienteCadastro() {
  const [genderList, setGenderList] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const snackbar = useSnackbar();
  const router = useRouter();
  const minDate = dayjs().subtract(60, 'years');
  const maxDate = dayjs().subtract(110, 'years');

  useEffect(() => {
    UserService.getGender()
        .then(({ data }) => setGenderList(data));
  }, []);

  useEffect(() => {
    if (genderList === null) return;
    setIsLoaded(true);
  }, [genderList]);


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
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit((data) => {
    PatientService.create(data)
        .then((response) => {
          snackbar.showSnackBar('Paciente cadastrado com sucesso', 'success');
          router.push('/paciente');
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            snackbar.showSnackBar(response.data.message, 'error');
            return;
          }
          snackbar.showSnackBar('Houve um erro ao cadastrar o paciente, atualize a página e tente novamente', 'error');
        });
  });

  return (
      <Container>
        <Typography variant={'h5'} textAlign={'center'} className={'mb-10'}>
          Cadastro de Paciente
        </Typography>
        {isLoaded &&
            <FormPatient genderList={genderList} useForm={{
              register,
              handleSubmit,
              control,
              formState: { errors },
            }} onSubmit={onSubmit} />
        }
      </Container>
  );
}

export default PacienteCadastro;
