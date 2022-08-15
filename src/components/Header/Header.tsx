import { Diveder, UserPanel } from '..';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__coines">1</div>
        <UserPanel className="header__user" />
      </div>
      <Diveder className="header__divider" />
    </header>
  );
};

export default Header;
