import * as React from 'react';
import './details.scss';

interface Props {
  type: 'tx' | 'block';
}

export const DetailsSkeleton = ({ type }: Props) => (
  <>
    <div className="Details-header">
      <h1 className="Details-header-title">Transaction Details</h1>
      <div className="flex-spacer" />
      <div className="Details-header-timestamp skeleton">2018 / 04 / 19 – 08:04 UTC</div>
    </div>
    <div className="Details-body">
      <div className="Details-body-section">
        <div>
          <p className="Details-body-section-title skeleton">Transaction</p>
        </div>
        <div className="Details-body-section-content">
          <div className="Details-body-section-content-input hash">
            <p className="skeleton">Transaction Hash</p>
            <p className="skeleton">
              19e38d7406e2fa7bc924cee7e72841286d6a55d80d678db589e18b8ad2595343
            </p>
          </div>
          {type === 'block' && (
            <div className="Details-body-section-content-input extra">
              <p className="skeleton">19e38d7406e2fa7bc924cee7e728412</p>
              <p className="skeleton">
                01380537c3bfb09e14e0b89d03099fc12d098aab4d501786cc337b1d696dad0e6102210084fdeea3ec55c02d148ad89caf27405223e2e8e30575acfc080eb8338297652a
              </p>
            </div>
          )}
          <br />
          <div className="Details-body-section-content-input">
            <p className="skeleton">—————</p>
            <p className="skeleton">——————————</p>
          </div>
        </div>
      </div>
      <div className="Details-body-section">
        <div>
          <p className="Details-body-section-title skeleton">Transaction</p>
        </div>
        <div className="Details-body-section-content">
          <div className="Details-body-section-content-input">
            <p className="skeleton">—————</p>
            <p className="skeleton">——————————</p>
          </div>
          {type === 'tx' && (
            <>
              <div className="Details-body-section-content-input">
                <p className="skeleton">—————</p>
                <p className="skeleton">——————————</p>
              </div>
              <div className="Details-body-section-content-input">
                <p className="skeleton">—————</p>
                <p className="skeleton">——————————</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="Details-body-section">
        <div>
          <p className="Details-body-section-title skeleton">Transaction</p>
        </div>
        <div className="Details-body-section-content">
          <div className="Details-body-section-content-input">
            <p className="skeleton">01380537c3bfb09e14e0b89d03099fc12d098aab4d501786cc</p>
          </div>
        </div>
      </div>
      <div className="Details-body-section">
        <div>
          <p className="Details-body-section-title skeleton">Transaction</p>
        </div>
        <table className="Details-body-section-table Details-body-section-content">
          <thead>
            <tr>
              <th>
                <div className="skeleton">01380537c3bfb09e14e0b89d03099fc12d0</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(7)
              .fill('')
              .map((i: number) => {
                return (
                  <tr key={i}>
                    <td>
                      <div className="wrap skeleton">
                        19e38d7406e2fa7bc924cee7e72841286d6a55d80d678db589e18b8ad2595343
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  </>
);
