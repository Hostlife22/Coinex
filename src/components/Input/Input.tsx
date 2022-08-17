import cn from 'classnames';
import { ForwardedRef, forwardRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import Ptag from '../Ptag/Ptag';
import { IInputProps } from './Input.interface';
import './Input.scss';

const Input = forwardRef(
  ({ className, label, error, ...props }: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    useEffect(() => {
      if (error) {
        toast.error(error.message);
      }
    }, [error]);

    return (
      <div className={cn(className, 'input')}>
        <Ptag size="l" className="input__description">
          {label}
        </Ptag>
        <input className={cn({ error: error })} ref={ref} {...props} />
      </div>
    );
  },
);

export default Input;
