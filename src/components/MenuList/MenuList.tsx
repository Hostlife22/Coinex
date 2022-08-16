import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { menuList } from '../../common/data';
import Ptag from '../Ptag/Ptag';
import { IMenuListProps } from './MenuList.interface';
import './MenuList.scss';

const MenuList = ({ className, ...props }: IMenuListProps) => {
  return (
    <ul className={cn(className, 'menu-list')} {...props}>
      {menuList.map((item) => (
        <NavLink
          key={item.id}
          to={item.route}
          className={({ isActive }) =>
            isActive ? 'menu-list__link menu-list__link_active' : 'menu-list__link'
          }>
          <li>
            <span>{item.icon}</span>
            <Ptag className="menu-list__title" size="l">
              {item.title}
            </Ptag>
          </li>
        </NavLink>
      ))}
    </ul>
  );
};

export default MenuList;
