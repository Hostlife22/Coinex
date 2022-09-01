import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, Diveder, Logo, Ptag, UserPanel } from '..';
import { GET_CRYPTOS } from '../../apollo/queries/cryptoQuery';
import { useAppDispatch } from '../../app/hooks';
import { IGetCryptos } from '../../common/crypto.interface';
import { formatAsPercent } from '../../common/helpers/formatAsPercent';
import { logout } from '../../features/auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { IHeaderProps } from './Header.interface';
import './Header.scss';

const Header = ({ handleMenu, isOpen }: IHeaderProps) => {
  const { data } = useQuery<IGetCryptos>(GET_CRYPTOS);

  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const currentTableData = useMemo(() => {
    return data?.assets
      ? [...data.assets].sort((a, b) => +b.changePercent24Hr - +a.changePercent24Hr).slice(0, 3)
      : [];
  }, [data?.assets]);

  return (
    <header className="header" data-testid="header">
      <div className="header__container">
        <Logo handleMenu={handleMenu} isOpen={isOpen} className="header__logo" />
        <div className="header__coines" data-testid="header-conies">
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
