import { Diveder, Logo, UserPanel } from '..';
import { IHeaderProps } from './Header.interface';
import './Header.scss';

const Header = ({ handleMenu, isOpen }: IHeaderProps) => {
  return (
    <header className="header">
      <div className="header__container">
        <Logo handleMenu={handleMenu} isOpen={isOpen} className="header__logo" />
        <div className="header__coines">1</div>
        <UserPanel className="header__user" />
      </div>
      <Diveder className="header__divider" />
    </header>
  );
};

export default Header;
