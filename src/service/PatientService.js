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

  static async patch(data) {
    return api.patch(`/patients/`, data);
  }

  static async delete(patientId) {
    return api.delete(`/patients/${patientId}`);
  }
}

export default PatientService;
