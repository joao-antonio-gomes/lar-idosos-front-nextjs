import {api} from './api';

class PatientService {
  static getAll() {
    return api.get('/patient');
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
}

export default PatientService;
