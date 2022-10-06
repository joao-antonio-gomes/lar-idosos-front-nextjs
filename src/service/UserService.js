import {api} from './api';

class PatientService {
  static getGender() {
    return api.get('/utils/gender');
  }
}

export default PatientService;
