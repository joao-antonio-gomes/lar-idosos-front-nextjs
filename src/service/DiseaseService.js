import { api } from './api';

class DiseaseService {
  static getAll(params) {
    return api.get('/diseases', { params: { ...params } });
  }

  static getById(patientId) {
    return api.get(`/diseases/${patientId}`);
  }

  static create(data) {
    return api.post(`/diseases/`, data);
  }

  static patch(data) {
    return api.patch(`/diseases/`, data);
  }

  static delete(patientId) {
    return api.delete(`/diseases/${patientId}`);
  }

}

export default DiseaseService;
