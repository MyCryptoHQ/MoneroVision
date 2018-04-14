import * as React from 'react';
import './input.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export class Input extends React.Component<Props> {
  public render() {
    const { error, label } = this.props;
    return (
      <label className={`Input ${!!error && 'error'}`}>
        <span className="Input-label">{label}</span>
        <input className="Input-input" {...this.props} />
        {!!error && <p className="Input-error">{error}</p>}
      </label>
    );
  }
}
