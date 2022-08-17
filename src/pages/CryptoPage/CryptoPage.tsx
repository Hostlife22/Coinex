import cn from 'classnames';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { days } from '../../common/data';
import { Button, Card, Chart, CryptoDetails, Htag, Ptag } from '../../components';
import { useGetCryptoHistoryQuery, useGetCryptoQuery } from '../../features/crypto/cryptoApiSlice';

import './CryptoPage.scss';

const CryptoPage = () => {
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState<number>(7);
  const { data: cryptosData } = useGetCryptoHistoryQuery({ id: id || '', interval: 'd1' });
  const { data: coinData } = useGetCryptoQuery(id || '');

  const currentData = useMemo(() => {
    return cryptosData?.data
      ? cryptosData.data
          .slice(-selectedDay)
          .map((each) => ({ value: each.priceUsd, date: new Date(each.date).toISOString().substr(0, 10) }))
      : [];
  }, [cryptosData, selectedDay]);

  return (
    <div className="crypto">
      <Card className="crypto__container">
        <Htag tag="h1" className="crypto__title">
          {coinData?.data.name}{' '}
        </Htag>
        <Ptag className="crypto__subtitle">
          {coinData?.data.name} live price in USD dollars. View value statistics, market cap and supply.
        </Ptag>
        <Chart data={currentData} />
        <div className="crypto__btns">
          {days.map((day) => (
            <Button
              appearance="primary"
              className={cn('crypto__btn', { crypto__btn_active: selectedDay === day.day })}
              key={day.id}
              onClick={() => setSelectedDay(day.day)}>
              {day.day}d
            </Button>
          ))}
        </div>

        {coinData?.data && <CryptoDetails {...coinData.data} />}
      </Card>
    </div>
  );
};

export default CryptoPage;
