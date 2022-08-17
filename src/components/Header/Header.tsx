import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, Diveder, Logo, UserPanel } from '..';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { IHeaderProps } from './Header.interface';
import './Header.scss';

const Header = ({ handleMenu, isOpen }: IHeaderProps) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header__container">
        <Logo handleMenu={handleMenu} isOpen={isOpen} className="header__logo" />
        <div className="header__coines">1</div>
        {auth ? (
          <UserPanel className="header__user" isLogin={auth} logOut={handleLogout} />
        ) : (
          <Button appearance="primary" onClick={() => navigate('/auth')}>
            <FaUser /> LogIn
          </Button>
        )}
      </div>
      <Diveder className="header__divider" />
    </header>
  );
};

export default Header;
