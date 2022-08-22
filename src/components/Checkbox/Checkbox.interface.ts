import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface ICheckboxProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
}
