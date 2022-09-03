import {Button, Container, TextField, Typography} from '@mui/material';
import InputMask from 'react-input-mask';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import PatientService from '../../src/service/PatientService';
import {useEffect, useState} from 'react';
import UserService from '../../src/service/UserService';
import {useSnackbar} from '../../src/context/snackbar';
import {useRouter} from 'next/router';
import {SelectApp} from '../../src/components/selectApp';
import {DatePickerApp} from '../../src/components/datePickerApp';
import {InputText} from '../../src/components/inputText';
import {InputMaskApp} from '../../src/components/inputMaskApp';

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
    console.log(data);
    return;
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
            <form onSubmit={onSubmit}>
              <div className={'md:flex w-full'}>
                <div className={'mb-5 w-full md:mr-2.5'}>
                  <InputText name={'name'}
                             register={register}
                             label={'Nome'}
                             error={errors.name}
                             errorMessage={errors.name?.message} />
                </div>
                <div className={'mb-5 w-full md:ml-2.5'}>
                  <InputMaskApp mask={'999.999.999-99'}
                                label='CPF'
                                name={'cpf'}
                                register={register}
                                error={errors.cpf}
                                errorMessage={errors.cpf?.message} />
                </div>
                <div className={'mb-5 w-full md:ml-2.5'}>
                  <SelectApp label={'Gênero'}
                             options={genderList}
                             register={register}
                             name={'gender'}
                             error={errors.gender}
                             errorMessage={errors.gender?.message}
                             {...register('gender')} />
                </div>
              </div>
              <div className={'md:flex w-full'}>
                <div className={'mb-5 w-full md:mr-2.5'}>
                  <DatePickerApp minDate={minDate}
                                 maxDate={maxDate}
                                 name={'birthDate'}
                                 label={'Nascimento'}
                                 register={register}
                                 control={control}
                                 error={errors.birthDate}
                                 errorMessage={errors.birthDate?.message} />
                </div>
                <div className={'mb-5 w-full md:ml-2.5'}>
                  <InputMaskApp mask={'(99) 9 9999-9999'}
                                error={errors.phone}
                                label='Celular'
                                name={'phone'}
                                register={register}
                                errorMessage={errors.phone?.message} />
                </div>
              </div>

              <Button variant='contained' type={'submit'}>Cadastrar</Button>
            </form>
        }
      </Container>
  );
}

export default PacienteCadastro;
