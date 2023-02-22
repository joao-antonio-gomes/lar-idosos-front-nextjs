import { apiLarIdosos } from './apiLarIdosos';
import Pageable from '../interface/Pageable';

class PatientService {
  static async getAll(params: Pageable) {
    return apiLarIdosos.get('/patients', { params: { ...params } });
  }

  static async getById(patientId: number) {
    return apiLarIdosos.get(`/patients/${patientId}`);
  }

  static async create(data: any) {
    return apiLarIdosos.post(`/patients`, data);
  }

  static async patch(patientId: number, data: any) {
    return apiLarIdosos.patch(`/patients/${patientId}`, data);
  }

  static async delete(patientId: number) {
    return apiLarIdosos.delete(`/patients/${patientId}`);
  }

  static getTreatments(patientId: number, treatmentFilter: Pageable) {
    return apiLarIdosos.get(`/patients/${patientId}/treatments`, {
      params: { ...treatmentFilter },
    });
  }
}

export default PatientService;
