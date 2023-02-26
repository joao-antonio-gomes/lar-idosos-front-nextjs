import Medicine from './Medicine';
import MedicineApplication from './MedicineApplication';
import Treatment from './Treatment';

export default interface TreatmentMedicines {
  id: number;
  dosage: number;
  beginDate: Date;
  endDate: Date;
  beginHour: string;
  minutesInterval: number;
  medicine: Medicine;
  treatment: Treatment;
  medicineApplications: MedicineApplication[];
}
