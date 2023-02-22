import { apiLarIdosos } from './apiLarIdosos';
import Pageable from '../interface/Pageable';

class UserService {
  static async getAllResponsible(params: Pageable) {
    return apiLarIdosos.get('/users/responsibles', { params: { ...params } });
  }

  static getResponsibleById(responsibleId: number) {
    return apiLarIdosos.get(`/users/responsibles/${responsibleId}`);
  }
}

export default UserService;
