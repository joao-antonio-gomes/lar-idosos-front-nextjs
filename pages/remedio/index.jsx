import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import Link from 'next/link';
import {Button, Container, TextField} from '@mui/material';
import {useSnackbar} from '../../src/context/snackbar';
import {TableApp} from '../../src/components/tableApp';
import ConfirmDialog from '../../src/components/confirmDialog';
import MedicineService from '../../src/service/MedicineService';
import Typography from '@mui/material/Typography';

function RemediosListagem(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [medicines, setMedicines] = useState();
  const [openModalDeleteMedicine, setOpenModalDeleteMedicine] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState();
  const [medicineFilter, setMedicineFilter] = useState({ page: 0, itemsPerPage: 10, name: null });
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false },
    { field: 'name', headerName: 'Nome', width: 160, sortable: false },
    {
      field: 'concentration',
      headerName: 'Concentração (mg)',
      width: 90,
      type: 'number',
      sortable: false,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      disablePadding: false,
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
              <Link href={'/remedio/' + patient.id}>
                <Button variant='contained' size={'small'} style={{ fontWeight: 'bold' }}
                        color={'info'}>Detalhes</Button>
              </Link>
              <Link href={'/remedio/edicao/' + patient.id}>
                <Button variant='contained' size={'small'} style={{ fontWeight: 'bold' }}
                        color={'success'}>Editar</Button>
              </Link>
              <Button variant='contained' size={'small'} style={{ fontWeight: 'bold' }}
                      onClick={() => handleOpenModalDeleteMedicine(patient)}
                      color={'error'}>Excluir</Button>
            </div>
        );
      },
    },
  ];
  const snackbar = useSnackbar();

  const handleOpenModalDeleteMedicine = (patient) => {
    setOpenModalDeleteMedicine(true);
    setMedicineToDelete(patient);
  };

  const handleDeleteMedicine = (patient) => {
    MedicineService.delete(patient.id)
        .then((response) => {
          snackbar.showSnackBar('Remédio excluído com sucesso', 'success');
          fetchData();
        })
        .catch(({ response }) => {
          if (response.data.message) {
            snackbar.showSnackBar(response.data.message, 'error');
            return;
          }
          snackbar.showSnackBar('Houve um erro ao excluir o remédio, atualize a página e tente novamente', 'error');
        })
        .finally(() => {
          setOpenModalDeleteMedicine(false);
        });
  };

  const fetchData = useCallback(
      () => {
        MedicineService.getAll(medicineFilter)
            .then(({ data }) => {
              const patientsData = data.result.map(patient => {
                patient.age = moment().diff(patient.birthDate, 'years');
                return patient;
              });
              setMedicines({ ...data, result: patientsData });
            });
      },
      [medicineFilter],
  );

  let delayTimer;
  const handleChangeSearchMedicine = (e) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
      setMedicineFilter({ ...medicineFilter, name: e.target.value });
    }, 700);
  };

  const handlePageChange = (e, newPage) => {
    setMedicineFilter({ ...medicineFilter, page: newPage });
  };

  useEffect(() => {
    fetchData();
  }, [medicineFilter]);


  useEffect(() => {
    if (!medicines) return;
    setIsLoaded(true);
  }, [medicines]);


  return (
      <Container>
        <Typography marginBottom={5} textAlign='center' fontSize={40} variant='h3'>Remédios</Typography>
        <Link href={'/remedio/cadastro'}>
          <Button variant='contained' style={{ marginBottom: 20 }}>Novo Remédio</Button>
        </Link>
        <div style={{ margin: '10px 0 20px', display: 'flex', width: '100%' }}>
          <TextField fullWidth={'100%'} variant={'standard'} label={'Digite um nome para filtrar'}
                     onChange={(e) => handleChangeSearchMedicine(e)} />
        </div>
        {isLoaded && <TableApp columns={columns} {...medicines} handlePageChange={handlePageChange} noContentText='Não foi encontrado nenhum remédio.' />}
        {openModalDeleteMedicine && <ConfirmDialog textButtonAgree={'Sim'} textButtonCancel={'Cancelar'}
                                                  dialogTitle={`Você deseja excluir o remédio ${medicineToDelete.name}?`}
                                                  dialogText={'Essa ação é irreversível e irá excluir o remédio cadastrado. O remédio só poderá ser excluído se não tiver sido utilizado em tratamentos.'}
                                                  handleAgree={() => handleDeleteMedicine(medicineToDelete)}
                                                  handleClose={() => setOpenModalDeleteMedicine(false)} />}
      </Container>
  );
}

export default RemediosListagem;
