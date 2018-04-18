import * as React from 'react';
import './input.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inlinelabel?: string;
  error?: string;
  className?: string;
}

export class Input extends React.Component<Props> {
  public render() {
    const { error, label, inlinelabel, className } = this.props;
    return (
      <>
        <label className={`Input ${!!error && 'error'}`}>
          <div className="Input-label-wrapper">
            <span className="Input-label">{label}</span>
            {inlinelabel && <span className="Input-inline-label">{inlinelabel}</span>}
          </div>
          <input {...this.props} className={`Input-input ${className}`} />
        </label>
        {!!error && <p className="Input-error">{error}</p>}
      </>
    );
  }
}
