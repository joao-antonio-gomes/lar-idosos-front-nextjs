import moment from 'moment/moment';
import {useCallback, useEffect, useState} from 'react';
import PatientService from '../../src/service/PatientService';
import {TableApp} from '../../src/components/tableApp';
import {Button, Container, TextField} from '@mui/material';
import Link from 'next/link';
import ConfirmDialog from '../../src/components/confirmDialog';
import {useSnackbar} from '../../src/context/snackbar';

function PacienteListagem() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [patients, setPatients] = useState();
  const [openModalDeletePatient, setOpenModalDeletePatient] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState();
  const [patientFilter, setPatientFilter] = useState({ page: 0, itemsPerPage: 10, name: null });
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false },
    { field: 'name', headerName: 'Nome', width: 160, sortable: false, styleRow: { textAlign: 'left' } },
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
                      onClick={() => handleOpenModalDeletePatient(patient)}
                      color={'error'}>Excluir</Button>
            </div>
        );
      },
    },
  ];
  const snackbar = useSnackbar();

  const handleOpenModalDeletePatient = (patient) => {
    setOpenModalDeletePatient(true);
    setPatientToDelete(patient);
  };

  const handleDeletePatient = (patient) => {
    PatientService.delete(patient.id)
        .then((response) => {
          snackbar.showSnackBar('Paciente excluído com sucesso', 'success');
          fetchData();
        })
        .catch(({ response }) => {
          if (response.data.message) {
            snackbar.showSnackBar(response.data.message, 'error');
            return;
          }
          snackbar.showSnackBar('Houve um erro ao excluir o paciente, atualize a página e tente novamente', 'error');
        })
        .finally(() => {
          setOpenModalDeletePatient(false);
        });
  };

  const fetchData = useCallback(
      () => {
        PatientService.getAll(patientFilter)
            .then(({ data }) => {
              const patientsData = data.result.map(patient => {
                patient.age = moment().diff(patient.birthDate, 'years');
                return patient;
              });
              setPatients({ ...data, result: patientsData });
            });
      },
      [patientFilter],
  );

  let delayTimer;
  const handleChangeSearchPatient = (e) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
      setPatientFilter({ ...patientFilter, name: e.target.value });
    }, 700);
  };

  const handlePageChange = (e, newPage) => {
    console.log('chamado');
    console.log(newPage);
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
        <Link href={'/paciente/cadastro'}>
          <Button variant='contained' style={{ marginBottom: 20 }}>Novo Paciente</Button>
        </Link>
        <div style={{ margin: '10px 0 20px', display: 'flex', width: '100%' }}>
          <TextField fullWidth={'100%'} variant={'standard'} label={'Digite um nome para filtrar'}
                     onChange={(e) => handleChangeSearchPatient(e)} />
        </div>
        {isLoaded && <TableApp columns={columns} {...patients} handlePageChange={handlePageChange} />}
        {openModalDeletePatient && <ConfirmDialog textButtonAgree={'Sim'} textButtonCancel={'Cancelar'}
                                                  dialogTitle={`Você deseja excluir o paciente ${patientToDelete.name}?`}
                                                  dialogText={'Essa ação é irreversível e irá excluir todos os dados do paciente na clínica.'}
                                                  handleAgree={() => handleDeletePatient(patientToDelete)}
                                                  handleClose={() => setOpenModalDeletePatient(false)} />}
      </Container>
  );
}

export default PacienteListagem;
