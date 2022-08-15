import cn from 'classnames';
import { HtagProps } from './Htag.interface';
import './Htag.scss';

const Htag = ({ tag, children, className, ...props }: HtagProps): JSX.Element => {
  switch (tag) {
    case 'h1':
      return (
        <h1 className={cn(className, 'heading')} {...props}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={cn(className, 'title')} {...props}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={cn(className, 'subtitle')} {...props}>
          {children}
        </h3>
      );
    default:
      return (
        <h4 className={className} {...props}>
          {children}
        </h4>
      );
  }
};

export default Htag;
