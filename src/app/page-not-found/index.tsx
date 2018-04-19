import * as React from 'react';
import './page-not-found.scss';

export const PageNotFound = () => {
  return (
    <div className="Page-Not-Found card">
      <h1 className="Page-Not-Found-title">Page not found</h1>
      <p className="Page-Not-Found-description">
        The page your looking for couldn't be found. Try the <a href="/">home page</a>
      </p>
    </div>
  );
};
