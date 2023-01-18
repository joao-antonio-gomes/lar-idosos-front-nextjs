import { api } from './api';

class TreatmentService {
  static create(data) {
    return api.post(`/treatments/`, data);
  }
}

export default TreatmentService;
