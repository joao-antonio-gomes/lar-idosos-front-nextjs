import { Dialog, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import MedicineService from '../../service/MedicineService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormTreatment from '../formTreatment';
import TreatmentService from '../../service/TreatmentService';
import { useSnackbar } from '../../context/snackbar';
import Patient from '../../interface/Patient';
import Medicine from '../../interface/Medicine';

interface Props {
  handleClose: () => void;
  treatment?: any;
  patient: Patient;
}

function TreatmentDialog({ handleClose, patient, treatment }: Props) {
  const snackbar = useSnackbar();
  const [isLoaded, setIsLoaded] = useState(false);
  const [medicinesList, setMedicinesList] = useState<Medicine[]>([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    disease: Yup.string().required('Doença é obrigatório').nullable(),
    beginDate: Yup.date()
      .required('Data do início do tratamento é obrigatório')
      .nullable()
      .typeError('Data do início do tratamento inválida'),
    endDate: Yup.date()
      .required('Data do fim do tratamento é obrigatório')
      .typeError('Data do fim do tratamento inválida'),
    medicines: Yup.array().of(
      Yup.object().shape({
        medicine: Yup.object().required('Remédio é obrigatório').nullable(),
        dosage: Yup.number().required('Dosagem é obrigatório').typeError('Dosagem deve ser um número inteiro!'),
        hourInterval: Yup.number()
          .required('Intervalo (horas) é obrigatório')
          .typeError('Intervalo (horas) deve ser um número inteiro!')
      })
    )
  });

  const {
    watch,
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = handleSubmit((data) => {
    data = {
      ...data,
      patientId: patient.id,
      medicines: data.medicines.map((medicine: Medicine) => ({ ...medicine, medicineId: medicine.id }))
    };
    TreatmentService.create(data)
      .then((response) => {
        snackbar.showSnackBar('Tratamento criado com sucesso', 'success');
        handleClose();
      })
      .catch(({ response }) => {
        if (response.data.message) {
          snackbar.showSnackBar(response.data.message, 'error');
          return;
        }
        snackbar.showSnackBar('Houve um erro ao criar o tratamento, atualize a página e tente novamente', 'error');
      });
  });

  useEffect(() => {
    if (!medicinesList) return;
    setIsLoaded(true);
  }, [medicinesList]);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}>
      <DialogTitle>
        {treatment ? `Tratamento ${patient.name} para ${treatment.disease.name}` : 'Novo Tratamento'}
        <IconButton
          aria-label="close"
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
      {isLoaded && (
        <FormTreatment
          patient={patient}
          useForm={{
            watch,
            register,
            handleSubmit,
            getValues,
            control,
            formState: { errors },
            reset
          }}
          medicinesList={medicinesList}
          onSubmit={onSubmit}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
}

export default TreatmentDialog;
