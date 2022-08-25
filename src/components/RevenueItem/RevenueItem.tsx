import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { FaSadTear, FaSpinner } from 'react-icons/fa';
import { Button, Diveder } from '..';
import { GET_CRYPTO } from '../../apollo/queries/cryptoQuery';
import { getCryptoVariables } from '../../apollo/queries/__generated__/getCrypto';
import avatar from '../../assets/user.png';
import { IGetCrypto } from '../../common/crypto.interface';
import { formatAsPercent } from '../../common/helpers/formatAsPercent';
import Ptag from '../Ptag/Ptag';
import { IRevenueItemProps } from './RevenueItem.interface';
import './RevenueItem.scss';

const RevenueItem = ({
  date,
  name,
  amount,
  priceUsd,
  color,
  icon,
  uid,
  handleDelete,
  id,
}: IRevenueItemProps) => {
  const price = +priceUsd * amount;
  const { data, loading, error } = useQuery<IGetCrypto, getCryptoVariables>(GET_CRYPTO, {
    variables: { id: id || '' },
  });

  if (loading) {
    return (
      <li className="revenue__elem-loading">
        Getting transaction data...
        <FaSpinner />
      </li>
    );
  }

  if (error) {
    return (
      <li className="revenue__elem-loading">
        something went wrong try again later{' '}
        <span>
          <FaSadTear />
        </span>
      </li>
    );
  }

  const currentPrice = Number(data?.asset.priceUsd || 0) * amount;
  const diffPercent = ((currentPrice - price) / price) * 100;

  return (
    <li className={'revenue__elem'}>
      <div className={'revenue__elem-left'}>
        <div style={{ backgroundColor: color ? color : '#313135' }} className={'revenue__elem-div'}>
          <img src={icon ? icon : avatar} alt={name} />
        </div>
        <div className={'revenue__elem-details'}>
          <Ptag className={'revenue__elem-title'}>
            {name} was purchased for ${price.toFixed(2)}{' '}
          </Ptag>
          <ul className="revenue__elem-time">
            <li>
              <span>quantity:</span> {amount}
            </li>
            <li>
              <span>price:</span> {(+priceUsd).toFixed(4)} USD
            </li>
            <li>
              <span>transaction:</span> {format(new Date(date), 'dd-MM-yyyy')}{' '}
            </li>
            {data?.asset && (
              <>
                <Diveder className="revenue__elem-diveder" />
                <li>
                  <span>percentage difference:</span> {formatAsPercent(diffPercent)}
                </li>
                <li>
                  <span>sell for:</span> {Number(+data.asset.priceUsd * amount).toFixed(2)} USD{' '}
                </li>
                <li>
                  <span>current price:</span> {Number(data.asset.priceUsd).toFixed(4)} USD
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Button
        className={'revenue__elem-btn'}
        appearance="primary"
        onClick={() => handleDelete(uid, currentPrice, data?.asset.priceUsd || priceUsd)}>
        Sell
      </Button>
    </li>
  );
};

export default RevenueItem;
