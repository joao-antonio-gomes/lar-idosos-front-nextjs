import TreatmentMedicines from './TreatmentMedicines';

export default interface MedicineApplication {
  id: number;
  date: Date;
  hour: string;
  observation: string;
  applied: boolean;
  treatmentMedicine: TreatmentMedicines;
}
