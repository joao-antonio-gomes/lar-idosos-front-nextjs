import moment from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react';
import PatientService from '../../src/service/PatientService';
import { Button, Container, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useSnackbar } from '../../src/context/snackbar';
import TableApp from '../../src/components/tableApp/index';
import Patient from '../../src/interface/Patient';
import DataPageable from '../../src/interface/DataPageable';
import PageableFilter from '../../src/interface/PageableFilter';
import TableColumn from '../../src/interface/TableColumn';

const PacienteListagem = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [patients, setPatients] = useState<DataPageable>();
  const [patientFilter, setPatientFilter] = useState<PageableFilter>({ page: 0, size: 10, name: undefined, sort: 'id' });
  const columns: TableColumn[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false },
    { field: 'name', headerName: 'Nome', width: 160, sortable: false, styleRow: { textAlign: 'left' } },
    {
      field: 'age',
      headerName: 'Idade',
      width: 90,
      type: 'number',
      sortable: false
    },
    {
      field: 'birthDate',
      headerName: 'Nascimento',
      disablePadding: false,
      width: 120,
      sortable: false,
      valueGetter: (patient: Patient) => moment(patient.birthDate).format('DD/MM/YYYY')
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 120,
      sortable: false,
      valueGetter: (patient: Patient) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Link href={'/paciente/' + patient.id}>
              <Button
                variant='contained'
                size={'small'}
                style={{ fontWeight: 'bold' }}
                color={'info'}>
                Perfil
              </Button>
            </Link>
          </div>
        );
      }
    }
  ];
  const snackbar = useSnackbar();

  const fetchData = useCallback(() => {
    PatientService.getAll(patientFilter).then(({ data }) => {
      const patientsData = data.content.map((patient: Patient) => {
        patient.age = moment().diff(patient.birthDate, 'years');
        return patient;
      });
      setPatients({ ...data, patientsData });
    });
  }, [patientFilter]);

  let delayTimer: NodeJS.Timeout;
  const handleChangeSearchPatient = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    clearTimeout(delayTimer);

    delayTimer = setTimeout(function() {
      setPatientFilter({ ...patientFilter, name: event.target.value });
    }, 150);
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPatientFilter({ ...patientFilter, page: newPage });
  };

  useEffect(() => {
    fetchData();
  }, [patientFilter]);

  useEffect(() => {
    if (!patients) return;
    setIsLoaded(true);
  }, [patients]);

  return (
    <Container>
      <Typography
        marginBottom={5}
        textAlign='center'
        fontSize={40}
        variant='h3'>
        Pacientes
      </Typography>
      <Link href={'/paciente/cadastro'}>
        <Button
          variant='contained'
          style={{ marginBottom: 20 }}>
          Novo Paciente
        </Button>
      </Link>
      <div style={{ margin: '10px 0 20px', display: 'flex', width: '100%' }}>
        <TextField
          fullWidth={true}
          variant={'standard'}
          label={'Digite um nome para filtrar'}
          onChange={(e) => handleChangeSearchPatient(e)}
        />
      </div>
      {isLoaded && (
        <TableApp
          columns={columns}
          content={patients?.content ?? [{}]}
          count={patients?.totalElements ?? 0}
          page={patients?.pageable.pageNumber ?? 0}
          handlePageChange={handlePageChange}
          noContentText='Não foi encontrado nenhum paciente.'
        />
      )}
    </Container>
  );
};

export default PacienteListagem;
