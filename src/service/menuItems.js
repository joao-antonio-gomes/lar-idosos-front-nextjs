import {faHome, faPersonCane} from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  {
    label: "Início",
    link: "/",
    icon: faHome
  },
  {
    label: "Pacientes",
    link: "/paciente",
    icon: faPersonCane,
    size: 20
  },
];

export default menuItems;
