import cn from 'classnames';
import millify from 'millify';
import { useMemo, useState } from 'react';
import { Pagination } from '..';
import { PAGE_SIZE } from '../../common/constants';
import './Currency.scss';

function Currency() {
  const [cryptoData, setCryptoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return cryptoData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, cryptoData]);

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
          {currentTableData.map((cryptocurrency) => (
            <tr key={cryptocurrency.id}>
              <td>
                <div className={'cryptocurrency__wrapper'}>
                  <div className={'cryptocurrency__img_wrapp'}>
                    <img className={'cryptocurrency__img'} src={cryptocurrency.image} alt="" />
                  </div>
                  <div className={'cryptocurrency__description'}>
                    <p className="cryptocurrency__name">{cryptocurrency.name}</p>
                    <p className="cryptocurrency__subtitle">{cryptocurrency.symbol}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="cryptocurrency__name">${cryptocurrency.current_price}</p>
                <p className="cryptocurrency__subtitle">USD</p>
              </td>
              <td>
                <p className="cryptocurrency__subtitle">{millify(cryptocurrency.market_cap)}</p>
              </td>
              <td>
                <p className="cryptocurrency__subtitle">{millify(cryptocurrency.total_volume)}</p>
              </td>
              <td>
                <p className="cryptocurrency__subtitle">{cryptocurrency.price_change_percentage_24h}%</p>
              </td>

              <td>
                <button
                  className={cn('cryptocurrency__btn', {
                    cryptocurrency__btn_red: cryptocurrency.price_change_percentage_24h < 0,
                  })}>
                  add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        className="cryptocurrency__pagination"
        currentPage={currentPage}
        total={cryptoData.length}
        pageSize={PAGE_SIZE}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Currency;
