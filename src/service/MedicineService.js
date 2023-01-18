import { api } from './api';

class MedicineService {
  static getAll(params) {
    return api.get('/medicines', { params: { ...params } });
  }

  static getAllAutocomplete(params) {
    return api.get('/medicines/autocomplete', { params: { ...params } });
  }

  static getById(patientId) {
    return api.get(`/medicines/${patientId}`);
  }

  static create(data) {
    return api.post(`/medicines/`, data);
  }

  static patch(data) {
    return api.patch(`/medicines/`, data);
  }

  static delete(patientId) {
    return api.delete(`/medicines/${patientId}`);
  }
  static getDosageType() {
    return api.get('/medicines/dosage-type');
  }
}

export default MedicineService;
