import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GET_CRYPTOS } from '../../apollo/queries/cryptoQuery';
import { useAppSelector } from '../../app/hooks';
import icon from '../../assets/user.png';
import { PAGE_SIZE_SM } from '../../common/constants';
import { IGetCryptos } from '../../common/crypto.interface';
import { Card, Diveder, DonutChart, Htag, Pagination, Ptag, RevenueItem } from '../../components';
import { usePutStatisticMutation } from '../../features/statistic/statisticApiSlice';
import { selectStatistic } from '../../features/statistic/statisticSlice';
import { IStatisticState } from '../../features/statistic/statisticSlice.interface';
import { useAuth } from '../../hooks/useAuth';
import { Data, IOptionData } from './Revenue.interface';
import './Revenue.scss';

function Revenue() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [updateStatistic, { isLoading }] = usePutStatisticMutation();
  const selectedStatistic = useAppSelector(selectStatistic);
  const { loading, data } = useQuery<IGetCryptos>(GET_CRYPTOS);
  const { user } = useAuth();
  const navigation = useNavigate();

  const amountPrice = useMemo(
    () =>
      selectedStatistic.currency.reduce((acc, curr) => {
        return acc + +curr.priceUsd * curr.amount;
      }, 0),
    [selectedStatistic.currency],
  );

  const soldPrice = useMemo(
    () =>
      selectedStatistic.history.sales.reduce((acc, curr) => {
        return acc + +curr.priceUsd * curr.amount;
      }, 0),
    [selectedStatistic.currency],
  );

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE_SM;
    const lastPageIndex = firstPageIndex + PAGE_SIZE_SM;
    return [...selectedStatistic.currency].slice(firstPageIndex, lastPageIndex);
  }, [currentPage, selectedStatistic.currency]);

  const handleDelete = (id: string, deposit: number, price: string) => {
    const newCurrency = selectedStatistic.currency.filter((item) => item.uid !== id);
    const soldCurrency = selectedStatistic.currency.find((item) => item.uid === id);

    const newData: IStatisticState = {
      transaction: {
        ...selectedStatistic.transaction,
        total: +soldPrice.toFixed(2) + +deposit.toFixed(2),
      },
      history: {
        ...selectedStatistic.history,
        sales: soldCurrency
          ? [...selectedStatistic.history.sales, { ...soldCurrency, priceUsd: price }]
          : selectedStatistic.history.sales,
      },
      currency: newCurrency,
    };

    updateStatistic({
      userId: user.user.userId || '',
      statistics: newData,
    });
  };

  const chartData: Data[] = Object.entries(
    selectedStatistic.currency.reduce((acc, curr) => {
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

  console.log(selectedStatistic.currency);
  console.log(chartData);

  return (
    <div className="revenue">
      <Card className="revenue__container">
        <div className={'revenue__overview'}>
          <Htag tag="h2" className="revenue__date-range">
            01 - {format(new Date(), 'dd MMMM yyyy')}
          </Htag>

          {!loading && chartData.length > 0 && (
            <DonutChart
              data={chartData}
              total={amountPrice}
              cb={(cryptoId: string) => navigation(`/crypto/${cryptoId}`)}
            />
          )}
          <Htag tag="h1" className="home__title">
            Crypto Spreadsheet
          </Htag>
          <ul className="revenue__list">
            {currentTableData.map((item, id) => (
              <RevenueItem handleDelete={handleDelete} {...item} index={id} key={id} />
            ))}
          </ul>
          {selectedStatistic.currency.length > 3 && (
            <Pagination
              className="revenue__pagination"
              currentPage={currentPage}
              total={selectedStatistic?.currency.length || 0}
              pageSize={3}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
          <div className={'revenue__overview-header'}>
            <Htag tag="h3" className={'revenue__overview-title'}>
              {format(new Date(), 'dd MMMM yyyy')}
            </Htag>
            <button>
              <img className={'revenue__option'} src={icon} alt="options" />
            </button>
          </div>
          <ul className="revenue__bottom">
            <li className={'revenue__item'}>
              <div className={'revenue__item-left'}>
                <div style={{ backgroundColor: '#DC3434' }} className={'revenue__item-div'}>
                  <FaCartPlus />
                </div>
                <div className={'revenue__item-details'}>
                  <Ptag className={'revenue__item-title'}>Sales</Ptag>
                  <Ptag className={'revenue__item-time'}>Sold for the amount</Ptag>
                </div>
              </div>
              <Ptag className={'revenue__item-price'}>${soldPrice.toFixed(2)}</Ptag>
            </li>
            <Diveder className="revenue__elem-diveder" />
            <li className={'revenue__item'}>
              <div className={'revenue__item-left'}>
                <div style={{ backgroundColor: '#4BA83D' }} className={'revenue__item-div'}>
                  <FaCartPlus />
                </div>
                <div className={'revenue__item-details'}>
                  <Ptag className={'revenue__item-title'}>Purchase</Ptag>
                  <Ptag className={'revenue__item-time'}>Purchased cryptocurrencies</Ptag>
                </div>
              </div>

              <Ptag className={'revenue__item-price'}>${amountPrice.toFixed(2)}</Ptag>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default Revenue;
