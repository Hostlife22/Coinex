import cn from 'classnames';
import { IUserFormProps } from './UserForm.interface';
import './UserForm.scss';

const UserForm = ({ children, className, ...props }: IUserFormProps) => {
  return (
    <form className={cn(className, 'form')} {...props}>
      {children}
    </form>
  );
};

export default UserForm;
