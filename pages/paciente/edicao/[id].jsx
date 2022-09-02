import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import PatientService from '../../../src/service/PatientService';
import {Container, TextField, Typography} from '@mui/material';
import {useSnackbar} from '../../../src/context/snackbar';

function PacienteEdicao() {
  const router = useRouter();
  const { id } = router.query;
  const snackbar = useSnackbar();
  const [isLoaded, setIsLoaded] = useState(false);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (!id) {
      snackbar.showSnackBar('Não foi identificado id do paciente, por favor, volte para página anterior e clique novamente em editar',
          'error');
      return;
    }
    PatientService.getById(id)
        .then(({ data }) => {
          console.log(data);
          setPatient(data);
        })
  }, []);

  useEffect(() => {
    if (patient === null) return;
    setIsLoaded(true);
  }, [patient]);


  return (
      <Container>
        <Typography variant={'h5'} textAlign={'center'} style={{ marginBottom: 20 }}>
          Edição de paciente
        </Typography>
        {
            isLoaded &&
            (
                <>
                  <TextField id='outlined-basic' label='Nome' variant='outlined' defaultValue={patient.name} />
                </>
            )
        }
      </Container>
  );
}

export default PacienteEdicao;
