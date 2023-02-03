import { api } from './api';

class UserService {
  static async getAllResponsible(params) {
    return api.get('/users/responsibles', { params: { ...params } });
  }

  static getResponsibleById(responsibleId) {
    return api.get(`/users/responsibles/${responsibleId}`);
  }
}

export default UserService;
