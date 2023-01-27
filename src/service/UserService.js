import { api } from './api';

class PatientService {
  static getGender() {
    return api.get('/persons/genders');
  }

  static getMaritalStatus() {
    return api.get('/persons/marital-status');
  }
}

export default PatientService;
