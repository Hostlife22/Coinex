import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { IUserFormProps } from './UserForm.interface';
import './UserForm.scss';

const UserForm = ({ children, className, ...props }: IUserFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    clearErrors,
    register,
    reset,
  } = useForm();
  return (
    <form className={cn(className, 'form')} {...props}>
      {children}
    </form>
  );
};

export default UserForm;
