import { Avatar, Button, Container, Grid, Popover } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PatientService from '../../src/service/PatientService';
import { useRouter } from 'next/router';
import Loader from '../../src/components/loader';
import { useSnackbar } from '../../src/context/snackbar';
import PrevPage from '../../src/components/prevPage';
import PersonPinSharpIcon from '@mui/icons-material/PersonPinSharp';
import VaccinesSharpIcon from '@mui/icons-material/VaccinesSharp';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TreatmentDialog from '../../src/components/treatmentDialog';
import Link from 'next/link';
import Patient from '../../src/interface/Patient';
import ConfirmDialog from '../../src/components/confirmDialog';
import { capitalize, formataCpf } from '../../src/service/Utils';
import TreatmentCard from '../../src/components/treatmentCard';
import TreatmentGet from '../../src/interface/TreatmentGet';

function PacientePerfil() {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient>();
  const [treatments, setTreatments] = useState<TreatmentGet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const snackbar = useSnackbar();
  const [openModalTreatment, setOpenModalTreatment] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [openModalDeletePatient, setOpenModalDeletePatient] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | undefined>();
  const openPopover = Boolean(anchorEl);

  const handleDeletePatient = (patient: Patient | undefined) => {
    PatientService.delete(patient?.id)
      .then((response) => {
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

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setIsLoading(true);
      PatientService.getById(id)
        .then(({ data }) => {
          setPatient(data);
          setTreatments(data.treatments);
        })
        .catch((error) =>
          snackbar.showSnackBar('Houve um erro ao carregar os dados, atualize a página e tente novamente', 'error')
        )
        .finally(() => setIsLoading(false));
    }
  }, [router.isReady]);

  if (isLoading && !patient) {
    return <Loader />;
  }

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
            <div className="mt-5 flex overflow-x-auto w-full p-5 space-x-5">
              {treatments.length > 0
                ? treatments.map((treatment) => <TreatmentCard treatment={treatment} />)
                : 'Nenhum tratamento para esse paciente.'}
            </div>
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
