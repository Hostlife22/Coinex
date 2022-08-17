import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICoin } from '../../features/crypto/crypto.interface';

export interface IModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  handleClose: () => void;
  isOpen: boolean;
  openId: string;
  data: ICoin | undefined;
}
