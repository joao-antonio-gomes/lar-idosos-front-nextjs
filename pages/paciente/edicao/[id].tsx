import { Container, Typography } from '@mui/material';
import { FormPatientEdicao } from '../../../src/components/formPatientEdicao';

function PacienteEdicao() {

  return (
    <Container>
      <Typography
        variant={'h5'}
        textAlign={'center'}
        className={'mb-10'}>
        Edição de Paciente
      </Typography>
      <FormPatientEdicao />
    </Container>
  );
}

export default PacienteEdicao;
