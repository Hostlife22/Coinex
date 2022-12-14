import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { ICheckboxProps } from './Checkbox.interface';
import './Checkbox.scss';

const Checkbox = forwardRef(
  ({ className, label, id, ...props }: ICheckboxProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={cn(className, 'checkbox')} data-testid="checkbox">
        <input type="checkbox" id={id} ref={ref} {...props} data-testid="checkbox-input" />
        <label htmlFor={id}>
          <span></span>
          {label}
        </label>
      </div>
    );
  },
);
export default Checkbox;
