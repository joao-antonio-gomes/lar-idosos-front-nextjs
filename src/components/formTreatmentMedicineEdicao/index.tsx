import React, { useState } from 'react';
import TreatmentMedicines from '../../interface/TreatmentMedicines';
import MedicationLiquidSharpIcon from '@mui/icons-material/MedicationLiquidSharp';
import Typography from '@mui/material/Typography';
import { capitalize } from '../../service/Utils';
import Divider from '@mui/material/Divider';
import { DatePickerApp } from '../datePickerApp';
import { TimePickerApp } from '../timePickerApp';
import { InputText } from '../inputText';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, ListItemButton } from '@mui/material';
import FormTreatmentMedicineApply from '../formTreatmentMedicineApply';

interface Props {
  treatmentMedicine: TreatmentMedicines;
  index: number;
  control: any;
  isEdicaoBlocked: boolean;
}

const FormTreatmentMedicineEdicao = ({ control, isEdicaoBlocked, treatmentMedicine, index }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ListItemButton onClick={() => setIsOpen(!isOpen)}>
          <MedicationLiquidSharpIcon sx={{ width: 25, height: 25, marginRight: 1 }} />
          <Typography>Medicamento {index + 1}: <strong>{treatmentMedicine.medicine.name}</strong> - <strong>{treatmentMedicine.medicine.concentration} mg</strong> - <strong>{capitalize(treatmentMedicine.medicine.type)}</strong></Typography>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </div>
      <Divider className='mb-5 mt-2 md:mr-2.5' />
      <Collapse in={isOpen} timeout='auto' className={'md:flex w-full'} unmountOnExit>
          <div className={'md:flex w-full'}>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <DatePickerApp
                label={'Data inicial'}
                name={`treatmentMedicines[${index}].beginDate`}
                control={control}
                propsInput={{ disabled: isEdicaoBlocked }}
              />
            </div>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <DatePickerApp
                label={'Data final'}
                name={`treatmentMedicines[${index}].endDate`}
                control={control}
                propsInput={{ disabled: isEdicaoBlocked }}
              />
            </div>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <TimePickerApp
                label={'Hora inicial'}
                name={`treatmentMedicines[${index}].beginHour`}
                control={control}
                propsInput={{ disabled: isEdicaoBlocked }}
              />
            </div>
          </div>
          <div className={'md:flex w-full'}>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <InputText
                label={'Dosagem'}
                name={`treatmentMedicines[${index}].dosage`}
                control={control}
                propsInput={{ disabled: isEdicaoBlocked }}
              />
            </div>
            <div className={'mb-5 w-full md:mr-2.5'}>
              <InputText
                label={'Intervalo Aplicação (minutos)'}
                name={`treatmentMedicines[${index}].minutesInterval`}
                control={control}
                propsInput={{ disabled: isEdicaoBlocked }}
              />
            </div>
          </div>
        <FormTreatmentMedicineApply {...{treatmentMedicine}} />
      </Collapse>
    </div>
  );
};

export default FormTreatmentMedicineEdicao;
