import Disease from './Disease';
import Patient from './Patient';
import TreatmentMedicines from './TreatmentMedicines';

export default interface TreatmentCompleteGet {
  id: number;
  beginDate: Date;
  endDate: Date;
  status: string;
  disease: Disease;
  patient: Patient;
  treatmentMedicines: TreatmentMedicines[];
}
