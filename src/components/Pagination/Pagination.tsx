import cn from 'classnames';
import { DOTS } from '../../common/constants';
import { usePagination } from '../../hooks/usePagination';
import { IPaginationProps } from './Pagination.interface';

import './Pagination.scss';

function Pagination({
  onPageChange,
  pageSize,
  currentPage,
  total,
  className,
  siblingCount = 1,
}: IPaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    total,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={cn('pagination', className)}>
      <li
        className={cn('pagination__item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}>
        <div className={cn('arrow', 'left')} />
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS || typeof pageNumber === 'string') {
          return (
            <li className={cn('pagination__item', 'dots')} key={i}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={i}
            className={cn('pagination__item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cn('pagination__item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}>
        <div className={cn('arrow', 'right')} />
      </li>
    </ul>
  );
}

export default Pagination;
