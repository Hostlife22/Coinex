import cn from 'classnames';
import { menuList } from '../../common/data';
import Ptag from '../Ptag/Ptag';
import { IMenuListProps } from './MenuList.interface';
import './MenuList.scss';

const MenuList = ({ className, ...props }: IMenuListProps) => {
  return (
    <ul className={cn(className, 'menu-list')} {...props}>
      {menuList.map((item) => (
        <li className="menu-list__link" key={item.id}>
          <a href="#">
            <span>{item.icon}</span>
            <Ptag className="menu-list__title" size="l">
              {item.title}
            </Ptag>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
