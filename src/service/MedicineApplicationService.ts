import { apiLarIdosos } from './apiLarIdosos';

class MedicineApplicationService {
  static apply(id: number) {
    return apiLarIdosos.patch(`/medicine-applications/${id}/apply`);
  }

  static unapply(id: number) {
    return apiLarIdosos.patch(`/medicine-applications/${id}/unapply`);
  }

  static getByStatus() {
    return apiLarIdosos.get(`/medicine-applications/by-status`);
  }
}

export default MedicineApplicationService;
