import cn from 'classnames';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSearchQuery, setSearchCrypto } from '../../features/settings/settingsSlice';
import MenuList from '../MenuList/MenuList';
import { ISidebarProps } from './Sidebar.interface';
import './Sidebar.scss';

const Sidebar = ({ isOpen, handleMenu, matches }: ISidebarProps) => {
  const searchValue = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (location.pathname !== '/') {
      navigate('/');
    }

    dispatch(setSearchCrypto(e.target.value));
  };

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

                <input placeholder="Search..." value={searchValue} onChange={onChange} />
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
