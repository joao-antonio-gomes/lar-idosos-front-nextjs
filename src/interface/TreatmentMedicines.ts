import Medicine from './Medicine';
import MedicineApplication from './MedicineApplication';

export default interface TreatmentMedicines {
  id: number;
  dosage: number;
  beginDate: Date;
  endDate: Date;
  beginHour: string;
  minutesInterval: number;
  medicine: Medicine;
  medicineApplications: MedicineApplication[];
}
