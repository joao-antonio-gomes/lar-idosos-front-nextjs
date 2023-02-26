import Disease from './Disease';
import Patient from './Patient';

export default interface Treatment {
  id: number;
  status: string;
  beginDate: Date;
  endDate: Date;
  disease: Disease;
  patient: Patient;
}
