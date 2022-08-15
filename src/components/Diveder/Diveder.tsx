import cn from 'classnames';
import { DivederProps } from './Diveder.interface';
import './Diveder.scss';

export const Diveder = ({ className, ...props }: DivederProps): JSX.Element => {
  return <hr className={cn(className, 'diveder')} {...props} />;
};

export default Diveder;
