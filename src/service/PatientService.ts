import { api } from './api';
import Pageable from '../interface/Pageable';

class PatientService {
  static async getAll(params: Pageable) {
    return api.get('/patients', { params: { ...params } });
  }

  static async getById(patientId: number) {
    return api.get(`/patients/${patientId}`);
  }

  static async create(data: any) {
    return api.post(`/patients`, data);
  }

  static async patch(patientId: number, data: any) {
    return api.patch(`/patients/${patientId}`, data);
  }

  static async delete(patientId: number) {
    return api.delete(`/patients/${patientId}`);
  }

  static getTreatments(patientId: number, treatmentFilter: Pageable) {
    return api.get(`/patients/${patientId}/treatments`, {
      params: { ...treatmentFilter },
    });
  }
}

export default PatientService;
