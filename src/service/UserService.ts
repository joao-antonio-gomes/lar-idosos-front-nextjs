import { api } from './api';
import Pageable from '../interface/Pageable';

class UserService {
  static async getAllResponsible(params: Pageable) {
    return api.get('/users/responsibles', { params: { ...params } });
  }

  static getResponsibleById(responsibleId: number) {
    return api.get(`/users/responsibles/${responsibleId}`);
  }
}

export default UserService;
