import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ISidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  handleMenu: () => void;
  isOpen: boolean;
  matches: boolean;
}
