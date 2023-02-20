import { api } from './api';

class MedicineApplicationService {
  static apply(id: number) {
    return api.patch(`/medicine-applications/${id}/apply`);
  }

  static unapply(id: number) {
    return api.patch(`/medicine-applications/${id}/unapply`);
  }
}

export default MedicineApplicationService;
