import { api } from './api';

class TreatmentService {
  static create(data: any) {
    return api.post(`/treatments`, data);
  }

  static getById(tratamentoId: number) {
    return api.get(`/treatments/${tratamentoId}`);
  }
}

export default TreatmentService;
