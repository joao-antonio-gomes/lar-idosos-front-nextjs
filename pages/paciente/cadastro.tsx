import { Container, Typography } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import PatientService from '../../src/service/PatientService';
import { useEffect, useState } from 'react';
import PersonService from '../../src/service/PersonService';
import { useSnackbar } from '../../src/context/snackbar';
import { useRouter } from 'next/router';
import { FormPatientCadastro } from '../../src/components/formPatientCadastro';
import { validateBr } from 'js-brasil';
import Enum from '../../src/interface/Enum';
import Patient from '../../src/interface/Patient';

function PacienteCadastro() {
  const [genderList, setGenderList] = useState<Enum[]>([]);
  const [maritalStatusList, setMaritalStatusList] = useState<Enum[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const snackbar = useSnackbar();
  const router = useRouter();
  const minDate = dayjs().subtract(60, 'years');
  const maxDate = dayjs().subtract(110, 'years');

  useEffect(() => {
    PersonService.getGender().then(({ data }) => setGenderList(data));
    PersonService.getMaritalStatus().then(({ data }) => setMaritalStatusList(data));
  }, []);

  useEffect(() => {
    if (genderList.length < 1 && maritalStatusList.length < 1) return;
    setIsLoaded(true);
  }, [genderList]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string().required('CPF é obrigatório').test('cpf', 'CPF inválido', (value) => {
      if (!value) return false;
      return validateBr.cpf(value);
    }),
    birthDate: Yup.date()
      .required('Data de nascimento é obrigatório')
      .max(minDate, `Data mínima ${minDate.format('DD/MM/YYYY')}`)
      .min(maxDate, `Data máxima ${maxDate.format('DD/MM/YYYY')}`)
      .typeError('Data inválida'),
    gender: Yup.string().required('Gênero é obrigatório'),
    maritalStatus: Yup.string().required('Estado civil é obrigatório'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  function buildResponsible(data: FieldValues) {
      return data.responsible?.value ? {id: Number(data.responsible.value)} : undefined;
  }

  const onSubmit = handleSubmit((data) => {
    data = {
      ...data,
      responsible: buildResponsible(data),
    }
    PatientService.create(data)
      .then((response) => {
        const patient: Patient = response.data;
        snackbar.showSnackBar('Paciente cadastrado com sucesso', 'success');
        router.push(`/paciente/${patient.id}`);
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
      <Typography
        variant={'h5'}
        textAlign={'center'}
        className={'mb-10'}>
        Cadastro de Paciente
      </Typography>
      {isLoaded && (
        <FormPatientCadastro
          genderList={genderList}
          maritalStatusList={maritalStatusList}
          useForm={{
            register,
            handleSubmit,
            control,
            formState: { errors }
          }}
          onSubmit={onSubmit}
        />
      )}
    </Container>
  );
}

export default PacienteCadastro;
