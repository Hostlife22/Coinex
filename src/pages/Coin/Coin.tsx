import cn from 'classnames';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { days } from '../../common/data';
import { Button, Card, Chart, CryptoDetails, Htag, Ptag } from '../../components';
import { useGetCryptoHistoryQuery, useGetCryptoQuery } from '../../features/crypto/cryptoApiSlice';

import './Coin.scss';

const Coin = () => {
  const { id } = useParams();
  const { data: cryptosData } = useGetCryptoHistoryQuery({ id: id || '', interval: 'd1' });
  const { data: coinData } = useGetCryptoQuery(id || '');

  console.log(coinData);

  const [selectedDay, setSelectedDay] = useState<number>(7);

  const currentData = useMemo(() => {
    return cryptosData?.data
      ? cryptosData.data
          .slice(-selectedDay)
          .map((each) => ({ value: each.priceUsd, date: new Date(each.date).toISOString().substr(0, 10) }))
      : [];
  }, [cryptosData, selectedDay]);

  return (
    <div className="coin">
      <Card className="coin__container">
        <Htag tag="h1">{coinData?.data.name} </Htag>
        <Ptag>
          {coinData?.data.name} live price in USD dollars. View value statistics, market cap and supply.
        </Ptag>
        <Chart data={currentData} />
        <div className="coin__btns">
          {days.map((day) => (
            <Button
              appearance="primary"
              className={cn('coin__btn', { coin__btn_active: selectedDay === day.day })}
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

export default Coin;
