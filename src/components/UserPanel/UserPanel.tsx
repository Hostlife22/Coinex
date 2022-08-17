import cn from 'classnames';
import { BiLogIn } from 'react-icons/bi';
import { FaCrown } from 'react-icons/fa';
import { Htag } from '..';
import userAvatar from '../../assets/user.png';
import { useAuth } from '../../hooks/useAuth';
import { IUserPanelProps } from './UserPanel.interface';
import './UserPanel.scss';

const UserPanel = ({ className, isLogin, logOut, ...props }: IUserPanelProps) => {
  const { user } = useAuth();

  return (
    <div className={cn(className, 'user')} {...props}>
      <div className="user__avatar">
        <img src={userAvatar} alt="avatar" />
      </div>
      <div className="user_wrapper">
        <Htag tag="h2" className="user__name">
          {user.user.firstName} {user.user.lastName}
        </Htag>
        <Htag tag="h3" className="user__role">
          User
          <FaCrown />
        </Htag>
      </div>
      <div className="user__logout" onClick={logOut}>
        <BiLogIn />
      </div>
    </div>
  );
};

export default UserPanel;
