import User from './User';

export default interface Patient {
  avatar?: string;
  id: number;
  name: string;
  cpf: string;
  birthDate: Date;
  age?: number;
  gender: string;
  maritalStatus: string;
  responsible?: User;
}
