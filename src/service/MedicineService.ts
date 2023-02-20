import { api } from './api';
import Pageable from '../interface/Pageable';

class MedicineService {
  static getAll(params: Pageable) {
    return api.get('/medicines', { params: { ...params } });
  }

  static getById(patientId: number) {
    return api.get(`/medicines/${patientId}`);
  }

  static create(data: any) {
    return api.post(`/medicines/`, data);
  }

  static patch(data: any) {
    return api.patch(`/medicines/`, data);
  }

  static delete(patientId: number) {
    return api.delete(`/medicines/${patientId}`);
  }
  static getDosageType() {
    return api.get('/medicines/dosage-type');
  }
}

export default MedicineService;
