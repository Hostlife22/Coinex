import cn from 'classnames';
import { FaCrown } from 'react-icons/fa';
import { Htag } from '..';
import user from '../../assets/user.png';
import { IUserPanelProps } from './UserPanel.interface';
import './UserPanel.scss';

const UserPanel = ({ className, ...props }: IUserPanelProps) => {
  return (
    <div className={cn(className, 'user')} {...props}>
      <div className="user__avatar">
        <img src={user} alt="avatar" />
      </div>
      <div className="user_wrapper">
        <Htag tag="h2" className="user__name">
          John Doe
        </Htag>
        <Htag tag="h3" className="user__role">
          User
          <FaCrown />
        </Htag>
      </div>
    </div>
  );
};

export default UserPanel;
