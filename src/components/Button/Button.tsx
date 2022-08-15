import cn from 'classnames';
import { ButtonProps } from './Button.interface';
import './Button.scss';

function Button({ children, appearance, className, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      className={cn(className, 'btn', {
        primary: appearance === 'primary',
        ghost: appearance === 'ghost',
        secondary: appearance === 'secondary',
      })}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
