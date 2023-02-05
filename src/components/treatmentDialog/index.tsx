import { Dialog, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormTreatmentCadastro from '../formTreatmentCadastro';
import Patient from '../../interface/Patient';

interface Props {
  handleClose: () => void;
  treatment?: any;
  patient: Patient | undefined;
}

function TreatmentDialog({ handleClose, patient, treatment }: Props) {

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}>
      <DialogTitle>
        {treatment ? `Tratamento ${patient?.name} para ${treatment.disease.name}` : 'Novo Tratamento'}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
        <FormTreatmentCadastro
          patient={patient}
          handleClose={handleClose}
        />
    </Dialog>
  );
}

export default TreatmentDialog;
