import { useQuery } from '@apollo/client';
import cn from 'classnames';
import { useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { GET_CRYPTO, GET_CRYPTO_HISTORY } from '../../apollo/queries/cryptoQuery';
import { getCryptoVariables } from '../../apollo/queries/__generated__/getCrypto';
import { getCryptoHistoryVariables } from '../../apollo/queries/__generated__/getCryptoHistory';
import { AssetHistoryInterval } from '../../apollo/__generated__/globalTypes';
import { IGetCrypto, IGetCryptoHistory } from '../../common/crypto.interface';
import { days } from '../../common/data';
import { Button, Card, Chart, CryptoDetails, Htag, Modal, Ptag } from '../../components';

import './CryptoPage.scss';

const CryptoPage = () => {
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState<number>(7);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: cryptosData, loading } = useQuery<IGetCryptoHistory, getCryptoHistoryVariables>(
    GET_CRYPTO_HISTORY,
    {
      variables: { id: id || '', interval: AssetHistoryInterval.d1 },
    },
  );
  const { data } = useQuery<IGetCrypto, getCryptoVariables>(GET_CRYPTO, {
    variables: { id: id || '' },
  });

  const currentData = useMemo(() => {
    return cryptosData?.assetHistory
      ? cryptosData.assetHistory
          .slice(-selectedDay)
          .map((each) => ({ value: each.priceUsd, date: new Date(each.time).toISOString().substr(0, 10) }))
      : [];
  }, [cryptosData, selectedDay]);

  return (
    <div className="crypto">
      <Card className="crypto__container">
        <div className="crypto__wrapper">
          <Htag tag="h1" className="crypto__title">
            {data?.asset.name}{' '}
          </Htag>
          <Button appearance="primary" className="crypto__add-portfolio" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> ADD
          </Button>
        </div>

        <Ptag className="crypto__subtitle">
          {data?.asset.name} live price in USD dollars. View value statistics, market cap and supply.
        </Ptag>
        <Chart data={currentData} />
        <div className="crypto__btns">
          {!loading &&
            days.map((day) => (
              <Button
                appearance="primary"
                className={cn('crypto__btn', { crypto__btn_active: selectedDay === day.day })}
                key={day.id}
                onClick={() => setSelectedDay(day.day)}>
                {day.day}d
              </Button>
            ))}
        </div>

        {data?.asset && <CryptoDetails {...data.asset} />}
        {isModalOpen && (
          <Modal
            openId={id || ''}
            data={data?.asset}
            isOpen={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
          />
        )}
      </Card>
    </div>
  );
};

export default CryptoPage;
