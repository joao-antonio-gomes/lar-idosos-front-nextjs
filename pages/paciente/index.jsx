import moment from 'moment/moment';
import {useEffect, useState} from 'react';
import PatientService from '../../src/service/PatientService';
import {TableApp} from '../../src/components/tableApp';
import {Button, Container} from '@mui/material';
import Link from 'next/link';

function PacienteListagem() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [patients, setPatients] = useState(null);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false },
    { field: 'name', headerName: 'Nome', width: 160, sortable: false, styleRow: {textAlign: 'left'}},
    {
      field: 'age',
      headerName: 'Idade',
      width: 90,
      type: 'number',
      sortable: false,
    },
    {
      field: 'birthDate',
      headerName: 'Nascimento',
      disablePadding: false,
      width: 120,
      sortable: false,
      valueGetter: (patient) => moment(patient.birthDate).format('DD/MM/YYYY'),
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      width: 120,
      sortable: false,
    },
    {
      headerName: 'Ações',
      width: 120,
      sortable: false,
      valueGetter: (patient) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Link href={'/paciente/edicao/' + patient.id}>
                <Button variant='contained' size={'small'} style={{ fontWeight: 'bold' }}
                        color={'success'}>Editar</Button>
              </Link>
              <Button variant='contained' size={'small'} style={{ fontWeight: 'bold' }}
                      color={'error'}>Excluir</Button>
            </div>
        );
      },
    },
  ];

  useEffect(() => {
    PatientService.getAll()
        .then(({ data }) => {
          data = data.map(patient => {
            patient.age = moment().diff(patient.birthDate, 'years');
            return patient;
          });
          setPatients(data);
        });
  }, []);

  useEffect(() => {
    if (patients === null) return;
    setIsLoaded(true);
  }, [patients]);


  return (
      <Container>
        <Link href={'/paciente/cadastro'}>
          <Button variant='contained' style={{ marginBottom: 20 }}>Novo Paciente</Button>
        </Link>
        {isLoaded && <TableApp columns={columns} rows={patients} />}
      </Container>
  );
}

export default PacienteListagem;
