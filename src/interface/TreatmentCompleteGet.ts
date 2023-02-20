import DiseaseGet from './DiseaseGet';
import Patient from './Patient';
import TreatmentMedicines from './TreatmentMedicines';

export default interface TreatmentCompleteGet {
  id: number;
  beginDate: Date;
  endDate: Date;
  status: string;
  disease: DiseaseGet;
  patient: Patient;
  treatmentMedicines: TreatmentMedicines[];
}
