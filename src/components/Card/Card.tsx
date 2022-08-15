import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { CardProps } from './Card.interface';
import './Card.scss';

const Card = forwardRef(
  ({ children, className, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
      <div className={cn(className, 'card', {})} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

export default Card;
