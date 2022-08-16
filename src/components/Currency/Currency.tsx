import cn from 'classnames';
import millify from 'millify';
import { useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button, Pagination } from '..';
import { CRYPTOCURRENCY_URL, PAGE_SIZE } from '../../common/constants';
import { comparePrice, formatAsCurrency, formatAsPercent } from '../../common/helpers';
import { ICoin } from '../../features/crypto/crypto.interface';
import { useGetAllCryptosQuery } from '../../features/crypto/cryptoApiSlice';
import './Currency.scss';

function Currency() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [assetsList, setAssetsList] = useState<ICoin[]>([]);
  const [change, setChange] = useState<{ [key: string]: string } | null>(null);
  const { data } = useGetAllCryptosQuery();

  const changedId = new Map();

  useEffect(() => {
    if (data?.data) {
      setAssetsList(data.data);
    }
  }, [data]);

  useEffect(() => {
    const clonedAsset = [...assetsList];
    const pricesWs = new WebSocket(CRYPTOCURRENCY_URL);

    pricesWs.onmessage = (msg) => {
      const updatedAssets = clonedAsset.map((eachAsset) => {
        const parsedMessage = JSON.parse(msg.data) as { [key: string]: string };
        if (parsedMessage[eachAsset.id]) {
          const compadredPrice = comparePrice(+eachAsset.priceUsd, +parsedMessage[eachAsset.id]);

          if (compadredPrice === 1 || compadredPrice === -1) {
            setIndicator(eachAsset.id, compadredPrice);

            return {
              ...eachAsset,
              priceUsd: eachAsset.priceUsd,
            };
          }
        }

        return eachAsset;
      });

      setAssetsList(updatedAssets);
    };

    return () => {
      pricesWs.close();
    };
  }, [assetsList]);

  const setIndicator = (id: string, comparedPrice: number) => {
    const value = comparedPrice === 1 ? 'priceDrop' : 'priceUp';
    setChange((prev) => (prev ? { ...prev, [id]: value } : { [id]: value }));

    setTimeout(() => {
      setChange((prev) => {
        if (prev) {
          const { [id]: _, ...rest } = prev;
          return rest;
        }

        return prev;
      });
    }, 1500);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return [...assetsList]
      .sort((a, b) => +b.changePercent24Hr - +a.changePercent24Hr)
      .slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data, changedId]);

  return (
    <div className="cryptocurrency">
      <table className="cryptocurrency__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Volume (24hr)</th>
            <th>Change(24hr)</th>
            <th>Price Trend</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((cryptocurrency) => {
            return (
              <tr
                key={cryptocurrency.id}
                className={cn({
                  cryptocurrency__up: change?.[cryptocurrency.id] === 'priceDrop',
                  cryptocurrency__down: change?.[cryptocurrency.id] === 'priceIncrease',
                })}>
                <td>
                  <div className={'cryptocurrency__wrapper'}>
                    <div className={'cryptocurrency__description'}>
                      <p className="cryptocurrency__name">{cryptocurrency.name}</p>
                      <p className="cryptocurrency__subtitle">{cryptocurrency.symbol}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="cryptocurrency__name">{formatAsCurrency(+cryptocurrency.priceUsd)}</p>
                </td>
                <td>
                  <p className="cryptocurrency__subtitle">
                    {cryptocurrency.marketCapUsd ? millify(+cryptocurrency.marketCapUsd) : ''}
                  </p>
                </td>
                <td>
                  <p className="cryptocurrency__subtitle">{millify(+cryptocurrency.volumeUsd24Hr)}</p>
                </td>
                <td>
                  <p
                    className={cn('cryptocurrency__subtitle', {
                      cryptocurrency__subtitle_red: +cryptocurrency.changePercent24Hr < 0,
                      cryptocurrency__subtitle_green: +cryptocurrency.changePercent24Hr > 0,
                    })}>
                    {formatAsPercent(+cryptocurrency.changePercent24Hr)}
                  </p>
                </td>

                <td>
                  <Button appearance="primary" className={cn('cryptocurrency__btn')}>
                    <FaPlus />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="cryptocurrency__pagination"
        currentPage={currentPage}
        total={data?.data.length || 0}
        pageSize={PAGE_SIZE}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Currency;
