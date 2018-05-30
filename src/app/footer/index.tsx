import * as React from 'react';
import { PoweredByMyCrypto } from './poweredby';
import { Logo } from './logo';
import './footer.scss';

export const Footer = () => (
  <footer className="Footer">
    <section className="Footer-wrap">
      <div className="Footer-left">
        <a target="_blank" rel="noopener noreferrer" href="https://mycrypto.com">
          <PoweredByMyCrypto />
        </a>
      </div>

      <div className="Footer-center">
        <a href="/">
          <Logo />
        </a>
        <p className="Footer-text">
          MoneroVision is an open-source Monero block explorer that is offered as a part of the{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://mycrypto.com">
            MyCrypto
          </a>{' '}
          network. At MyCrypto, we’re focused on building awesome products that put the power in
          your hands and this is just the beginning of our Monero offerings.
        </p>
      </div>

      <div className="Footer-right">
        <p className="Footer-social-titles">MoneroVision</p>
        <a
          className="Footer-social-media-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/monerovision"
        >
          <i className="nc-icon nc-logo-twitter size_24px" />
        </a>
        <a
          className="Footer-social-media-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/MyCryptoHQ/MoneroVision"
        >
          <i className="nc-icon nc-logo-github size_24px" />
        </a>
        <p className="Footer-social-titles">MyCrypto</p>
        <a
          className="Footer-social-media-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/mycrypto"
        >
          <i className="nc-icon nc-logo-twitter size_24px" />
        </a>
        <a
          className="Footer-social-media-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/MyCryptoHQ"
        >
          <i className="nc-icon nc-logo-github size_24px" />
        </a>
        <a
          className="Footer-social-media-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/mycryptoHQ"
        >
          <i className="nc-icon nc-logo-facebook size_24px" />
        </a>
        <a
          className="Footer-social-media-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/mycryptohq"
        >
          <i className="nc-icon nc-logo-instagram size_24px" />
        </a>
        <a
          className="Footer-social-media-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://medium.com/@mycrypto"
        >
          <i className="nc-icon nc-logo-medium size_24px" />
        </a>
      </div>
    </section>
  </footer>
);
