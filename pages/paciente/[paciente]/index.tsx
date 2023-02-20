import { Avatar, Button, Chip, Container, Grid, Popover } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PatientService from '../../../src/service/PatientService';
import { useRouter } from 'next/router';
import Loader from '../../../src/components/loader';
import { useSnackbar } from '../../../src/context/snackbar';
import PrevPage from '../../../src/components/prevPage';
import PersonPinSharpIcon from '@mui/icons-material/PersonPinSharp';
import VaccinesSharpIcon from '@mui/icons-material/VaccinesSharp';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TreatmentDialog from '../../../src/components/treatmentDialog';
import Link from 'next/link';
import Patient from '../../../src/interface/Patient';
import ConfirmDialog from '../../../src/components/confirmDialog';
import { capitalize, formataCpf } from '../../../src/service/Utils';
import TableApp from '../../../src/components/tableApp';
import TableColumn from '../../../src/interface/TableColumn';
import { TreatmentStatus } from '../../../src/interface/TreatmentStatus';
import DataPageable from '../../../src/interface/DataPageable';
import PageableFilter from '../../../src/interface/Pageable';
import TreatmentGet from '../../../src/interface/TreatmentGet';

function PacientePerfil() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [patient, setPatient] = useState<Patient>();
  const [treatments, setTreatments] = useState<DataPageable>();
  const [treatmentFilter, setTreatmentFilter] = useState<PageableFilter>({ page: 0, size: 10, name: undefined, sort: 'id' });
  const [isLoading, setIsLoading] = useState(true);
  const [openModalTreatment, setOpenModalTreatment] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [openModalDeletePatient, setOpenModalDeletePatient] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | undefined>();
  const openPopover = Boolean(anchorEl);

  const handleDeletePatient = (patient: Patient | undefined) => {
    if (!patient) return;
    PatientService.delete(patient.id)
      .then(() => {
        snackbar.showSnackBar('Paciente excluído com sucesso', 'success');
        router.push(`/paciente/`);
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

  const handleOpenModalDeletePatient = (patient: Patient | undefined) => {
    if (!patient) return;
    setOpenModalDeletePatient(true);
    setPatientToDelete(patient);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const fetchPatientData = async (id: number) => {
    await PatientService.getById(id)
      .then(({ data }) => {
        setPatient(data);
      })
      .catch(() =>
        snackbar.showSnackBar('Houve um erro ao carregar os dados, atualize a página e tente novamente', 'error')
      )

    await PatientService.getTreatments(id, treatmentFilter)
      .then(({ data }) => {
        setTreatments(data);
      })
      .catch(() =>
        snackbar.showSnackBar('Houve um erro ao carregar os dados, atualize a página e tente novamente', 'error')
      )
      .finally(() => setIsLoading(false));
  }

  const treatmentColumns: TableColumn[] = [
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      valueGetter: (treatment: TreatmentGet) => {
        if (!treatment || !treatment.status) {
          return '';
        }

        // @ts-ignore
        return <Chip label={TreatmentStatus[treatment.status].name} color={TreatmentStatus[treatment.status].color} />;
      }
    },
    {
      field: 'disease',
      headerName: 'Doença',
      sortable: true,
      valueGetter: (treatment: TreatmentGet) => {
        if (!treatment || !treatment.status) {
          return '';
        }

        return treatment.disease.name;
      }
    },
    {
      field: 'beginDate',
      headerName: 'Data de início',
      sortable: true,
      valueGetter: (treatment: TreatmentGet) => moment(treatment.beginDate).format('DD/MM/YYYY')
    },
    {
      field: 'endDate',
      headerName: 'Data final',
      sortable: true,
      valueGetter: (treatment: TreatmentGet) => moment(treatment.endDate).format('DD/MM/YYYY')
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 120,
      sortable: false,
      valueGetter: (treatment: TreatmentGet) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Link href={`/paciente/${patient?.id}/tratamento/${treatment.id}`}>
              <Button
                variant='contained'
                size={'small'}
                style={{ fontWeight: 'bold' }}
                color={'info'}>
                Detalhes
              </Button>
            </Link>
          </div>
        );
      }
    }
  ];

  const handlePageChangeTreatment = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setTreatmentFilter({ ...treatmentFilter, page: newPage });
  };

  useEffect(() => {
    if (router.isReady) {
      const { paciente: id } = router.query;
      setIsLoading(true);
      fetchPatientData(Number(id));
    }
  }, [router.isReady, treatmentFilter]);

  return (
    <>
      <PrevPage url={'/paciente'} />
      <Container sx={{ marginTop: 5 }}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid
              container
              justifyContent={'space-between'}
              marginBottom={1}>
              <div style={{display: 'flex', alignItems: 'center', width: '30%', }}>
                <PersonPinSharpIcon sx={{ width: 25, height: 25, marginRight: 1 }} />
                <Typography>Informações Pessoais</Typography>
              </div>
              <div style={{display: 'flex', alignItems: 'center' }}>
                <Link href={'/paciente/edicao/' + patient?.id}>
                  <Button
                    variant='contained'
                    size={'small'}
                    style={{ fontWeight: 'bold', marginRight: '10px' }}
                    color={'success'}>
                    Editar
                  </Button>
                </Link>
                <Button
                  variant='contained'
                  size={'small'}
                  style={{ fontWeight: 'bold' }}
                  onClick={() => handleOpenModalDeletePatient(patient)}
                  color={'error'}>
                  Excluir
                </Button>
              </div>
            </Grid>
            <Divider sx={{ marginBottom: 2 }} />
            <Grid
              id="info-pessoal-paciente"
              container
              justifyContent={'space-around'}
              marginBottom={5}>
              <Grid
                item
                flexGrow={1}>
                {patient?.avatar ? (
                  <Avatar
                    sx={{ width: 120, height: 120 }}
                    alt={patient?.name}
                    src="/static/images/avatar/1.jpg"
                  />
                ) : (
                  <Avatar sx={{ width: 120, height: 120 }}>
                    <Typography variant={'h2'}>
                      {patient ? patient.name.split(' ')[0][0] + patient.name.split(' ')[1][0] : ''}
                    </Typography>
                  </Avatar>
                )}
              </Grid>
              <Grid
                item
                flexGrow={10}
                alignItems={'flex-start'}>
                <Grid
                  container
                  justifyContent={'start'}
                  flexDirection={'column'}>
                  <Typography>
                    <b>Nome:</b> {patient?.name}
                  </Typography>
                  <Typography>
                    <b>Nascimento:</b> {moment(patient?.birthDate).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography>
                    <b>CPF:</b> {formataCpf(patient?.cpf)}
                  </Typography>
                  <Typography>
                    <b>Sexo:</b> {capitalize(patient?.gender)}
                  </Typography>
                  <Typography>
                    <b>Estado Civil:</b> {capitalize(patient?.maritalStatus)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent={'space-between'}
              marginBottom={1}>
              <div style={{display: 'flex', alignItems: 'center', width: '30%', }}>
                <PersonPinSharpIcon sx={{ width: 25, height: 25, marginRight: 1 }} />
                <Typography>Responsável</Typography>
              </div>
              <div style={{display: 'flex', alignItems: 'center' }}>
                <Link href={'/paciente/edicao/' + patient?.id}>
                  <Button
                    variant='contained'
                    size={'small'}
                    style={{ fontWeight: 'bold', marginRight: '10px' }}
                    color={'success'}>
                    Perfil
                  </Button>
                </Link>
              </div>
            </Grid>
            <Divider sx={{ marginBottom: 2 }} />
            <Grid
              id="info-pessoal-responsavel"
              container
              justifyContent={'space-around'}
              marginBottom={5}>
              <Grid
                item
                flexGrow={1}>
                {patient?.avatar ? (
                  <Avatar
                    sx={{ width: 120, height: 120 }}
                    alt={patient?.name}
                    src="/static/images/avatar/1.jpg"
                  />
                ) : (
                  <Avatar sx={{ width: 120, height: 120 }}>
                    <Typography variant={'h2'}>
                      {patient?.responsible?.name ? patient.responsible.name.split(' ')[0][0] + patient.responsible.name.split(' ')[1][0] : ''}
                    </Typography>
                  </Avatar>
                )}
              </Grid>
              <Grid
                item
                flexGrow={10}
                alignItems={'flex-start'}>
                <Grid
                  container
                  justifyContent={'start'}
                  flexDirection={'column'}>
                  <Typography>
                    <b>Nome:</b> {patient?.responsible?.name}
                  </Typography>
                  <Typography>
                    <b>Nascimento:</b> {moment(patient?.responsible?.birthDate).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography>
                    <b>CPF:</b> {formataCpf(patient?.responsible?.cpf)}
                  </Typography>
                  <Typography>
                    <b>Sexo:</b> {capitalize(patient?.responsible?.gender)}
                  </Typography>
                  <Typography>
                    <b>Estado Civil:</b> {capitalize(patient?.responsible?.maritalStatus)}
                  </Typography>
                  <Typography>
                    <b>E-mail:</b> {patient?.responsible?.email?.toLowerCase()}
                  </Typography>
                  <Typography>
                    <b>Telefone:</b> {patient?.responsible?.phone}
                  </Typography>
                  <Typography>
                    <b>Endereço:</b> {patient?.responsible?.address}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems={'center'}
              marginBottom={1}>
              <VaccinesSharpIcon sx={{ width: 25, height: 25, marginRight: 1 }} />
              <Typography>Tratamentos</Typography>
            </Grid>
            <Divider sx={{ marginBottom: 2 }} />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
                margin: '5px'
              }}
              open={openPopover}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus>
              <Typography>Adicionar novo tratamento</Typography>
            </Popover>
            <IconButton
              color="primary"
              onClick={() => setOpenModalTreatment(true)}
              aria-owns={openPopover ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              aria-label="adicionar-tratamento"
              sx={{
                backgroundColor: '#2075CD',
                color: '#fff',
                '&:hover': { backgroundColor: '#1565C0' }
              }}>
              <AddIcon />
            </IconButton>
            <div className='mt-5'></div>
            <TableApp columns={treatmentColumns}
                      content={treatments?.content ?? [{}]}
                      count={treatments?.totalElements ?? 0}
                      page={treatments?.pageable.pageNumber ?? 0}
                      noContentText={'Nenhum tratamento para esse paciente.'}
                      handlePageChange={handlePageChangeTreatment} />
          </>
        )}
        {openModalTreatment && (
          <TreatmentDialog
            handleClose={() => setOpenModalTreatment(false)}
            patient={patient}
          />
        )}
      </Container>
      {openModalDeletePatient && (
        <ConfirmDialog
          textButtonAgree={'Sim'}
          textButtonCancel={'Cancelar'}
          dialogTitle={`Você deseja excluir o paciente ${patientToDelete?.name}?`}
          dialogText={'Essa ação é irreversível e irá excluir todos os dados do paciente na clínica.'}
          handleAgree={() => handleDeletePatient(patientToDelete)}
          handleClose={() => setOpenModalDeletePatient(false)}
        />
      )}
    </>
  );
}

export default PacientePerfil;
