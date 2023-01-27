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

function PacientePerfil() {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient>();
  const [treatments, setTreatments] = useState([]);
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
        router.push('/paciente');
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
          data = {
            ...data,
            cpf: data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
          };
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
                    <b>CPF:</b> {patient?.cpf}
                  </Typography>
                  <Typography>
                    <b>Sexo:</b> {patient?.sex}
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
            {/*<div className="mt-5 flex overflow-x-auto w-full p-5 space-x-5">*/}
            {/*  {treatments.length > 0*/}
            {/*    ? treatments.map((treatment) => <TreatmentCard treatment={treatment} />)*/}
            {/*    : 'Nenhum tratamento para esse paciente.'}*/}
            {/*</div>*/}
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
