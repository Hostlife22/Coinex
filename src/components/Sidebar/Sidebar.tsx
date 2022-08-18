import cn from 'classnames';
import { FaSearch } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSearchQuery, setSearchCrypto } from '../../features/settings/settingsSlice';
import MenuList from '../MenuList/MenuList';
import { ISidebarProps } from './Sidebar.interface';
import './Sidebar.scss';

const Sidebar = ({ isOpen, handleMenu, matches }: ISidebarProps) => {
  const searchValue = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();

  return (
    <>
      <nav className={cn('sidebar', { close: isOpen })}>
        <div className="sidebar__menu-bar">
          <div className="sidebar__menu">
            {!matches && (
              <li className="sidebar__search-box">
                <span className="sidebar__icon" onClick={handleMenu}>
                  <FaSearch />
                </span>

                <input
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => {
                    dispatch(setSearchCrypto(e.target.value));
                  }}
                />
              </li>
            )}

            <MenuList className="sidebar__menu-list" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
