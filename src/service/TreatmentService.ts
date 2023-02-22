import { apiLarIdosos } from './apiLarIdosos';

class TreatmentService {
  static create(data: any) {
    return apiLarIdosos.post(`/treatments`, data);
  }

  static getById(tratamentoId: number) {
    return apiLarIdosos.get(`/treatments/${tratamentoId}`);
  }
}

export default TreatmentService;
