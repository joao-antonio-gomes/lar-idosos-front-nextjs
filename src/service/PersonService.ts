import { apiLarIdosos } from './apiLarIdosos';

class PersonService {
  static getGender() {
    return apiLarIdosos.get('/persons/genders');
  }

  static getMaritalStatus() {
    return apiLarIdosos.get('/persons/marital-status');
  }
}

export default PersonService;
