import cn from 'classnames';
import { FaSearch } from 'react-icons/fa';
import MenuList from '../MenuList/MenuList';
import { ISidebarProps } from './Sidebar.interface';
import './Sidebar.scss';

const Sidebar = ({ isOpen, handleMenu }: ISidebarProps) => {
  return (
    <>
      <nav className={cn('sidebar', { close: isOpen })}>
        <div className="sidebar__menu-bar">
          <div className="sidebar__menu">
            <li className="sidebar__search-box">
              <span className="sidebar__icon" onClick={handleMenu}>
                <FaSearch />
              </span>

              <input placeholder="Search..." />
            </li>

            <MenuList className="sidebar__menu-list" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
