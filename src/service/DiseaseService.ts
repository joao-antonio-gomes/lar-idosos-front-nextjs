import { api } from './api';
import Pageable from '../interface/Pageable';

class DiseaseService {
  static getAll(params: Pageable) {
    return api.get('/diseases', { params: { ...params } });
  }

  static getById(patientId: number) {
    return api.get(`/diseases/${patientId}`);
  }

  static create(data: any) {
    return api.post(`/diseases/`, data);
  }

  static patch(data: any) {
    return api.patch(`/diseases/`, data);
  }

  static delete(patientId: number) {
    return api.delete(`/diseases/${patientId}`);
  }

}

export default DiseaseService;
