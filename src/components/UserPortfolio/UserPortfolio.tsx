import { useQuery } from '@apollo/client';
import cn from 'classnames';
import millify from 'millify';
import { useMemo } from 'react';
import { BsBarChartFill, BsCashStack, BsFillCreditCardFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { GET_CRYPTOS } from '../../apollo/queries/cryptoQuery';
import { useAppSelector } from '../../app/hooks';
import { IGetCryptos } from '../../common/crypto.interface';
import { formatAsCurrency } from '../../common/helpers/formatAsCurrency';
import { formatAsPercent } from '../../common/helpers/formatAsPercent';
import { selectSettings } from '../../features/settings/settingsSlice';
import { selectStatistic } from '../../features/statistic/statisticSlice';
import { useAuth } from '../../hooks/useAuth';
import { Data, IOptionData } from '../../pages/Revenue/Revenue.interface';
import Diveder from '../Diveder/Diveder';
import DonutChart from '../DonutChart/DonutChart';
import Htag from '../Htag/Htag';
import Ptag from '../Ptag/Ptag';
import { IUserPortfolio } from './UserPortfolio.interface';
import './UserPortfolio.scss';

const UserPortfolio = ({ dataCurrentPage }: IUserPortfolio) => {
  const { loading, data } = useQuery<IGetCryptos>(GET_CRYPTOS);
  const {
    transaction: { total },
  } = useAppSelector(selectStatistic);
  const { oldPrice, currentPrice, diff } = useAppSelector(selectSettings);
  const navigation = useNavigate();
  const { user } = useAuth();

  const amountPrice = useMemo(
    () =>
      dataCurrentPage.reduce((acc, curr) => {
        return acc + +curr.priceUsd * curr.amount;
      }, 0),
    [dataCurrentPage],
  );

  const chartData: Data[] = Object.entries(
    dataCurrentPage.reduce((acc, curr) => {
      const currency = data?.assets.find((i) => i.name === curr.name);
      const name = currency ? currency.symbol : curr.name;

      if (!acc[name]) {
        acc[name] = {
          id: curr.id,
          value: curr.amount * +curr.priceUsd,
        };
      } else {
        acc[name] = {
          ...acc[name],
          value: curr.amount * +curr.priceUsd + acc[name].value,
        };
      }

      return acc;
    }, {} as IOptionData),
  ).map((i) => ({ item: i[0], value: i[1].value, id: i[1].id }));

  return (
    <div className="user-portfolio">
      <Htag tag="h1" className="user-portfolio__title">
        Hey {user.user.firstName}! Welcome Back!
      </Htag>
      <Ptag size="l" className="user-portfolio__subtitle">
        Here's Your Performance
      </Ptag>
      {!loading && chartData.length > 0 && (
        <div className="user-portfolio__wrapper">
          <DonutChart data={chartData} total={amountPrice} cb={(id: string) => navigation(`/crypto/${id}`)} />
          <ul className="user-portfolio__details">
            <li className="user-portfolio__item">
              <BsCashStack />
              Current balance: $ {millify(total)}
            </li>
            <li className="user-portfolio__item">
              <BsFillCreditCardFill /> Purchased for the amount: {formatAsCurrency(oldPrice)}
            </li>
            <li className="user-portfolio__item">
              <BsFillCreditCardFill /> Present value: {formatAsCurrency(currentPrice)}
            </li>
            <li className="user-portfolio__item">
              <BsBarChartFill /> Total Return:{' '}
              <span
                className={cn({
                  'user-portfolio__up': diff > 0,
                  'user-portfolio__down': diff < 0,
                })}>
                {(currentPrice - oldPrice).toFixed(2)} ({formatAsPercent(diff)})
              </span>
            </li>
          </ul>
        </div>
      )}
      <Diveder />
    </div>
  );
};

export default UserPortfolio;
