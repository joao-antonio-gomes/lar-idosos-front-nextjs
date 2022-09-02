import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import InputMask from 'react-input-mask';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import PatientService from '../../src/service/PatientService';
import {useEffect, useState} from 'react';
import UserService from '../../src/service/UserService';
import {useSnackbar} from '../../src/context/snackbar';
import {useRouter} from 'next/router';

function PacienteCadastro() {
  const [genderList, setGenderList] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const snackbar = useSnackbar();
  const router = useRouter();

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
    birthDate: Yup.date().required('Data de nascimento é obrigatório'),
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
          snackbar.showSnackBar("Paciente cadastrado com sucesso", "success")
          router.push('/paciente');
        })
        .catch(({response}) => {
          if (response.status === 400) {
            snackbar.showSnackBar(response.data.message, "error");
            return;
          }
          snackbar.showSnackBar("Houve um erro ao cadastrar o paciente, atualize a página e tente novamente", "error")
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
                  <TextField className={'w-full'} id='outlined-basic' label='Nome'
                             helperText={errors.name ? errors.name.message : null}
                             variant='outlined' {...register('name')}
                             error={!!errors.name} />
                </div>
                <div className={'mb-5 w-full md:ml-2.5'}>
                  <InputMask mask={'999.999.999-99'} {...register('cpf')}>
                    {() => <TextField className={'w-full'} {...register('cpf')} id='outlined-basic' label='CPF'
                                      helperText={errors.cpf ? errors.cpf.message : null}
                                      variant='outlined' error={!!errors.cpf} />}
                  </InputMask>
                </div>
                <div className={'mb-5 w-full md:ml-2.5'}>
                  <TextField
                      select
                      fullWidth
                      label="Gênero"
                      defaultValue=''
                      inputProps={register('gender', {
                        required: 'Please enter currency',
                      })}
                      {...register('gender')}
                      error={errors.gender}
                      helperText={errors.gender?.message}
                  >
                    {genderList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className={'md:flex w-full'}>
                <div className={'mb-5 w-full md:mr-2.5'}>
                  <Controller name={'birthDate'} control={control} defaultValue={null}
                              helperText={errors.birthDate ? errors.birthDate.message : null}
                              {...register('birthDate')} render={({ field, ...props }) => {
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                              className={'w-full'}
                              label='Nascimento'
                              openTo={'year'}
                              inputFormat={'DD/MM/YYYY'}
                              name={'birthDate'}
                              maxDate={dayjs().subtract(60, 'years')}
                              minDate={dayjs().subtract(110, 'years')}
                              mask={'__/__/____'}
                              value={field.value}
                              onChange={(e) => field.onChange(e)}
                              renderInput={(params) => <TextField error={!!errors.birthDate}
                                                                  helperText={errors.birthDate ? errors.birthDate.message : null}
                                                                  {...params} />}
                          />
                        </LocalizationProvider>
                    );
                  }} />
                </div>
                <div className={'mb-5 w-full md:ml-2.5'}>
                  <InputMask mask={'(99) 9 9999-9999'} {...register('phone')}>
                    {() => <TextField className={'w-full'} {...register('phone')} id='outlined-basic' label='Celular'
                                      helperText={errors.phone ? errors.phone.message : null}
                                      variant='outlined' error={!!errors.phone} />}
                  </InputMask>
                </div>
              </div>

              <Button variant='contained' type={'submit'}>Cadastrar</Button>
            </form>
        }
      </Container>
  );
}

export default PacienteCadastro;
