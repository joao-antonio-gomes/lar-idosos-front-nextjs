import SelectOption from './SelectOption';

export default interface FormPatientEdicaoValues {
  id: number;
  name: string;
  cpf: string;
  birthDate: Date;
  gender: string;
  maritalStatus: string;
  responsible?: SelectOption;
};
