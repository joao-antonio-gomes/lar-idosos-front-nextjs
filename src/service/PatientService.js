import {api} from './api';

class PatientService {
  static getAll(params) {
    return api.get('/patient', { params: { ...params } });
  }

  static getById(patientId) {
    return api.get(`/patient/${patientId}`);
  }

  static create(data) {
    return api.post(`/patient/`, data);
  }

  static patch(data) {
    return api.patch(`/patient/`, data);
  }

  static delete(patientId) {
    return api.delete(`/patient/${patientId}`);
  }
}

export default PatientService;
