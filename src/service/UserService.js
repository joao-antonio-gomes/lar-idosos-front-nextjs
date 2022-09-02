import {api} from './api';

class PatientService {
  static getGender() {
    return api.get('/user/gender');
  }
}

export default PatientService;
