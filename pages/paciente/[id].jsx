import {Avatar, Container, Grid, Popover} from '@mui/material';
import React, {useEffect, useState} from 'react';
import PatientService from '../../src/service/PatientService';
import {useRouter} from 'next/router';
import Loader from '../../src/components/loader';
import {useSnackbar} from '../../src/context/snackbar';
import PrevPage from '../../src/components/prevPage';
import PersonPinSharpIcon from '@mui/icons-material/PersonPinSharp';
import VaccinesSharpIcon from '@mui/icons-material/VaccinesSharp';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TreatmentDialog from '../../src/components/treatmentDialog';
import TreatmentCard from '../../src/components/treatmentCard';

function PacientePerfil() {
  const router = useRouter();
  const [patient, setPatient] = useState();
  const [treatments, setTreatments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const snackbar = useSnackbar();
  const [openModalTreatment, setOpenModalTreatment] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopover = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (!id) return null;
      setIsLoading(true);
      PatientService.getById(id)
          .then(({ data }) => {
            data = {
              ...data,
              cpf: data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
            };
            setPatient(data);
            setTreatments(data.treatments);
            setIsLoading(false);
          })
          .catch((error) => snackbar.showSnackBar('Houve um erro ao carregar os dados, atualize a página e tente novamente', 'error'));
    }
  }, [router.isReady]);

  if (isLoading && !patient) {
    return <Loader />;
  }

  return (
      <>
        <PrevPage url={'/paciente'} />
        <Container sx={{ marginTop: 5 }}>
          {isLoading
              ?
              <Loader />
              :
              <>
                <Grid container alignItems={'center'} marginBottom={1}>
                  <PersonPinSharpIcon sx={{ width: 25, height: 25, marginRight: 1 }} /><Typography>Informações
                  Pessoais</Typography>
                </Grid>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid id='info-pessoal-paciente' container justifyContent={'space-around'} marginBottom={5}>
                  <Grid item flexGrow={1}>
                    {patient.avatar ?
                        <Avatar sx={{ width: 120, height: 120 }} alt={patient.name} src='/static/images/avatar/1.jpg' />
                        :
                        <Avatar sx={{ width: 120, height: 120 }}><Typography
                            variant={'h2'}>{patient.name.split(' ')[0][0] + patient.name.split(' ')[1][0]}</Typography></Avatar>
                    }
                  </Grid>
                  <Grid item flexGrow={10} alignItems={'flex-start'}>
                    <Grid container justifyContent={'start'} flexDirection={'column'}>
                      <Typography><b>Nome:</b> {patient.name}</Typography>
                      <Typography><b>Nascimento:</b> {moment(patient.birthDate).format('DD/MM/YYYY')}</Typography>
                      <Typography><b>CPF:</b> {patient.cpf}</Typography>
                      <Typography><b>Telefone:</b> {patient.phone}</Typography>
                      <Typography><b>Sexo:</b> {patient.gender === 0 ? 'Masculino' : 'Feminino'}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container alignItems={'center'} marginBottom={1}>
                  <VaccinesSharpIcon
                      sx={{ width: 25, height: 25, marginRight: 1 }} /><Typography>Tratamentos</Typography>
                </Grid>
                <Divider sx={{ marginBottom: 2 }} />
                <Popover
                    id='mouse-over-popover'
                    sx={{
                      pointerEvents: 'none',
                      margin: '5px'
                    }}
                    open={openPopover}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                  <Typography>
                    Adicionar novo tratamento
                  </Typography>
                </Popover>
                <IconButton color='primary'
                            onClick={() => setOpenModalTreatment(true)}
                            aria-owns={openPopover ? 'mouse-over-popover' : undefined}
                            aria-haspopup='true'
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            aria-label='adicionar-tratamento'
                            sx={{
                              backgroundColor: '#2075CD',
                              color: '#fff',
                              '&:hover': { backgroundColor: '#1565C0' },
                            }}>
                  <AddIcon />
                </IconButton>
                <div className='mt-5 flex overflow-x-auto w-full p-5 space-x-5'>
                  {treatments.length > 0 ?
                    treatments.map(treatment => <TreatmentCard treatment={treatment} />)
                      :
                      "Nenhum tratamento para esse paciente."
                  }
                </div>
              </>
          }
          {openModalTreatment && <TreatmentDialog handleClose={() => setOpenModalTreatment(false)} patient={patient} />}
        </Container>
      </>
  );
}

export default PacientePerfil;
