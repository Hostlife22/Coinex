import cn from 'classnames';
import { PtagProps } from './Ptag.interface';
import './Ptag.scss';

export const Ptag = ({ children, size, className, ...props }: PtagProps): JSX.Element => {
  return (
    <p
      className={cn(className, {
        ['small-text']: size === 's',
        ['large-text']: size === 'l',
      })}
      {...props}>
      {children}
    </p>
  );
};

export default Ptag;
