import * as React from 'react';
import './page-count.scss';

interface Props {
  limit: number;
  page: number;
  itemCount: number;
  pending?: boolean;
  className?: string;
}

export const PageCount = ({ limit, page, itemCount, pending, className = '' }: Props) => {
  return (
    <p className={`${className} Pages ${(!pending || itemCount > 0) && 'visible'}`}>
      {limit * page + 1}-{limit * page + limit} of {itemCount}
    </p>
  );
};
