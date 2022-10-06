import {Dialog, DialogTitle} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import MedicineService from '../../service/MedicineService';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormTreatment from '../formTreatment';

function TreatmentDialog({ handleClose, patient, treatment }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dosageType, setDosageType] = useState();
  const [defaultMedicines, setDefaultMedicines] = useState([]);
  const [medicinesList, setMedicinesList] = useState();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    disease: Yup.string().required('Doença é obrigatório').nullable(),
    beginDate: Yup.date().required('Data do início do tratamento é obrigatório').nullable()
        .typeError('Data do início do tratamento inválida'),
    endDate: Yup.date().required('Data do fim do tratamento é obrigatório')
        .typeError('Data do fim do tratamento inválida'),
    // medicine: Yup.object().required('Remédio é obrigatório').nullable(),
    // dosage: Yup.number().required('Dosagem é obrigatório')
    //     .typeError('Dosagem deve ser um número inteiro!'),
    // dosageType: Yup.string().required('Tipo de dosagem é obrigatório'),
    // hourInterval: Yup.number().required('Intervalo (horas) é obrigatório')
    //     .typeError('Intervalo (horas) deve ser um número inteiro!'),
  });

  const {
    watch, register, handleSubmit, getValues, control, formState: { errors }, reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit((data) => {
    // data = {
    //   ...data,
    //   patientId: patient.id,
    //   medicineId: data.medicine.id
    // }
    console.log(data);
  });

  useEffect(() => {
    MedicineService.getDosageType()
        .then(({ data }) => {
          setDosageType(data);
        });
    MedicineService.getAllAutocomplete()
        .then(({ data }) => {
          setMedicinesList(data.result);
        });
  }, []);

  useEffect(() => {
    if (!dosageType || !medicinesList) return;
    setIsLoaded(true);
  }, [dosageType, medicinesList]);

  return (<Dialog open={true} onClose={handleClose}
                  fullWidth={true}
                  maxWidth={'sm'}>
    <DialogTitle>
      {treatment ? `Tratamento ${patient.name} para ${treatment.disease.name}` : 'Novo Tratamento'}
      <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],
          }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    {isLoaded && <FormTreatment patient={patient}
                                useForm={{
                                  watch, register, handleSubmit, getValues, control, formState: { errors }, reset,
                                }}
                                medicinesList={medicinesList}
                                onSubmit={onSubmit}
                                dosageType={dosageType}
                                handleClose={handleClose} />}
  </Dialog>);
}

export default TreatmentDialog;
