import { faHome, faPersonCane, faCapsules } from '@fortawesome/free-solid-svg-icons';
import MenuItem from '../interface/MenuItem';

const MenuItems: MenuItem[] = [
  {
    label: 'Início',
    link: '/',
    icon: faHome
  },
  {
    label: 'Pacientes',
    link: '/paciente',
    icon: faPersonCane,
    size: 20
  },
  {
    label: 'Remédios',
    link: '/remedio',
    icon: faCapsules,
    size: 20
  }
];

export default MenuItems;
