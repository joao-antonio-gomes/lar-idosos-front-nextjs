import { api } from './api';

class UserService {
  static async getAllResponsible(params) {
    return api.get('/users/responsibles', { params: { ...params } });
  }
}

export default UserService;
