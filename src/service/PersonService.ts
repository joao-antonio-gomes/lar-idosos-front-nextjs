import { api } from './api';

class PersonService {
  static getGender() {
    return api.get('/persons/genders');
  }

  static getMaritalStatus() {
    return api.get('/persons/marital-status');
  }
}

export default PersonService;
