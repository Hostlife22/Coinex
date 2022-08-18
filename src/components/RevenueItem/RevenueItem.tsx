import { format } from 'date-fns';
import millify from 'millify';
import { Button } from '..';
import avatar from '../../assets/user.png';
import Ptag from '../Ptag/Ptag';
import { IRevenueItemProps } from './RevenueItem.interface';
import './RevenueItem.scss';

const RevenueItem = ({ date, name, amount, priceUsd, color, icon, uid, handleDelete }: IRevenueItemProps) => {
  const price = millify(+priceUsd * amount);
  return (
    <li className={'revenue__elem'}>
      <div className={'revenue__elem-left'}>
        <div style={{ backgroundColor: color ? color : '#313135' }} className={'revenue__elem-div'}>
          <img src={icon ? icon : avatar} alt={name} />
        </div>
        <div className={'revenue__elem-details'}>
          <Ptag className={'revenue__elem-title'}>
            {name} was purchased for ${price}{' '}
          </Ptag>
          <Ptag className="revenue__elem-time">
            {format(new Date(date), 'dd-MM-yyyy')} • quantity - {millify(amount)}, price{' '}
            {(+priceUsd).toFixed(2)} USD
          </Ptag>
        </div>
      </div>
      <Button
        className={'revenue__elem-btn'}
        appearance="primary"
        onClick={() => handleDelete(uid, +priceUsd * amount)}>
        Sell
      </Button>
    </li>
  );
};

export default RevenueItem;
