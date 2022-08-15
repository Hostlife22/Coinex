import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import Ptag from '../Ptag/Ptag';
import { IInputProps } from './Input.interface';
import './Input.scss';

const Input = forwardRef(
  ({ className, label, error, ...props }: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={cn(className, 'input')}>
        <Ptag size="l" className="input__description">
          {label}
        </Ptag>
        <input className={cn({ error: error })} ref={ref} {...props} required />
      </div>
    );
  },
);

export default Input;
