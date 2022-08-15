import cn from 'classnames';
import { useState } from 'react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import logo from '../../assets/logo.svg';
import MenuList from '../MenuList/MenuList';
import Ptag from '../Ptag/Ptag';
import './Sidebar.scss';

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <>
      <nav className={cn('sidebar', { close: openSidebar })}>
        <div className="sidebar__heading">
          <div className="sidebar__image-text">
            <span className="sidebar__image">
              <img src={logo} alt="logo" />
            </span>

            <div className="sidebar__text ">
              <Ptag className="sidebar__name">oineX</Ptag>
            </div>
          </div>

          <FaArrowRight className="sidebar__btn-toggle" onClick={() => setOpenSidebar((prev) => !prev)} />
        </div>

        <div className="sidebar__menu-bar">
          <div className="sidebar__menu">
            <li className="sidebar__search-box">
              <span className="sidebar__icon" onClick={() => setOpenSidebar((prev) => !prev)}>
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
