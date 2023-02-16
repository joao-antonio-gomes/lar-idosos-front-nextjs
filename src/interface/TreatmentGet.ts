import DiseaseGet from './DiseaseGet';

export default interface TreatmentGet {
  id: number;
  status: string;
  beginDate: Date;
  endDate: Date;
  disease: DiseaseGet;
}
