import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export default interface MenuItem {
  label: string;
  link: string;
  size?: number;
  icon: IconDefinition;
}
