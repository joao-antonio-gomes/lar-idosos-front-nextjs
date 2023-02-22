import { Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from '../../src/context/snackbar';
import { useRouter } from 'next/router';
import MedicineService from '../../src/service/MedicineService';
import { FormMedicine } from '../../src/components/formMedicine';

function RemedioCadastro() {
  const snackbar = useSnackbar();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório').nullable(),
    description: Yup.string().required('Descrição é obrigatório').nullable(),
    concentration: Yup.number().required('Concentração é obrigatória').nullable()
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    MedicineService.create(data)
      .then(() => {
        snackbar.showSnackBar('Remédio cadastrado com sucesso', 'success');
        router.push('/remedio');
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          snackbar.showSnackBar(response.data.message, 'error');
          return;
        }
        snackbar.showSnackBar('Houve um erro ao cadastrar o remédio, atualize a página e tente novamente', 'error');
      });
  });

  return (
    <Container>
      <Typography
        variant={'h5'}
        textAlign={'center'}
        className={'mb-10'}>
        Cadastro de Remédio
      </Typography>
      <FormMedicine
        useForm={{
          register,
          handleSubmit,
          control,
          formState: { errors }
        }}
        onSubmit={onSubmit}
      />
    </Container>
  );
}

export default RemedioCadastro;
