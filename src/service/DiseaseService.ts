import { apiLarIdosos } from './apiLarIdosos';
import Pageable from '../interface/Pageable';

class DiseaseService {
  static getAll(params: Pageable) {
    return apiLarIdosos.get('/diseases', { params: { ...params } });
  }

  static getById(patientId: number) {
    return apiLarIdosos.get(`/diseases/${patientId}`);
  }

  static create(data: any) {
    return apiLarIdosos.post(`/diseases/`, data);
  }

  static patch(data: any) {
    return apiLarIdosos.patch(`/diseases/`, data);
  }

  static delete(patientId: number) {
    return apiLarIdosos.delete(`/diseases/${patientId}`);
  }

}

export default DiseaseService;
