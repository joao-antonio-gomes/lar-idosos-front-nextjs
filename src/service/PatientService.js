import { api } from './api';

class PatientService {
  static getAll(params) {
    return api.get('/patients', { params: { ...params } });
  }

  static getById(patientId) {
    return api.get(`/patients/${patientId}`);
  }

  static create(data) {
    return api.post(`/patients/`, data);
  }

  static patch(data) {
    return api.patch(`/patients/`, data);
  }

  static delete(patientId) {
    return api.delete(`/patients/${patientId}`);
  }
}

export default PatientService;
