import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Container, TextField } from '@mui/material';
import { useSnackbar } from '../../src/context/snackbar';
import ConfirmDialog from '../../src/components/confirmDialog';
import MedicineService from '../../src/service/MedicineService';
import Typography from '@mui/material/Typography';
import DataPageable from '../../src/interface/DataPageable';
import PageableFilter from '../../src/interface/PageableFilter';
import TableColumn from '../../src/interface/TableColumn';
import Medicine from '../../src/interface/Medicine';
import TableApp from '../../src/components/tableApp';

function RemediosListagem() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [medicines, setMedicines] = useState<DataPageable>();
  const [openModalDeleteMedicine, setOpenModalDeleteMedicine] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<Medicine | undefined>();
  const [medicineFilter, setMedicineFilter] = useState<PageableFilter>({ page: 0, size: 10, name: undefined, sort: 'id' });
  const columns: TableColumn[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false },
    { field: 'name', headerName: 'Nome', width: 160, sortable: false },
    {
      field: 'concentration',
      headerName: 'Concentração (mg)',
      width: 90,
      type: 'number',
      sortable: false
    },
    {
      field: 'description',
      headerName: 'Descrição',
      disablePadding: false,
      width: 120,
      sortable: false
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 120,
      sortable: false,
      valueGetter: (medicine: Medicine) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Link href={'/remedio/' + medicine.id}>
              <Button
                variant="contained"
                size={'small'}
                style={{ fontWeight: 'bold' }}
                color={'info'}>
                Detalhes
              </Button>
            </Link>
            <Button
              variant="contained"
              size={'small'}
              style={{ fontWeight: 'bold' }}
              onClick={() => handleOpenModalDeleteMedicine(medicine)}
              color={'error'}>
              Excluir
            </Button>
          </div>
        );
      }
    }
  ];
  const snackbar = useSnackbar();

  const handleOpenModalDeleteMedicine = (medicine: Medicine) => {
    setOpenModalDeleteMedicine(true);
    setMedicineToDelete(medicine);
  };

  const handleDeleteMedicine = (medicine: Medicine | undefined) => {
    MedicineService.delete(medicine?.id)
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

  const fetchData = useCallback(() => {
    MedicineService.getAll(medicineFilter).then(({ data }) => {
      setMedicines(data);
    });
  }, [medicineFilter]);

  let delayTimer: NodeJS.Timeout;
  const handleChangeSearchMedicine = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
      setMedicineFilter({ ...medicineFilter, name: event.target.value });
    }, 150);
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
      <Typography
        marginBottom={5}
        textAlign="center"
        fontSize={40}
        variant="h3">
        Remédios
      </Typography>
      <Link href={'/remedio/cadastro'}>
        <Button
          variant="contained"
          style={{ marginBottom: 20 }}>
          Novo Remédio
        </Button>
      </Link>
      <div style={{ margin: '10px 0 20px', display: 'flex', width: '100%' }}>
        <TextField
          fullWidth={true}
          variant={'standard'}
          label={'Digite um nome para filtrar'}
          onChange={(e) => handleChangeSearchMedicine(e)}
        />
      </div>
      {isLoaded && (
        <TableApp
          content={medicines?.content ?? [{}]}
          count={medicines?.totalElements ?? 0}
          page={medicines?.pageable.pageNumber ?? 0}
          columns={columns}
          handlePageChange={handlePageChange}
          noContentText='Não foi encontrado nenhum remédio.'        />
      )}
      {openModalDeleteMedicine && (
        <ConfirmDialog
          textButtonAgree={'Sim'}
          textButtonCancel={'Cancelar'}
          dialogTitle={`Você deseja excluir o remédio ${medicineToDelete?.name}?`}
          dialogText={
            'Essa ação é irreversível e irá excluir o remédio cadastrado. O remédio só poderá ser excluído se não tiver sido utilizado em tratamentos.'
          }
          handleAgree={() => handleDeleteMedicine(medicineToDelete)}
          handleClose={() => setOpenModalDeleteMedicine(false)}
        />
      )}
    </Container>
  );
}

export default RemediosListagem;
