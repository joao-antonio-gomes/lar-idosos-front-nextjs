import { api } from './api';

class PatientService {
  static async getAll(params) {
    return api.get('/patients', { params: { ...params } });
  }

  static async getById(patientId) {
    return api.get(`/patients/${patientId}`);
  }

  static async create(data) {
    return api.post(`/patients/`, data);
  }

  static async patch(patientId, data) {
    return api.patch(`/patients/${patientId}`, data);
  }

  static async delete(patientId) {
    return api.delete(`/patients/${patientId}`);
  }
}

export default PatientService;
