import cn from 'classnames';
import millify from 'millify';
import { useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Pagination } from '..';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import empty from '../../assets/empty.gif';
import { CRYPTOCURRENCY_URL, PAGE_SIZE } from '../../common/constants';
import { comparePrice, formatAsCurrency, formatAsPercent } from '../../common/helpers';
import { ICoin } from '../../features/crypto/crypto.interface';
import { useGetAllCryptosQuery } from '../../features/crypto/cryptoApiSlice';
import { selectSearchQuery, setSearchCrypto } from '../../features/settings/settingsSlice';
import useMediaQuery from '../../hooks/useMediaQuery';
import './Currency.scss';

function Currency() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [assetsList, setAssetsList] = useState<ICoin[]>([]);
  const [change, setChange] = useState<{ [key: string]: string } | null>(null);
  const { data, isLoading } = useGetAllCryptosQuery();
  const navigation = useNavigate();
  const searchQuery = useAppSelector(selectSearchQuery);
  const matches = useMediaQuery('(max-width: 820px)');
  const dispatch = useAppDispatch();
  const changedId = new Map();

  useEffect(() => {
    searchQuery;
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
      .filter(({ name, id, supply }) =>
        [name, id, supply].some((each) => each.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      .slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data, changedId]);

  return (
    <div className="cryptocurrency">
      <Input
        placeholder="Search ..."
        className="cryptocurrency__input"
        value={searchQuery}
        onChange={(e) => {
          dispatch(setSearchCrypto(e.target.value));
        }}
      />
      {isLoading && <div>Loading...</div>}
      {currentTableData.length > 0 && (
        <table className="cryptocurrency__table">
          <thead>
            <tr className="cryptocurrency__titles">
              <th>Name</th>
              <th>Price</th>
              {!matches && (
                <>
                  <th>Market Cap</th>
                  <th>
                    Volume <span>(24hr)</span>
                  </th>
                </>
              )}
              <th>
                Change<span>(24hr)</span>
              </th>
              <th>
                <span>Price </span>Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((cryptocurrency, i) => {
              return (
                <tr
                  key={cryptocurrency.id}
                  className={cn(`cryptocurrency__tr-${i + 1}`, {
                    cryptocurrency__up: change?.[cryptocurrency.id] === 'priceDrop',
                    cryptocurrency__down: change?.[cryptocurrency.id] === 'priceUp',
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
                  {!matches && (
                    <>
                      <td>
                        <p className="cryptocurrency__subtitle">
                          {cryptocurrency.marketCapUsd ? millify(+cryptocurrency.marketCapUsd) : ''}
                        </p>
                      </td>
                      <td>
                        <p className="cryptocurrency__subtitle">{millify(+cryptocurrency.volumeUsd24Hr)}</p>
                      </td>
                    </>
                  )}

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
                    <Button
                      appearance="primary"
                      className={cn('cryptocurrency__btn')}
                      onClick={() => navigation(`/crypto/${cryptocurrency.id}`)}>
                      <FaPlus />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {currentTableData.length === 0 && searchQuery && (
        <div className="cryptocurrency__no-results">
          <img src={empty} alt="empty" />
        </div>
      )}
      {!isLoading && currentTableData.length > 5 && (
        <Pagination
          className="cryptocurrency__pagination"
          currentPage={currentPage}
          total={data?.data.length || 0}
          pageSize={PAGE_SIZE}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default Currency;
