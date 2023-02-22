import { apiLarIdosos } from './apiLarIdosos';
import Pageable from '../interface/Pageable';

class MedicineService {
  static getAll(params: Pageable) {
    return apiLarIdosos.get('/medicines', { params: { ...params } });
  }

  static getById(patientId: number) {
    return apiLarIdosos.get(`/medicines/${patientId}`);
  }

  static create(data: any) {
    return apiLarIdosos.post(`/medicines/`, data);
  }

  static patch(data: any) {
    return apiLarIdosos.patch(`/medicines/`, data);
  }

  static delete(patientId: number) {
    return apiLarIdosos.delete(`/medicines/${patientId}`);
  }
  static getDosageType() {
    return apiLarIdosos.get('/medicines/dosage-type');
  }
}

export default MedicineService;
