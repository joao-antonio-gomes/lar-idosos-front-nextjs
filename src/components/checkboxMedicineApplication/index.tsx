import React, { useState } from 'react';
import MedicineApplication from '../../interface/MedicineApplication';
import { Checkbox, FormControlLabel } from '@mui/material';
import MedicineApplicationService from '../../service/MedicineApplicationService';
import { useSnackbar } from '../../context/snackbar';

interface Props {
  application: MedicineApplication;
}

const CheckboxMedicineApplication = ({ application }: Props) => {
  const snackbar = useSnackbar();
  const [applicationState, setApplicationState] = useState(application);

  function changeMedicineApplicationApplied(id: number, applied: boolean) {
    if (applied) {
      MedicineApplicationService.apply(id)
        .then(() => {
          snackbar.showSnackBar('Aplicação de medicamento realizada com sucesso', 'success');
          setApplicationState({ ...applicationState, applied: true });
        })
        .catch(() => {
          snackbar.showSnackBar('Erro ao aplicar medicamento', 'error');
        });
      return;
    }

    MedicineApplicationService.unapply(id)
      .then(() => {
        snackbar.showSnackBar('Aplicação de medicamento removida com sucesso', 'success');
        setApplicationState({ ...applicationState, applied: false });
      })
      .catch(() => {
        snackbar.showSnackBar('Erro ao realizar remoção da aplicação do medicamento', 'error');
      });
  }
  return (
    <div>
      <FormControlLabel label={applicationState.hour}
                        control={<Checkbox checked={applicationState.applied}
                                           onClick={() => changeMedicineApplicationApplied(applicationState.id ,!applicationState.applied)} />} />
    </div>
  );
};

export default CheckboxMedicineApplication;
