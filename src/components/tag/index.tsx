import * as React from 'react';
import './tag.scss';

interface Props {
  type: 'pending' | 'coinbase';
  text: string;
  className?: string;
}

export const Tag = ({ type, text, className = '' }: Props) => (
  <div className={`Tag ${type} ${className}`}>{text}</div>
);
