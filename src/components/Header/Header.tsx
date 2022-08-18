import { useMemo } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, Diveder, Logo, Ptag, UserPanel } from '..';
import { useAppDispatch } from '../../app/hooks';
import { formatAsPercent } from '../../common/helpers';
import { logout } from '../../features/auth/authSlice';
import { useGetAllCryptosQuery } from '../../features/crypto/cryptoApiSlice';
import { useAuth } from '../../hooks/useAuth';
import { IHeaderProps } from './Header.interface';
import './Header.scss';

const Header = ({ handleMenu, isOpen }: IHeaderProps) => {
  const { data } = useGetAllCryptosQuery();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const currentTableData = useMemo(() => {
    return data?.data
      ? [...data.data].sort((a, b) => +b.changePercent24Hr - +a.changePercent24Hr).slice(0, 3)
      : [];
  }, [data?.data]);

  return (
    <header className="header">
      <div className="header__container">
        <Logo handleMenu={handleMenu} isOpen={isOpen} className="header__logo" />
        <div className="header__coines">
          {currentTableData.map((coin) => (
            <div key={coin.id} className="header__coin">
              <Ptag size="s">
                {coin.name} - <span>{formatAsPercent(+coin.changePercent24Hr)}</span>
              </Ptag>
            </div>
          ))}
        </div>
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
