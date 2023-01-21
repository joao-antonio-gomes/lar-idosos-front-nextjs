import { api } from './api';

class PatientService {
  static getGender() {
    return api.get('/persons/genders');
  }
}

export default PatientService;
