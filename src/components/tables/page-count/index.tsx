import * as React from 'react';
import './page-count.scss';

interface Props {
  limit: number;
  page: number;
  itemsShown: number;
  itemCount: number;
  pending?: boolean;
  className?: string;
}

export const PageCount = ({
  limit,
  page,
  itemsShown,
  itemCount,
  pending,
  className = ''
}: Props) => {
  const firstPage = page === 0;
  const lastPage = limit * page + limit > itemCount;
  const currentMin = lastPage && !firstPage ? itemCount - itemsShown : limit * page + 1;
  const currentMax = limit * page + itemsShown;
  return (
    <p className={`${className} Pages ${(!pending || itemCount > 0) && 'visible'}`}>
      {currentMin}-{itemCount > limit ? (lastPage ? itemCount : currentMax) : itemCount} of{' '}
      {itemCount}
    </p>
  );
};
