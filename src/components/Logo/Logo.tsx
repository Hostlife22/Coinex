import cn from 'classnames';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../../assets/logo.svg';
import Ptag from '../Ptag/Ptag';
import { ILogoProps } from './Logo.interface';
import './Logo.scss';

const Logo = ({ handleMenu, isOpen, className, ...props }: ILogoProps) => {
  return (
    <div className={cn(className, 'logo', { logo_close: isOpen })} {...props}>
      <div className="logo__container">
        <span className="logo__image">
          <img src={logo} alt="logo" />
        </span>

        <div className="logo__text ">
          <Ptag className="logo__name">oineX</Ptag>
        </div>
      </div>

      <FaArrowRight className="logo__btn-toggle" onClick={handleMenu} />
    </div>
  );
};

export default Logo;
